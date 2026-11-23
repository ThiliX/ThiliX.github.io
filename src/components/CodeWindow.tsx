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

const START_DELAY = 500 // ms before typing begins
const CHAR_DELAY = 22 // ms per character
const LINE_DELAY = 160 // pause before starting the next line

type Cursor = { line: number; col: number }
const END: Cursor = { line: lines.length - 1, col: lineText[lines.length - 1].length }

const indentOf = (s: string) => s.length - s.trimStart().length

/** Types the code once when the page loads; skipped for reduced-motion users. */
function useTyping() {
  const [cursor, setCursor] = useState<Cursor>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? END : { line: 0, col: 0 },
  )
  const done = cursor.line === END.line && cursor.col === END.col

  useEffect(() => {
    if (done) return
    let { line, col } = cursor
    let timer: number

    const step = () => {
      if (col < lineText[line].length) {
        col += 1
        setCursor({ line, col })
        timer = window.setTimeout(step, CHAR_DELAY)
      } else if (line < lines.length - 1) {
        line += 1
        // Skip blank lines straight away.
        while (lineText[line].length === 0 && line < lines.length - 1) line += 1
        // Indentation appears instantly, like an editor's auto-indent.
        col = indentOf(lineText[line])
        setCursor({ line, col })
        timer = window.setTimeout(step, LINE_DELAY)
      }
    }

    timer = window.setTimeout(step, START_DELAY)
    return () => window.clearTimeout(timer)
    // Runs once on mount; the loop keeps its own position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { cursor, done }
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
