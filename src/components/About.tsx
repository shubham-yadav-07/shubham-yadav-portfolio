import { BarChart3, Brain, Code2, Hammer, ImageIcon, MapPin, GraduationCap, HeartHandshake } from 'lucide-react'
import { profile } from '@/data/profile'
import { education } from '@/data/education'
import Section from './Section'

const focus = [
  {
    Icon: Brain,
    title: 'AI & Machine Learning',
    text: 'Model building, evaluation and explainability with scikit-learn, XGBoost and SHAP.',
  },
  {
    Icon: BarChart3,
    title: 'Data Analytics',
    text: 'Exploratory analysis, clustering and visual storytelling that leads to clear decisions.',
  },
  {
    Icon: Code2,
    title: 'Software Development',
    text: 'React, FastAPI and Express apps with auth, databases and tests.',
  },
  {
    Icon: Hammer,
    title: 'Practical Projects',
    text: 'I learn by shipping: logistics, healthcare, security and analytics tools.',
  },
]

function PhotoPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Placeholder for Shubham's professional photograph"
      data-placeholder="professional-photo"
      className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-navy-900/70"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.12),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(var(--accent2)/0.14),transparent_55%)]"
      />
      <div className="relative px-6 text-center">
        <ImageIcon className="mx-auto text-ink-faint" size={34} aria-hidden="true" />
        <p className="mt-3 font-display text-base font-semibold text-ink">Professional photo</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-faint">Coming soon</p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        <div>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              I&apos;m a B.E. student in Computer Science and Engineering (AI &amp; ML) at {education.college}, affiliated
              to the University of Mumbai. I enjoy turning data into decisions and ideas into working software.
            </p>
            <p>
              My work sits between machine learning, data analytics and full-stack development. I&apos;ve built an
              offline-first logistics platform, an explainable healthcare-risk analyzer, a DSA analysis tool, and election
              analytics dashboards, and I add job simulations and certifications along the way to keep learning from
              industry workflows.
            </p>
            <p>
              I&apos;m looking for an AI/ML, data or software internship where I can contribute to real products and learn
              from a strong team.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {focus.map(({ Icon, title, text }) => (
              <li key={title} className="panel flex gap-4 p-5 transition hover:border-accent/40">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside aria-label="Profile photo and quick facts" className="mx-auto w-full max-w-xs lg:max-w-none">
          {profile.photoUrl ? (
            <div className="frame-grad rounded-3xl p-0 shadow-glow">
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                width={960}
                height={1201}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[1.3rem] object-cover object-top"
              />
            </div>
          ) : (
            <PhotoPlaceholder />
          )}
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="sr-only">Location</dt>
                <dd className="text-ink-muted">{profile.location}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="sr-only">Education</dt>
                <dd className="text-ink-muted">B.E. CSE (AI &amp; ML), {education.period}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <dt className="sr-only">Volunteering</dt>
                <dd className="text-ink-muted">NSS volunteer, community and beach clean-up drives</dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  )
}
