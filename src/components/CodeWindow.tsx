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

type Cursor = { line: number; col: number }

const indentOf = (s: string) => s.length - s.trimStart().length

// Every caret position, in typing order. Indentation and blank lines are skipped,
// like an editor's auto-indent, so each step adds one visible character.
const steps: Cursor[] = [{ line: 0, col: 0 }]
lineText.forEach((text, line) => {
  if (text.length === 0) return
  for (let col = indentOf(text); col <= text.length; col++) {
    if (line > 0 || col > 0) steps.push({ line, col })
  }
})
const LAST = steps.length - 1

/** Types the code once when the page loads, in a fixed time; skipped for reduced-motion users. */
function useTyping() {
  const [step, setStep] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? LAST : 0,
  )

  useEffect(() => {
    if (step >= LAST) return
    let frame = 0
    let start = 0

    // Time-based rather than per-character timers, so it always finishes on schedule.
    const tick = (now: number) => {
      start ||= now
      const progress = Math.min(1, (now - start) / TYPE_DURATION)
      setStep(Math.round(progress * LAST))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    const timer = window.setTimeout(() => (frame = requestAnimationFrame(tick)), START_DELAY)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
    // Runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { cursor: steps[step], done: step >= LAST }
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

/** One line of code: typed characters visible, the rest kept invisible so the window never resizes. */
function CodeLine({ tokens, typed, caret }: { tokens: Token[]; typed: number; caret: ReactNode }) {
  const out: ReactNode[] = []
  let pos = 0
  tokens.forEach((tok, j) => {
    const shown = Math.max(0, Math.min(tok.t.length, typed - pos))
    const cls = tok.c ? colour[tok.c] : undefined
    out.push(
      <span key={j} className={cls}>
        {tok.t.slice(0, shown)}
        {caret && pos + shown === typed && (shown < tok.t.length || j === tokens.length - 1) && caret}
        {shown < tok.t.length && <span className="invisible">{tok.t.slice(shown)}</span>}
      </span>,
    )
    pos += tok.t.length
  })
  if (caret && tokens.length === 0) out.push(<span key="c">{caret}</span>)
  return <>{out}</>
}

export default function CodeWindow() {
  const { cursor, done } = useTyping()

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
          {lines.map((line, i) => {
            const typed = i < cursor.line ? lineText[i].length : i === cursor.line ? cursor.col : 0
            return (
              <div key={i} className="flex">
                <span className="mr-5 w-4 shrink-0 text-right text-subtle/60 select-none">{i + 1}</span>
                <span className="whitespace-pre">
                  <CodeLine tokens={line} typed={typed} caret={i === cursor.line ? <Caret blink={done} /> : null} />
                </span>
              </div>
            )
          })}
        </code>
      </pre>
    </figure>
  )
}
