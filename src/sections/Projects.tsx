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

  // Only offer technologies shared by at least two projects, most used first.
  const technologies = useMemo(() => {
    const counts = new Map<string, number>()
    for (const t of projects.flatMap((p) => p.tech)) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts]
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t)
  }, [])
  const showFilter = technologies.length >= 2

  const visible = filter === ALL ? projects : projects.filter((p) => p.tech.includes(filter))
  const featured = visible.filter((p) => p.featured)
  const others = visible.filter((p) => !p.featured)

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Things I've built"
      lead="From a self-hostable monitoring tool to a 3D web experience. Each project links to its source code, and live demos where available."
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

      {featured.length > 0 && (
        <ul className="mb-6 grid gap-6">
          {featured.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}

      {others.length > 0 && (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <Reveal as="li" key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      )}

      <Reveal className="mt-10 flex justify-center">
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          See all my repositories on GitHub
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  )
}
