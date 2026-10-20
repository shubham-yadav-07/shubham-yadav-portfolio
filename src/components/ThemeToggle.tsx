import { Moon, Sun } from 'lucide-react'
import type { Theme } from '@/hooks/useTheme'

interface Props {
  theme: Theme
  onToggle: () => void
}

/** Sun / switch / moon control, matches the reference design. */
export default function ThemeToggle({ theme, onToggle }: Props) {
  const light = theme === 'light'
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={light}
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      title={light ? 'Light theme' : 'Dark theme'}
      className="group flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 transition hover:border-accent/60"
    >
      <Sun size={16} aria-hidden="true" className={`transition ${light ? 'text-accent' : 'text-ink-faint'}`} />
      <span
        aria-hidden="true"
        className={`relative h-5 w-9 rounded-full transition-colors ${light ? 'bg-accent2/60' : 'bg-lime/80'}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
            light ? 'left-[1.15rem] !bg-white' : 'left-0.5'
          }`}
          style={{ backgroundColor: light ? '#fff' : '#0b1200' }}
        />
      </span>
      <Moon size={16} aria-hidden="true" className={`transition ${light ? 'text-ink-faint' : 'text-accent2'}`} />
    </button>
  )
}
