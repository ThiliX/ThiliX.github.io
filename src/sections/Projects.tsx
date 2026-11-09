import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'

const ALL = 'All'

export default function Projects() {
  const [filter, setFilter] = useState(ALL)

  const technologies = useMemo(() => [...new Set(projects.flatMap((p) => p.tech))].sort(), [])
  // The filter only appears once there is something meaningful to filter by.
  const showFilter = technologies.length >= 2
  const visible = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Featured Projects"
      title="Things I've been building"
      lead="A selection of my software projects. More details, screenshots and links are being added as each project is documented."
    >
      {showFilter && (
        <Reveal className="mb-8">
          <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap gap-2">
            {[ALL, ...technologies].map((tech) => {
              const active = filter === tech
              return (
                <button
                  key={tech}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tech)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active ? 'border-accent bg-accent text-accent-fg' : 'border-line text-muted hover:border-line-strong hover:text-fg'
                  }`}
                >
                  {tech}
                </button>
              )
            })}
          </div>
        </Reveal>
      )}

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          See more of my work on GitHub
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  )
}
