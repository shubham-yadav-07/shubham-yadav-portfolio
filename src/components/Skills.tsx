import { skillGroups } from '@/data/skills'
import Section from './Section'
import TiltCard from './TiltCard'

// 6-column grid on large screens: three cards on row one, two wider cards on row two
const spans = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Technologies I work with"
      intro="The tools I reach for when building projects and analysing data."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, i) => {
          const cyan = group.accent === 'cyan'
          return (
            <li key={group.title} className={spans[i] ?? ''}>
              <TiltCard max={5} className="rounded-2xl">
                <article
                  className={`panel h-full p-6 transition-colors ${
                    cyan ? 'hover:border-accent/50' : 'hover:border-accent2/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-sm ${cyan ? 'bg-accent shadow-glow' : 'bg-accent2 shadow-glow-violet'}`}
                    />
                    <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{group.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                    {group.items.map((s) => (
                      <li key={s} className="chip transition hover:border-white/30 hover:text-white">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
