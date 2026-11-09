import { ArrowUpRight, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { profile } from '../data/profile'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons'

interface ChannelProps {
  icon: ReactNode
  label: string
  value: string
  href: string | null
  placeholder: string
}

function Channel({ icon, label, value, href, placeholder }: ChannelProps) {
  const inner = (
    <>
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs tracking-wide text-subtle uppercase">{label}</span>
        <span className={`mt-0.5 block truncate text-sm ${href ? 'font-medium text-fg' : 'text-subtle italic'}`}>
          {href ? value : placeholder}
        </span>
      </span>
    </>
  )

  if (!href) {
    return <div className="flex items-center gap-4 rounded-xl border border-dashed border-line-strong p-4">{inner}</div>
  }

  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
    >
      {inner}
      <ArrowUpRight className="size-4 text-subtle transition-colors group-hover:text-accent" aria-hidden="true" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}

export default function Contact() {
  const { email, github, linkedin } = profile.links
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Let's talk"
      lead="Whether it's an internship opportunity, a project collaboration or a question about my work, I'd be glad to hear from you."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
        <Reveal className="space-y-3">
          <Channel
            icon={<Mail className="size-4" aria-hidden="true" />}
            label="Email"
            value={email ?? ''}
            href={email ? `mailto:${email}` : null}
            placeholder="Email address to be added"
          />
          <Channel
            icon={<GitHubIcon className="size-4" />}
            label="GitHub"
            value={github.replace(/^https?:\/\//, '')}
            href={github}
            placeholder=""
          />
          <Channel
            icon={<LinkedInIcon className="size-4" />}
            label="LinkedIn"
            value={linkedin?.replace(/^https?:\/\/(www\.)?/, '') ?? ''}
            href={linkedin}
            placeholder="LinkedIn profile to be added"
          />
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
