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

export default function CodeWindow() {
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
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span aria-hidden="true" className="mr-5 w-4 shrink-0 text-right text-subtle/60 select-none">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tok, j) => (
                  <span key={j} className={tok.c ? colour[tok.c] : undefined}>
                    {tok.t}
                  </span>
                ))}
                {i === lines.length - 1 && <span aria-hidden="true" className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-accent" />}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </figure>
  )
}
