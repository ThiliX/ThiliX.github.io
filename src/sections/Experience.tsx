import { BookOpen, Briefcase, Laptop, Presentation, type LucideIcon } from 'lucide-react'
import { learning, type LearningKind } from '../data/experience'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

const kindIcon: Record<LearningKind, LucideIcon> = {
  Workshop: Presentation,
  Academic: BookOpen,
  'Self-learning': Laptop,
  Experience: Briefcase,
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="05"
      eyebrow="Experience & Learning"
      title="Workshops and ongoing learning"
      lead="Workshops, coursework and self-directed learning that shape how I build software."
    >
      <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-line sm:before:left-[23px]">
        {learning.map((item, i) => {
          const Icon = kindIcon[item.kind]
          return (
            <Reveal as="li" key={item.title} delay={i * 70} className="relative flex gap-5 sm:gap-6">
              <span className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg text-accent sm:size-12">
                <Icon className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <article className="flex-1 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">{item.kind}</span>
                  <span className="font-mono text-xs text-subtle">{item.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">{item.title}</h3>
                {item.organisation && <p className="mt-0.5 text-sm text-muted">{item.organisation}</p>}
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                {item.note && <p className="mt-3 text-xs text-subtle italic">{item.note}</p>}
              </article>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
