import { useState } from 'react'
import { Award, BadgeCheck, Briefcase, ExternalLink, GraduationCap, Trophy, type LucideIcon } from 'lucide-react'
import { achievementHighlight, certifications, type CertKind } from '@/data/certifications'
import Section from './Section'

const kindIcon: Record<CertKind, LucideIcon> = {
  Award: Trophy,
  Certification: BadgeCheck,
  'Job simulation': Briefcase,
  Internship: GraduationCap,
}

const INITIAL = 8

export default function Achievements() {
  const [showAll, setShowAll] = useState(false)
  const list = showAll ? certifications : certifications.slice(0, INITIAL)

  return (
    <Section
      id="achievements"
      title="Achievements & certifications"
      intro="Hackathon results, industry job simulations and verified learning programs."
    >
      {/* Highlight */}
      <article className="relative overflow-hidden rounded-2xl border border-accent2/40 bg-gradient-to-br from-accent2/[0.14] via-navy-900/70 to-accent/[0.08] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-accent2/50 bg-accent2/15 text-accent2 shadow-glow-violet">
            <Trophy size={32} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {achievementHighlight.title}, {achievementHighlight.event}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {achievementHighlight.detail}
            </p>
          </div>
        </div>
      </article>

      {/* Certificates */}
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map((c) => {
          const Icon = kindIcon[c.kind] ?? Award
          return (
            <li key={`${c.title}-${c.issuer}`}>
              <article className="panel flex h-full gap-4 p-5 transition-colors hover:border-accent/40">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-snug text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{c.issuer}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
                    <span className="chip">{c.kind}</span>
                    <span>{c.date}</span>
                    {c.detail && <span>{c.detail}</span>}
                  </p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
                      aria-label={`View credential for ${c.title} (opens in a new tab)`}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      View credential
                    </a>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      {certifications.length > INITIAL && (
        <div className="mt-8 flex justify-center">
          <button type="button" className="btn-ghost" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
            {showAll ? 'Show fewer' : `Show all ${certifications.length}`}
          </button>
        </div>
      )}
    </Section>
  )
}
