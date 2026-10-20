import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section-pad ${className}`}>
      <div className="container-x">
        <header className="mb-12 max-w-2xl">
          <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <div className="heading-bar mt-4" aria-hidden="true" />
          {intro && <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
