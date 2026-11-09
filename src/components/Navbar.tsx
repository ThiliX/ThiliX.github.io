import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, sectionIds } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { GitHubIcon, LogoMark } from './BrandIcons'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const active = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${profile.brand} — back to top`}>
          <LogoMark className="size-8" />
          <span className="font-semibold tracking-tight text-fg">{profile.brand}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`mx-auto mt-0.5 block h-px bg-accent-vivid transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="hidden size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            <GitHubIcon className="size-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-muted hover:text-fg md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-base ${
                  active === item.id ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base text-muted hover:bg-surface-2 hover:text-fg"
            >
              <GitHubIcon className="size-4" /> GitHub
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
