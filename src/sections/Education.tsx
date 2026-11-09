import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/experience'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

export default function Education() {
  return (
    <Section id="education" index="04" eyebrow="Education" title="Where I'm studying">
      <div className="space-y-6">
        {education.map((entry) => (
          <Reveal key={entry.institution}>
            <article className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent-vivid" />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg">{entry.programme}</h3>
                    <p className="mt-1 text-muted">{entry.institution}</p>
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-vivid" />
                      {entry.status}
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm sm:text-right">
                  <p className="font-mono text-fg">{entry.period}</p>
                  <p className="inline-flex items-center gap-1.5 text-subtle">
                    <MapPin className="size-3.5" aria-hidden="true" /> {entry.location}
                  </p>
                </div>
              </div>
              {entry.notes.length > 0 && (
                <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-muted sm:pl-16">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-subtle" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
