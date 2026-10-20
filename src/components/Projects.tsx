import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Brain,
  Camera,
  Code2,
  Coins,
  Database,
  ExternalLink,
  Github,
  Heart,
  Info,
  Shield,
  Snowflake,
  Ticket,
  Vote,
  type LucideIcon,
} from 'lucide-react'
import { categoryLabels, projects, type Project, type ProjectCategory, type ProjectIcon } from '@/data/projects'
import Section from './Section'
import TiltCard from './TiltCard'

const icons: Record<ProjectIcon, LucideIcon> = {
  snowflake: Snowflake,
  heart: Heart,
  ticket: Ticket,
  camera: Camera,
  code: Code2,
  vote: Vote,
  shield: Shield,
  coins: Coins,
  database: Database,
  brain: Brain,
}

type Filter = 'all' | ProjectCategory
const filters: Filter[] = ['all', 'ai-ml', 'data', 'fullstack', 'security']

/** Deterministic pseudo-random numbers so each project gets its own abstract "dashboard" artwork. */
function seeded(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

function Cover({ project }: { project: Project }) {
  const Icon = icons[project.icon]
  const cyan = project.accent === 'cyan'
  const color = cyan ? 'var(--accent)' : 'var(--accent2)'
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        className="h-44 w-full object-cover"
      />
    )
  }
  const rnd = seeded(project.id)
  const bars = Array.from({ length: 9 }, () => 18 + rnd() * 62)
  const pts = Array.from({ length: 8 }, (_, i) => `${(i / 7) * 100},${70 - rnd() * 48}`).join(' ')
  // Abstract dashboard artwork (decorative, not a real screenshot)
  return (
    <div
      aria-hidden="true"
      className="relative h-44 overflow-hidden border-b border-white/10 bg-navy-950/80 p-3"
      style={{ backgroundImage: `radial-gradient(circle at 80% 0%, rgb(${color} / 0.22), transparent 55%)` }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-navy-900/80">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="ml-2 h-1.5 w-16 rounded bg-white/15" />
        </div>
        <div className="grid flex-1 grid-cols-[1fr_1.4fr] gap-2 p-2.5">
          <div className="flex flex-col justify-end gap-1">
            <div className="flex h-full items-end gap-1">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-500 group-hover:opacity-100"
                  style={{ height: `${h}%`, background: `rgb(${color} / ${0.35 + (i % 3) * 0.2})` }}
                />
              ))}
            </div>
          </div>
          <div className="relative rounded-md border border-white/10 bg-white/[0.03] p-1.5">
            <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-full w-full">
              <polyline points={pts} fill="none" stroke={`rgb(${color})`} strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
              <polyline points={`0,80 ${pts} 100,80`} fill={`rgb(${color} / 0.12)`} stroke="none" />
            </svg>
          </div>
        </div>
      </div>
      <span
        className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-xl border bg-void/80 backdrop-blur"
        style={{ borderColor: `rgb(${color} / 0.6)`, color: `rgb(${color})`, boxShadow: `0 0 30px -8px rgb(${color} / 0.7)` }}
      >
        <Icon size={22} />
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cyan = project.accent === 'cyan'
  return (
    <TiltCard max={6} className="rounded-2xl">
      <article
        className={`panel flex h-full flex-col overflow-hidden transition-colors ${
          cyan ? 'hover:border-accent/50' : 'hover:border-accent2/50'
        }`}
      >
        <Cover project={project} />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="font-mono text-xs text-ink-faint">{categoryLabels[project.category]}</p>
          <h3 className="mt-1.5 text-xl font-bold text-white">{project.title}</h3>
          <p className={`mt-1 text-sm font-medium ${cyan ? 'text-accent' : 'text-accent2'}`}>{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.description}</p>

          {project.note && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-warn/30 bg-warn/10 px-3 py-2 text-xs leading-relaxed text-warn">
              <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              {project.note}
            </p>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
            {project.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-4 !py-2.5"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
              >
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-4 !py-2.5"
                aria-label={`${project.title} live demo (opens in a new tab)`}
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      title="Turning ideas into real solutions"
      intro="A mix of AI/ML, data and full-stack work. Every GitHub link goes to the real repository."
    >
      <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                on
                  ? 'border-accent/60 bg-accent/15 text-accent'
                  : 'border-white/10 bg-white/[0.03] text-ink-muted hover:border-white/30 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All projects' : categoryLabels[f]}
            </button>
          )
        })}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <p className="mt-10 text-sm text-ink-muted">
        More work lives on{' '}
        <a
          href="https://github.com/shubham-yadav-07?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          my GitHub profile
        </a>
        .
      </p>
    </Section>
  )
}
