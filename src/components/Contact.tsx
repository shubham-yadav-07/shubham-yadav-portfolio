import { useState, type FormEvent } from 'react'
import { Check, Copy, Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import { profile, socials } from '@/data/profile'
import Section from './Section'
import { LeetCodeIcon, XIcon } from './icons'

/** Optional form endpoint (e.g. Formspree). When empty the form falls back to a mailto link. */
const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() ?? ''

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        form.reset()
      } catch {
        setStatus('error')
      }
      return
    }

    // mailto fallback: opens the visitor's email app with the message pre-filled
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('mailto')
  }

  const fieldCls =
    'w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-base text-ink placeholder:text-ink-faint transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30'

  const links = [
    { label: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
    { label: 'GitHub', href: socials.github, Icon: Github },
    { label: 'LeetCode', href: socials.leetcode, Icon: LeetCodeIcon },
    { label: 'X / Twitter', href: socials.x, Icon: XIcon },
  ]

  return (
    <Section id="contact" title="Let's build something together">
      <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 shadow-card transition duration-500 hover:border-accent/40 hover:shadow-glow">
        <img
          src="/assets/banner.webp"
          width={1600}
          height={533}
          loading="lazy"
          decoding="async"
          alt="Banner with the name Shubham Yadav and the email address shubhamyadav.pro@gmail.com on a blue circuit-board background"
          className="block h-auto w-full transition duration-700 hover:scale-[1.02]"
        />
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <p className="max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
            I&apos;m open to internships, collaborations and hackathon teams in AI/ML, data analytics and software
            development. Send a message and I&apos;ll reply as soon as I can.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} data-magnetic className="btn-primary">
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
            <button type="button" onClick={copyEmail} className="btn-ghost" aria-live="polite">
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <ul className="mt-8 space-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-ink-muted transition hover:text-accent">
                <Mail size={18} aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            {profile.phoneTel && (
              <li>
                <a href={`tel:${profile.phoneTel}`} className="flex items-center gap-3 text-ink-muted transition hover:text-accent">
                  <Phone size={18} aria-hidden="true" />
                  {profile.phoneDisplay}
                </a>
              </li>
            )}
            {links.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-muted transition hover:text-accent"
                  aria-label={`${label} (opens in a new tab)`}
                >
                  <Icon size={18} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="panel space-y-5 p-6 sm:p-8" aria-describedby="form-note">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                Your name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={fieldCls} placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                Your email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="jane@company.com" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} className={`${fieldCls} resize-y`} placeholder="Tell me about the role or project..." />
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
            <Send size={16} aria-hidden="true" />
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          <p id="form-note" className="text-xs leading-relaxed text-ink-faint">
            {FORM_ENDPOINT
              ? 'Your message is sent securely to my inbox.'
              : 'This opens your email app with the message pre-filled. If nothing opens, email me directly using the address in this section.'}
          </p>

          <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status === 'sent' && <p className="text-ok">Thanks! Your message was sent.</p>}
            {status === 'mailto' && <p className="text-accent">Your email app should open with the message ready to send.</p>}
            {status === 'error' && (
              <p className="text-err">
                Could not send the message. Please email {profile.email} directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  )
}
