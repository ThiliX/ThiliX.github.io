import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, LogoMark } from './BrandIcons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <LogoMark className="size-7" />
          <p className="text-sm text-muted">
            © {year} {profile.name} <span className="text-subtle">· {profile.brand}</span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-xs text-subtle">Built with React, TypeScript &amp; Tailwind CSS</p>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="text-muted transition-colors hover:text-fg"
          >
            <GitHubIcon className="size-5" />
          </a>
          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="text-muted transition-colors hover:text-fg"
            >
              <LinkedInIcon className="size-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
