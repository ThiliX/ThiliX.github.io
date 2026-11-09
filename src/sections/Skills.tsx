import { skillCategories } from '../data/skills'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import SkillIcon from '../components/SkillIcon'

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills & Technologies"
      title="What I work with"
      lead="The languages, frameworks and tools I use in my projects and coursework — growing as I learn."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal as="li" key={category.title} delay={i * 60}>
            <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/40">
                  <SkillIcon name={category.icon} className="size-5" />
                </span>
                <h3 className="font-medium text-fg">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-fg"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
