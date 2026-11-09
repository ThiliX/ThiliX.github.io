import { useEffect, useRef } from 'react'

/**
 * Interactive background that combines three effects:
 *  - Ember:    grid dots glow orange near the cursor
 *  - Magnetic: grid dots are pushed away from the cursor and spring back
 *  - Neural:   a sparse layer of drifting nodes linked by thin lines, which also link to the cursor
 *
 * It's designed to stay out of the way of the content:
 *  - Full strength only in the hero. Further down, the cursor effect is much quieter and the network is hidden.
 *  - While the page is scrolling, everything fades back and the network stops drifting.
 *  - Hovering text, cards or buttons calms the effect so it never competes with what's being read.
 *  - When nothing is moving it stops drawing entirely (no work per frame).
 *  - "Reduce motion" visitors get a still dot grid.
 *
 * Colours come from the CSS variables --accent-rgb and --dot-rgb, so it follows light/dark mode.
 */

interface GridDot { hx: number; hy: number; x: number; y: number; vx: number; vy: number }
interface Node { x: number; y: number; vx: number; vy: number }
type RGB = [number, number, number]

const GAP = 26 // grid spacing in px
const LINK = 130 // max distance between linked nodes
const CURSOR_LINK = 180 // max distance for a node to link to the cursor
const SCROLL_SETTLE_MS = 220 // how long after the last scroll event the page counts as "still"
const POINTER_IDLE_MS = 3500 // after this, the mouse counts as idle
const CONTENT = 'p, h1, h2, h3, h4, li, a, button, input, textarea, label, article, figure, form, dl'

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const smooth = (t: number) => t * t * (3 - 2 * t)
const approach = (from: number, to: number, rate: number, dt: number) => from + (to - from) * (1 - Math.pow(rate, dt))
const parseRGB = (v: string): RGB => {
  const [r = 0, g = 0, b = 0] = v.trim().split(/[\s,]+/).map(Number)
  return [r, g, b]
}

export default function DotField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let grid: GridDot[] = []
    let nodes: Node[] = []
    let accent: RGB = [255, 122, 26]
    let dot: RGB = [255, 214, 180]
    let dark = true

    const pointer = { x: 0, y: 0, lastMove: -Infinity, onContent: false }
    let lastScroll = -Infinity
    let cx = 0
    let cy = 0
    let presence = 0 // strength of the cursor effect, 0..1
    let net = 0 // visibility of the network layer, 0..1
    let t = 0
    let raf = 0
    let running = false
    let last = 0

    const readColours = () => {
      const s = getComputedStyle(document.documentElement)
      accent = parseRGB(s.getPropertyValue('--accent-rgb') || '255 122 26')
      dot = parseRGB(s.getPropertyValue('--dot-rgb') || '255 214 180')
      dark = document.documentElement.classList.contains('dark')
    }

    const mix = (e: number, a: number) =>
      `rgba(${Math.round(dot[0] + (accent[0] - dot[0]) * e)},${Math.round(dot[1] + (accent[1] - dot[1]) * e)},${Math.round(
        dot[2] + (accent[2] - dot[2]) * e,
      )},${a})`
    const accentA = (a: number) => `rgba(${accent[0]},${accent[1]},${accent[2]},${a})`

    // 1 at the top of the page, 0 once the hero has scrolled away.
    const heroFactor = () => clamp(1 - window.scrollY / (h * 0.75), 0, 1)

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      grid = []
      const ox = (w % GAP) / 2 + GAP / 2
      const oy = (h % GAP) / 2 + GAP / 2
      for (let y = oy; y < h; y += GAP)
        for (let x = ox; x < w; x += GAP) grid.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 })

      const count = clamp(Math.round((w * h) / 26000), 22, 60)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 24,
        vy: (Math.random() - 0.5) * 24,
      }))
      draw(0)
    }

    /** Draws one frame. Returns true when everything has come to rest. */
    const draw = (dt: number): boolean => {
      ctx.clearRect(0, 0, w, h)
      const base = dark ? 0.12 : 0.2
      const glowR = clamp(w * 0.13, 120, 190)
      const pushR = clamp(w * 0.09, 80, 130)
      const damp = Math.pow(0.0009, dt)
      const active = presence > 0.01
      let energy = 0

      if (active) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * 1.4)
        g.addColorStop(0, accentA((dark ? 0.1 : 0.16) * presence))
        g.addColorStop(1, accentA(0))
        ctx.fillStyle = g
        ctx.fillRect(cx - glowR * 1.4, cy - glowR * 1.4, glowR * 2.8, glowR * 2.8)
      }

      // Grid. Resting dots are batched into one path; only excited dots are drawn individually.
      ctx.beginPath()
      const lit: [number, number, number][] = []
      for (const d of grid) {
        if (dt > 0) {
          const moving = d.vx !== 0 || d.vy !== 0 || d.x !== d.hx || d.y !== d.hy
          const dx = d.x - cx
          const dy = d.y - cy
          const near = active && Math.abs(dx) < pushR && Math.abs(dy) < pushR
          if (near) {
            const dist = Math.hypot(dx, dy) || 1
            if (dist < pushR) {
              const f = Math.pow(1 - dist / pushR, 2) * 2200 * presence
              d.vx += (dx / dist) * f * dt
              d.vy += (dy / dist) * f * dt
            }
          }
          if (near || moving) {
            d.vx = (d.vx + (d.hx - d.x) * 55 * dt) * damp
            d.vy = (d.vy + (d.hy - d.y) * 55 * dt) * damp
            d.x += d.vx * dt
            d.y += d.vy * dt
            // snap to rest once the motion is invisible
            if (Math.abs(d.vx) + Math.abs(d.vy) < 0.5 && Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) < 0.05) {
              d.x = d.hx
              d.y = d.hy
              d.vx = 0
              d.vy = 0
            } else {
              energy = 1
            }
          }
        }
        const glow = active ? smooth(clamp(1 - Math.hypot(d.hx - cx, d.hy - cy) / glowR, 0, 1)) * presence : 0
        const disp = d.x === d.hx && d.y === d.hy ? 0 : clamp(Math.hypot(d.x - d.hx, d.y - d.hy) / 24, 0, 1)
        const e = Math.max(glow * 0.85, disp)
        if (e < 0.01) ctx.rect(d.x - 0.9, d.y - 0.9, 1.8, 1.8)
        else lit.push([d.x, d.y, e])
      }
      ctx.fillStyle = mix(0, base)
      ctx.fill()
      for (const [x, y, e] of lit) {
        ctx.fillStyle = mix(e, base + e * (1 - base))
        ctx.beginPath()
        ctx.arc(x, y, 0.9 + e * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Network layer — skipped entirely once it has faded out.
      if (net > 0.01) {
        for (const n of nodes) {
          if (dt > 0) {
            if (active) {
              const dx = cx - n.x
              const dy = cy - n.y
              const dist = Math.hypot(dx, dy) || 1
              if (dist < CURSOR_LINK) {
                n.vx += (dx / dist) * 14 * dt * presence
                n.vy += (dy / dist) * 14 * dt * presence
              }
            }
            const sp = Math.hypot(n.vx, n.vy)
            if (sp > 32) {
              n.vx *= 32 / sp
              n.vy *= 32 / sp
            }
            // nodes slow down as the layer fades, so nothing drifts while scrolling
            n.x += n.vx * dt * net
            n.y += n.vy * dt * net
            if (n.x < -20) n.x = w + 20
            else if (n.x > w + 20) n.x = -20
            if (n.y < -20) n.y = h + 20
            else if (n.y > h + 20) n.y = -20
          }
        }
        ctx.lineWidth = 1
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i]
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue
            const dist = Math.hypot(dx, dy)
            if (dist < LINK) {
              ctx.strokeStyle = mix(0.35, (1 - dist / LINK) * (dark ? 0.2 : 0.28) * net)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
          if (active) {
            const pd = Math.hypot(a.x - cx, a.y - cy)
            if (pd < CURSOR_LINK) {
              ctx.strokeStyle = accentA((1 - pd / CURSOR_LINK) * 0.65 * presence * net)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(cx, cy)
              ctx.stroke()
            }
          }
        }
        for (const n of nodes) {
          const e = active ? smooth(clamp(1 - Math.hypot(n.x - cx, n.y - cy) / CURSOR_LINK, 0, 1)) * presence : 0
          ctx.fillStyle = mix(0.35 + e * 0.65, (0.32 + e * 0.6) * net)
          ctx.beginPath()
          ctx.arc(n.x, n.y, 1.6 + e * 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      return energy === 0 && presence < 0.005 && net < 0.005
    }

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt

      const scrolling = now - lastScroll < SCROLL_SETTLE_MS
      const hero = heroFactor()
      const mouseActive = now - pointer.lastMove < POINTER_IDLE_MS

      // Where the cursor effect should be: the real mouse, a slow idle path in the hero, or nowhere.
      let tgt: [number, number] | null = null
      if (mouseActive) tgt = [pointer.x, pointer.y]
      else if (hero > 0.4) tgt = [w * (0.62 + 0.26 * Math.cos(t * 0.3)), h * (0.42 + 0.22 * Math.sin(t * 0.47))]

      let strength = 0
      if (tgt && !scrolling) {
        strength = mouseActive ? 1 : 0.6 // the idle path is gentler than a real cursor
        strength *= 0.3 + 0.7 * hero // much quieter below the hero
        if (mouseActive && pointer.onContent) strength *= 0.3 // calm over text and cards
      }

      if (tgt) {
        if (presence < 0.01) {
          cx = tgt[0]
          cy = tgt[1]
        }
        const k = 1 - Math.pow(0.001, dt)
        cx += (tgt[0] - cx) * k
        cy += (tgt[1] - cy) * k
      }
      // fade out quickly, fade in gently
      presence = approach(presence, strength, strength < presence ? 0.002 : 0.05, dt)
      net = approach(net, scrolling ? 0 : hero, scrolling ? 0.002 : 0.1, dt)

      const resting = draw(dt)
      if (resting && !scrolling && !tgt) {
        running = false // nothing to animate: stop until the next mouse move or scroll
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (running || reduce) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return // touch drags are scrolls; don't light up under the finger
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.lastMove = performance.now()
      pointer.onContent = e.target instanceof Element && e.target.closest(CONTENT) !== null
      wake()
    }
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer.lastMove = -Infinity
    }
    const onScroll = () => {
      lastScroll = performance.now()
      wake()
    }
    const onResize = () => {
      resize()
      wake()
    }
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        running = false
      } else wake()
    }

    readColours()
    resize()
    const themeObserver = new MutationObserver(() => {
      readColours()
      if (!running) draw(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', onResize)

    if (!reduce) {
      net = heroFactor()
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('mouseout', onLeave)
      document.addEventListener('visibilitychange', onVisibility)
      wake()
    }

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`} />
}
