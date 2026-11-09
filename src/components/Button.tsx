import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-strong',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-accent/60 hover:text-accent',
  ghost: 'text-muted hover:text-fg',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3.5 text-sm',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: Size
  external?: boolean
  children: ReactNode
}

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({ href, variant = 'primary', size = 'md', external, className = '', children, ...rest }: ButtonLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
