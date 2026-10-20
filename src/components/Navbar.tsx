import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import type { Theme } from '@/hooks/useTheme'
import ThemeToggle from './ThemeToggle'

const ids = navLinks.map((l) => l.href.slice(1))

interface NavProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  // Close the mobile menu if the viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const linkCls = (href: string) =>
    `nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active === href.slice(1) ? 'text-white' : 'text-ink-muted hover:text-white'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-void/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
          <span
            aria-hidden="true"
            className="font-display text-2xl font-bold italic leading-none tracking-tighter text-accent transition group-hover:scale-110"
          >
            SY
          </span>
          <span className="hidden font-display text-base font-semibold text-white sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkCls(l.href)} aria-current={active === l.href.slice(1) ? 'true' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href={profile.resumeUrl} download={profile.resumeFileName} data-magnetic className="btn-primary hidden !px-4 !py-2.5 xl:inline-flex">
            <Download size={16} aria-hidden="true" />
            Download Resume
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active === l.href.slice(1) ? 'bg-accent/10 text-accent' : 'text-ink'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-primary w-full">
                  <Download size={16} aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
