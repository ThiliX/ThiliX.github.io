import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { ButtonLink } from '../components/Button'
import { GitHubIcon } from '../components/BrandIcons'
import CodeWindow from '../components/CodeWindow'
import Reveal from '../components/Reveal'

export default function Hero() {
  const githubHandle = profile.links.github.replace(/^https?:\/\/(www\.)?/, '')
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="bg-glow absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
        <div className="min-w-0">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              Based in {profile.location} · NSBM Green University
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 id="hero-heading" className="mt-6 text-4xl font-semibold tracking-tight break-words text-fg sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-accent">
              {profile.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-subtle">/</span>}
                  {role}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects">
              View My Projects <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Contact Me
            </ButtonLink>
            {profile.cvUrl && (
              <ButtonLink href={profile.cvUrl} variant="ghost" download external={false}>
                <Download className="size-4" aria-hidden="true" /> Download CV
              </ButtonLink>
            )}
          </Reveal>

          <Reveal delay={300}>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <GitHubIcon className="size-4" />
              <span className="font-mono">{githubHandle}</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="min-w-0 lg:pl-4">
          <CodeWindow />
        </Reveal>
      </div>
    </section>
  )
}
