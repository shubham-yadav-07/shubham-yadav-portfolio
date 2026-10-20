import { useEffect } from 'react'
import { useFinePointer } from '@/hooks/useFinePointer'

const INTERACTIVE = 'a, button, [role="button"], [role="switch"], input, textarea, select, label, summary'

/**
 * Cursor movement effects (mouse devices only, disabled for reduced motion):
 *  - soft spotlight that follows the pointer across the page background
 *  - trailing ring + dot cursor that grows over links / buttons
 *  - "magnetic" pull on elements marked with data-magnetic
 * The native cursor stays visible, so nothing is hidden from keyboard or screen-reader users.
 */
export default function CursorEffects() {
  const enabled = useFinePointer()

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    if (!ring || !dot) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let rx = tx
    let ry = ty
    let raf = 0
    let pending = false
    let lastMagnet: HTMLElement[] = []

    const magnets = () => Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      root.classList.add('cursor-on')
      root.style.setProperty('--mx', `${e.clientX}px`)
      root.style.setProperty('--my', `${e.clientY}px`)
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`

      // magnetic pull
      if (!pending) {
        pending = true
        requestAnimationFrame(() => {
          pending = false
          const active: HTMLElement[] = []
          for (const el of magnets()) {
            const r = el.getBoundingClientRect()
            const cx = r.left + r.width / 2
            const cy = r.top + r.height / 2
            const dx = tx - cx
            const dy = ty - cy
            const reach = Math.max(r.width, r.height) / 2 + 40
            if (Math.hypot(dx, dy) < reach) {
              el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.28}px)`
              active.push(el)
            }
          }
          for (const el of lastMagnet) if (!active.includes(el)) el.style.transform = ''
          lastMagnet = active
        })
      }
    }

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null
      ring.classList.toggle('is-hover', !!t?.closest(INTERACTIVE))
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    const onLeave = () => root.classList.remove('cursor-on')

    const loop = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('cursor-on')
      lastMagnet.forEach((el) => (el.style.transform = ''))
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div className="cursor-ring" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
    </>
  )
}
