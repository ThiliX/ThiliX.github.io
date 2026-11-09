import { CalendarCheck, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import Section from '../components/Section'
import Reveal from '../components/Reveal'

const facts = [
  { icon: GraduationCap, label: 'Studying', value: 'Software Engineering, NSBM Green University' },
  { icon: CalendarCheck, label: 'Expected graduation', value: '2028' },
  { icon: MapPin, label: 'Location', value: profile.location },
  { icon: Sparkles, label: 'Current focus', value: 'Frontend & web development' },
]

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Learning by building">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={100} className="space-y-6">
          <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs tracking-wide text-subtle uppercase">{label}</dt>
                  <dd className="mt-1 text-sm font-medium text-fg">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div>
            <h3 className="mb-3 text-sm font-medium text-fg">Interests</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li key={interest} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
