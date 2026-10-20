import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, CalendarRange, GraduationCap, Landmark } from 'lucide-react'
import { education, sgpa } from '@/data/education'
import Section from './Section'

const MAX = 10

function Gauge({ value }: { value: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  const offset = c * (1 - value / MAX)
  return (
    <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90" role="img" aria-label={`SGPA ${value.toFixed(2)} out of ${MAX}`}>
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'rgb(var(--accent))' }} />
          <stop offset="100%" style={{ stopColor: 'rgb(var(--accent2))' }} />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(var(--fg) / 0.1)" strokeWidth="9" />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

export default function Education() {
  const [selected, setSelected] = useState(sgpa[sgpa.length - 1].sem)
  const current = sgpa.find((s) => s.sem === selected) ?? sgpa[sgpa.length - 1]

  return (
    <Section id="education" title="Education" intro="Semester-wise academic performance, shown as SGPA on a 10-point scale.">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Institution */}
        <article className="panel p-6 sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            <GraduationCap size={24} aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-bold text-white">{education.college}</h3>
          <p className="mt-2 text-base leading-relaxed text-ink">{education.degree}</p>
          <p className="mt-1 text-sm text-accent">{education.specialization}</p>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
            <div className="flex items-center gap-3 text-ink-muted">
              <Landmark size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">University</dt>
              <dd>{education.university}</dd>
            </div>
            <div className="flex items-center gap-3 text-ink-muted">
              <CalendarRange size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">Study period</dt>
              <dd>{education.period}</dd>
            </div>
            <div className="flex items-center gap-3 text-ink-muted">
              <Building2 size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
              <dt className="sr-only">Location</dt>
              <dd>Palghar, Maharashtra</dd>
            </div>
          </dl>
        </article>

        {/* SGPA explorer */}
        <article className="panel p-6 sm:p-8" aria-labelledby="sgpa-title">
          <h3 id="sgpa-title" className="text-lg font-semibold text-white">
            Semester-wise SGPA
          </h3>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <Gauge value={current.value} />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center" aria-live="polite">
                  <p className="font-display text-3xl font-bold text-white">{current.value.toFixed(2)}</p>
                  <p className="font-mono text-[0.7rem] text-ink-muted">SGPA / {MAX}</p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="mb-3 text-sm text-ink-muted">
                Semester {current.sem}: SGPA {current.value.toFixed(2)}
              </p>
              <ul className="grid h-40 grid-cols-6 items-end gap-2 sm:gap-3">
                {sgpa.map((s) => {
                  const on = s.sem === selected
                  return (
                    <li key={s.sem} className="h-full">
                      <button
                        type="button"
                        onClick={() => setSelected(s.sem)}
                        aria-pressed={on}
                        aria-label={`Semester ${s.sem}, SGPA ${s.value.toFixed(2)}`}
                        className="group flex h-full w-full flex-col"
                      >
                        <span
                          className={`mb-1 block text-center font-mono text-[0.68rem] transition-colors ${
                            on ? 'text-accent' : 'text-ink-faint group-hover:text-ink'
                          }`}
                        >
                          {s.value.toFixed(2)}
                        </span>
                        <span className="flex min-h-0 flex-1 items-end">
                          <motion.span
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(s.value / MAX) * 100}%` }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: s.sem * 0.05 }}
                            className={`block w-full rounded-t-md transition-colors ${
                              on
                                ? 'bg-gradient-to-t from-accent to-accent2 shadow-glow'
                                : 'bg-white/15 group-hover:bg-white/30'
                            }`}
                          />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <ul className="mt-2 grid grid-cols-6 gap-2 text-center font-mono text-[0.7rem] text-ink-faint sm:gap-3" aria-hidden="true">
                {sgpa.map((s) => (
                  <li key={s.sem}>Sem {s.sem}</li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {sgpa.map((s) => (
              <li
                key={s.sem}
                className={`rounded-xl border px-4 py-3 transition-colors ${
                  s.sem === selected ? 'border-accent/50 bg-accent/[0.07]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <p className="text-xs text-ink-muted">Semester {s.sem}</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-white">
                  {s.value.toFixed(2)} <span className="font-mono text-[0.7rem] font-normal text-ink-faint">SGPA</span>
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  )
}
