import { useEffect, useState, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { skillCategories } from '../data/skills'

type Token = { t: string; c?: 'key' | 'str' | 'num' | 'muted' | 'accent' }

const str = (s: string): Token => ({ t: `'${s}'`, c: 'str' })
const list = (items: string[]): Token[] =>
  items.flatMap((item, i) => (i === 0 ? [str(item)] : [{ t: ', ' }, str(item)]))

// Built from real profile data, so it stays accurate as the data files change.
const stack = [...new Set(skillCategories.flatMap((c) => c.skills))].slice(0, 4)

const lines: Token[][] = [
  [{ t: 'const ', c: 'key' }, { t: 'thilix', c: 'accent' }, { t: ' = {' }],
  [{ t: '  role: ' }, str(profile.roles[0]), { t: ',' }],
  [{ t: '  university: ' }, str('NSBM Green University'), { t: ',' }],
  [{ t: '  graduating: ' }, { t: '2028', c: 'num' }, { t: ',' }],
  [{ t: '  basedIn: ' }, str(profile.location), { t: ',' }],
  [{ t: '  stack: [' }, ...list(stack), { t: '],' }],
  [{ t: '  exploring: [' }, ...list(['AI', 'Cloud', 'DevOps']), { t: '],' }],
  [{ t: '}' }],
  [],
  [{ t: '// turning ideas into practical solutions', c: 'muted' }],
]

const colour: Record<NonNullable<Token['c']>, string> = {
  key: 'text-[var(--code-key)]',
  str: 'text-[var(--code-str)]',
  num: 'text-[var(--code-num)]',
  muted: 'text-subtle italic',
  accent: 'text-fg',
}

const lineText = lines.map((line) => line.map((tok) => tok.t).join(''))
const plainText = lineText.join('\n')

const START_DELAY = 300 // ms before typing begins
const TYPE_DURATION = 1500 // ms to type everything
const FADE = 6 // new characters fade in over this many characters behind the caret

type Cursor = { line: number; col: number }

const indentOf = (s: string) => s.length - s.trimStart().length

// Every caret position, in typing order. Indentation and blank lines are skipped,
// like an editor's auto-indent, so each step adds one visible character.
const steps: Cursor[] = [{ line: 0, col: 0 }]
const lineBase: number[] = [] // step index where each line's typing begins
lineText.forEach((text, line) => {
  const indent = indentOf(text)
  lineBase[line] = line === 0 ? 0 : steps.length
  if (text.length === 0) return
  for (let col = indent; col <= text.length; col++) {
    if (line > 0 || col > 0) steps.push({ line, col })
  }
})
const LAST = steps.length - 1
const END = LAST + FADE // progress value once the last character has fully faded in

/** Step at which a character appears (indentation appears with the line's first character). */
const charStep = (line: number, col: number) =>
  lineBase[line] + Math.max(0, col - indentOf(lineText[line])) + 1

const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

/** Typing progress in steps (fractional), animated once on load; skipped for reduced-motion users. */
function useTyping() {
  const [progress, setProgress] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? END : 0,
  )

  useEffect(() => {
    if (progress >= END) return
    let frame = 0
    let start = 0

    // Time-based, so it always finishes on schedule however fast the device draws frames.
    const tick = (now: number) => {
      start ||= now
      const t = Math.min(1, (now - start) / TYPE_DURATION)
      setProgress(easeInOut(t) * END)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    const timer = window.setTimeout(() => (frame = requestAnimationFrame(tick)), START_DELAY)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
    // Runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { progress, cursor: steps[Math.min(LAST, Math.floor(progress))], done: progress >= END }
}

function Caret({ blink }: { blink: boolean }) {
  // Zero-width wrapper so the caret never pushes text around while typing.
  return (
    <span className="relative inline-block w-0">
      <span
        className={`${blink ? 'caret ' : ''}absolute top-1/2 left-0.5 inline-block h-4 w-[7px] -translate-y-[45%] bg-accent-vivid`}
      />
    </span>
  )
}

const opacityAt = (progress: number, line: number, col: number) =>
  Math.min(1, Math.max(0, (progress - charStep(line, col) + 1) / FADE))

/**
 * One line of code. Typed characters fade in just behind the caret; untyped ones stay
 * in place at zero opacity, so the window never changes size.
 */
function CodeLine({ index, progress, caretCol }: { index: number; progress: number; caretCol: number | null }) {
  const out: ReactNode[] = []
  let col = 0
  lines[index].forEach((tok, j) => {
    const cls = tok.c ? colour[tok.c] : undefined
    const parts: ReactNode[] = []
    // Group neighbouring characters with the same opacity into one span.
    let run = ''
    let runOpacity = -1
    const flush = () => {
      if (!run) return
      parts.push(
        <span key={parts.length} style={runOpacity < 1 ? { opacity: runOpacity } : undefined}>
          {run}
        </span>,
      )
      run = ''
    }
    for (const ch of tok.t) {
      if (col === caretCol) {
        flush()
        parts.push(<Caret key="caret" blink={false} />)
      }
      const o = opacityAt(progress, index, col)
      const rounded = o === 0 || o === 1 ? o : Math.round(o * 20) / 20
      if (rounded !== runOpacity) flush()
      runOpacity = rounded
      run += ch
      col++
    }
    flush()
    out.push(
      <span key={j} className={cls}>
        {parts}
      </span>,
    )
  })
  if (caretCol !== null && caretCol >= col) out.push(<Caret key="caret-end" blink={progress >= END} />)
  return <>{out}</>
}

export default function CodeWindow() {
  const { progress, cursor } = useTyping()

  return (
    <figure
      aria-label="Code-style summary of Thilina's profile"
      className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/10 dark:shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="size-2.5 rounded-full bg-fg/15" />
        <span className="ml-3 font-mono text-xs text-subtle">thilix.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-muted sm:text-[13px]">
        {/* Screen readers get the full text at once; the typing is visual only. */}
        <span className="sr-only">{plainText}</span>
        <code aria-hidden="true">
          {lines.map((_, i) => {
            return (
              <div key={i} className="flex">
                <span className="mr-5 w-4 shrink-0 text-right text-subtle/60 select-none">{i + 1}</span>
                <span className="whitespace-pre">
                  <CodeLine index={i} progress={progress} caretCol={i === cursor.line ? cursor.col : null} />
                </span>
              </div>
            )
          })}
        </code>
      </pre>
    </figure>
  )
}
