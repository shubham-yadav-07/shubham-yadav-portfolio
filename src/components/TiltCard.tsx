import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useFinePointer } from '@/hooks/useFinePointer'

interface Props {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees */
  max?: number
  glare?: boolean
  style?: CSSProperties
}

/**
 * CSS-3D tilt on hover. Only active on devices with a fine pointer and
 * when the user has not requested reduced motion.
 */
export default function TiltCard({ children, className = '', max = 7, glare = true, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useFinePointer()

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !enabled) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div style={{ perspective: '900px', ...style }} className="h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`group relative h-full transition-transform duration-200 ease-out will-change-transform ${className}`}
        style={{ transform: enabled ? 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))' : undefined }}
      >
        {children}
        {glare && enabled && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(260px circle at var(--gx,50%) var(--gy,50%), rgb(var(--accent) / 0.14), transparent 60%)',
            }}
          />
        )}
      </div>
    </div>
  )
}
