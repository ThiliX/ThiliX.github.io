import { ArrowUpRight, ExternalLink, Star } from 'lucide-react'
import type { Project } from '../data/projects'
import { asset } from '../lib/asset'
import { ButtonLink } from './Button'
import { GitHubIcon } from './BrandIcons'

function ProjectVisual({ project, featured }: { project: Project; featured: boolean }) {
  const frame = featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]' : 'aspect-[16/10]'

  if (project.image) {
    return (
      <img
        src={asset(project.image)}
        alt={project.imageAlt ?? `Screenshot of ${project.name}`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className={`${frame} w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]`}
      />
    )
  }

  const initials = project.name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)

  return (
    <div aria-hidden="true" className={`${frame} relative flex w-full items-center justify-center overflow-hidden bg-surface-2`}>
      <div className="bg-grid absolute inset-0 opacity-80" />
      <div className="bg-glow absolute inset-0" />
      <span className="relative font-mono text-5xl font-medium tracking-tight text-fg/80 transition-transform duration-500 group-hover:scale-105">
        {initials}
        <span className="text-accent-vivid">.</span>
      </span>
    </div>
  )
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
      {project.demoUrl && (
        <ButtonLink href={project.demoUrl} size="sm" aria-label={`${project.name} live demo (opens in a new tab)`}>
          <ExternalLink className="size-4" aria-hidden="true" /> Live demo
        </ButtonLink>
      )}
      {project.repoUrl && (
        <ButtonLink href={project.repoUrl} variant="secondary" size="sm" aria-label={`${project.name} source code on GitHub (opens in a new tab)`}>
          <GitHubIcon className="size-4" /> Source
        </ButtonLink>
      )}
      {project.links?.map((link) => (
        <ButtonLink
          key={link.href}
          href={link.href}
          variant="ghost"
          size="sm"
          aria-label={`${project.name}: ${link.label} (opens in a new tab)`}
        >
          {link.label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </ButtonLink>
      ))}
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.featured)

  return (
    <article
      className={`group flex h-full overflow-hidden rounded-2xl border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 ${
        featured
          ? 'flex-col border-line-strong hover:border-accent/50 lg:grid lg:grid-cols-[1.15fr_1fr]'
          : 'flex-col border-line hover:border-line-strong'
      }`}
    >
      <div className={`overflow-hidden border-line ${featured ? 'border-b lg:border-r lg:border-b-0' : 'border-b'}`}>
        <ProjectVisual project={project} featured={featured} />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8' : 'p-6'}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-accent">
              <Star className="size-3" aria-hidden="true" /> Featured
            </span>
          )}
          <span className="text-accent">{project.category}</span>
          <span className="text-subtle">· {project.year}</span>
        </div>

        <h3 className={`mt-2 font-semibold tracking-tight text-fg ${featured ? 'text-2xl' : 'text-xl'}`}>{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        {project.features.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Highlights</h4>
            <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted marker:text-accent">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
            {project.tech.map((t) => (
              <li key={t} className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] text-fg">
                {t}
              </li>
            ))}
          </ul>
        )}

        <Actions project={project} />
      </div>
    </article>
  )
}
