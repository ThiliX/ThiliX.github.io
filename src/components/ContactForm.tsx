import { useState, type FormEvent } from 'react'
import { CheckCircle2, Info, Loader2, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { buttonClass } from './Button'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * How the form delivers messages, chosen from profile settings:
 *  - `formEndpoint` set  → POST to a form service (e.g. Formspree)
 *  - only `email` set    → opens the visitor's email app with the message pre-filled
 *  - neither             → form is shown disabled with a clear note
 */
const mode = profile.formEndpoint ? 'endpoint' : profile.links.email ? 'mailto' : 'disabled'

const field =
  'w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (mode === 'mailto' && profile.links.email) {
      const subject = `Portfolio enquiry from ${data.get('name')}`
      const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
      window.location.href = `mailto:${profile.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    if (mode === 'endpoint' && profile.formEndpoint) {
      if (data.get('_gotcha')) return // spam honeypot
      setStatus('sending')
      try {
        const res = await fetch(profile.formEndpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error(String(res.status))
        form.reset()
        setStatus('sent')
      } catch {
        setStatus('error')
      }
    }
  }

  const disabled = mode === 'disabled'

  if (status === 'sent') {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-surface p-10 text-center">
        <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-fg">Message sent</h3>
        <p className="mt-2 text-sm text-muted">Thanks for reaching out — I'll get back to you soon.</p>
        <button type="button" onClick={() => setStatus('idle')} className={buttonClass('secondary', 'sm', 'mt-6')}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {disabled && (
        <p className="mb-6 flex gap-2.5 rounded-lg border border-line bg-surface-2/60 p-3.5 text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            The contact form isn't connected yet. In the meantime, you can reach me through{' '}
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
              GitHub
            </a>
            .
          </span>
        </p>
      )}

      <fieldset disabled={disabled || status === 'sending'} className="space-y-5">
        <legend className="sr-only">Send a message</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-fg">
              Name
            </label>
            <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
          </div>
          <div>
            <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-fg">
              Email
            </label>
            <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-fg">
            Message
          </label>
          <textarea id="cf-message" name="message" required rows={5} placeholder="What would you like to talk about?" className={`${field} resize-y`} />
        </div>

        {mode === 'endpoint' && (
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className={buttonClass('primary', 'md', 'disabled:cursor-not-allowed disabled:opacity-50')}>
            {status === 'sending' ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {status === 'sending' ? 'Sending…' : mode === 'mailto' ? 'Open in email app' : 'Send message'}
          </button>
          {status === 'error' && (
            <p role="alert" className="text-sm text-red-500">
              Something went wrong. Please try again{profile.links.email ? ' or email me directly' : ''}.
            </p>
          )}
        </div>
      </fieldset>
    </form>
  )
}
