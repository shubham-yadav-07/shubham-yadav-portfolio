import { navLinks, profile } from '@/data/profile'
import SocialLinks from './SocialLinks'

export default function Footer() {
   const year = new Date().getFullYear()  return (
    <footer className="border-t border-white/10 bg-void/60">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-faint">
            &copy; {profile.name}.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks size={18} />
      </div>
    </footer>
  )
}
