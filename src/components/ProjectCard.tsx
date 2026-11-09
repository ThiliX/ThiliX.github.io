import { ExternalLink, ImageIcon } from 'lucide-react'
import type { Project } from '../data/projects'
import { ButtonLink } from './Button'
import { GitHubIcon } from './BrandIcons'

function Placeholder({ text }: { text: string }) {
  return <p className="text-sm text-subtle italic">{text}</p>
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `Screenshot of ${project.name}`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    )
  }

  const initials = project.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)

  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-surface-2">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-80" />
      <div aria-hidden="true" className="bg-glow absolute inset-0" />
      <span
        aria-hidden="true"
        className="relative font-mono text-5xl font-medium tracking-tight text-fg/80 transition-transform duration-500 group-hover:scale-105"
      >
        {initials}
        <span className="text-accent-vivid">.</span>
      </span>
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/80 px-2 py-1 text-[11px] text-subtle backdrop-blur">
        <ImageIcon className="size-3" aria-hidden="true" /> Screenshot coming soon
      </span>
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30">
      <div className="overflow-hidden border-b border-line">
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-accent">{project.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-5">
          <h4 className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Key features</h4>
          {project.features.length > 0 ? (
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted marker:text-accent">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : (
            <Placeholder text="Feature details to be added." />
          )}
        </div>

        <div className="mt-5">
          <h4 className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Tech stack</h4>
          {project.tech.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t} className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] text-fg">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder text="Technologies to be added." />
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          {project.repoUrl ? (
            <ButtonLink href={project.repoUrl} variant="secondary" size="sm" aria-label={`${project.name} source code on GitHub (opens in a new tab)`}>
              <GitHubIcon className="size-4" /> GitHub
            </ButtonLink>
          ) : (
            <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-line-strong px-3.5 text-xs text-subtle">
              <GitHubIcon className="size-3.5" /> Repository link coming soon
            </span>
          )}
          {project.demoUrl && (
            <ButtonLink href={project.demoUrl} size="sm" aria-label={`${project.name} live demo (opens in a new tab)`}>
              <ExternalLink className="size-4" aria-hidden="true" /> Live demo
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  )
}
