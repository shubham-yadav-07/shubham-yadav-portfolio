import { Github, Linkedin, Mail } from 'lucide-react'
import { profile, socials } from '@/data/profile'
import { LeetCodeIcon, XIcon } from './icons'

const items = [
  { label: 'GitHub', href: socials.github, Icon: Github },
  { label: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
  { label: 'LeetCode', href: socials.leetcode, Icon: LeetCodeIcon },
  { label: 'X (Twitter)', href: socials.x, Icon: XIcon },
]

interface Props {
  size?: number
  className?: string
  showEmail?: boolean
}

export default function SocialLinks({ size = 20, className = '', showEmail = false }: Props) {
  const cls =
    'grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-glow'
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`} aria-label="Social links">
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            title={label}
            data-magnetic
            className={cls}
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
      {showEmail && (
        <li>
          <a href={`mailto:${profile.email}`} aria-label="Send an email" title="Email" className={cls}>
            <Mail size={size} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  )
}
