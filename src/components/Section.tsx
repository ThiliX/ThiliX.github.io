import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: string
  lead?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, index, eyebrow, title, lead, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl sm:mb-14">
          <p className="mb-3 font-mono text-xs tracking-wider text-accent uppercase">
            <span className="text-subtle">{index} /</span> {eyebrow}
          </p>
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
