import { ArrowLeft } from 'lucide-react'
import DotField from '../components/DotField'
import { ButtonLink } from '../components/Button'
import { LogoMark } from '../components/BrandIcons'
import { profile } from '../data/profile'

export default function NotFound() {
  const path = window.location.pathname
  return (
    <>
    <DotField />
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-glow absolute inset-0" />
      </div>

      <a href={import.meta.env.BASE_URL} aria-label={`${profile.brand} home`} className="mb-10">
        <LogoMark className="size-10" />
      </a>
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">This page doesn't exist</h1>
      <p className="mt-4 max-w-md text-muted">The link may be broken, or the page may have moved.</p>
      <p className="mt-6 max-w-full truncate rounded-lg border border-line bg-surface px-4 py-2 font-mono text-xs text-subtle">
        GET <span className="text-fg">{path}</span> → <span className="text-accent">404 Not Found</span>
      </p>
      <ButtonLink href={import.meta.env.BASE_URL} className="mt-10">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
      </ButtonLink>
    </main>
    </>
  )
}
