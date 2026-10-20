import { useEffect, useRef } from 'react'

/**
 * Lightweight 3D wireframe globe drawn on a plain <canvas> (no WebGL / no extra deps).
 * - Fibonacci-sphere points joined to their nearest neighbours
 * - Two tilted orbit rings
 * - Slow auto-rotation + gentle pointer parallax
 * - Pauses when off-screen, static single frame for prefers-reduced-motion
 */

interface Vec { x: number; y: number; z: number }

const POINTS = 360
const NEIGHBOURS = 2

function buildSphere(): { pts: Vec[]; edges: [number, number][] } {
  const pts: Vec[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < POINTS; i++) {
    const y = 1 - (i / (POINTS - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r })
  }
  const edges: [number, number][] = []
  const seen = new Set<string>()
  for (let i = 0; i < pts.length; i++) {
    const dists = pts
      .map((p, j) => ({ j, d: (p.x - pts[i].x) ** 2 + (p.y - pts[i].y) ** 2 + (p.z - pts[i].z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS)
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    }
  }
  return { pts, edges }
}

export default function HoloGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { pts, edges } = buildSphere()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Theme colours come from CSS variables (lime accent + violet); refreshed when the theme changes
    let A = '190, 247, 58'
    let B = '155, 120, 255'
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const toRgb = (v: string, fallback: string) => {
        const parts = v.trim().split(/\s+/)
        return parts.length === 3 ? parts.join(', ') : fallback
      }
      A = toRgb(cs.getPropertyValue('--accent'), A)
      B = toRgb(cs.getPropertyValue('--accent2'), B)
      if (!running) draw()
    }

    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let angle = 0.6
    let tiltX = 0.35
    let targetTiltX = 0.35
    let targetYaw = 0
    let yaw = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!running) draw()
    }

    const project = (p: Vec, rotY: number, rotX: number, radius: number) => {
      // rotate around Y then X
      const cy = Math.cos(rotY)
      const sy = Math.sin(rotY)
      const x1 = p.x * cy + p.z * sy
      const z1 = -p.x * sy + p.z * cy
      const cx = Math.cos(rotX)
      const sx = Math.sin(rotX)
      const y2 = p.y * cx - z1 * sx
      const z2 = p.y * sx + z1 * cx
      const persp = 1 / (1.9 - z2 * 0.55)
      return {
        sx: w / 2 + x1 * radius * persp * 1.9,
        sy: h / 2 + y2 * radius * persp * 1.9,
        z: z2,
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const radius = Math.min(w, h) * 0.3
      const rotY = angle + yaw
      const rotX = tiltX

      // Edges
      ctx.lineWidth = 0.8
      for (const [a, b] of edges) {
        const pa = project(pts[a], rotY, rotX, radius)
        const pb = project(pts[b], rotY, rotX, radius)
        const depth = (pa.z + pb.z) / 2
        const alpha = 0.05 + ((depth + 1) / 2) * 0.28
        ctx.strokeStyle = `rgba(${A}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(pa.sx, pa.sy)
        ctx.lineTo(pb.sx, pb.sy)
        ctx.stroke()
      }

      // Nodes
      for (const p of pts) {
        const q = project(p, rotY, rotX, radius)
        const t = (q.z + 1) / 2
        const r = 0.6 + t * 1.5
        ctx.fillStyle =
          p.y > 0.15
            ? `rgba(${B}, ${(0.2 + t * 0.7).toFixed(3)})`
            : `rgba(${A}, ${(0.2 + t * 0.7).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(q.sx, q.sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Orbit rings
      const rings = [
        { tilt: 1.15, spin: angle * 1.6, radius: 1.28, color: 'B' },
        { tilt: -0.55, spin: -angle * 1.1, radius: 1.42, color: 'A' },
      ]
      for (const ring of rings) {
        const steps = 120
        ctx.lineWidth = 1
        for (let i = 0; i < steps; i++) {
          const a0 = (i / steps) * Math.PI * 2
          const a1 = ((i + 1) / steps) * Math.PI * 2
          const mk = (a: number): Vec => {
            const x = Math.cos(a) * ring.radius
            const z = Math.sin(a) * ring.radius
            // tilt ring around X, then spin around Y
            const y2 = -z * Math.sin(ring.tilt)
            const z2 = z * Math.cos(ring.tilt)
            return { x, y: y2, z: z2 }
          }
          const p0 = project(mk(a0), ring.spin * 0.2 + yaw, rotX * 0.6, radius)
          const p1 = project(mk(a1), ring.spin * 0.2 + yaw, rotX * 0.6, radius)
          const front = (p0.z + p1.z) / 2
          const alpha = 0.06 + ((front + 1.5) / 3) * 0.3
          ctx.strokeStyle = `rgba(${ring.color === 'A' ? A : B}, ${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(p0.sx, p0.sy)
          ctx.lineTo(p1.sx, p1.sy)
          ctx.stroke()
        }
        // satellite dot
        const sat = ring.spin * 2.2
        const sp = (() => {
          const x = Math.cos(sat) * ring.radius
          const z = Math.sin(sat) * ring.radius
          return project(
            { x, y: -z * Math.sin(ring.tilt), z: z * Math.cos(ring.tilt) },
            ring.spin * 0.2 + yaw,
            rotX * 0.6,
            radius,
          )
        })()
        const rc = ring.color === 'A' ? A : B
        ctx.fillStyle = `rgba(${rc}, 0.95)`
        ctx.shadowColor = `rgba(${rc}, 0.9)`
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(sp.sx, sp.sy, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      angle += dt * 0.28
      yaw += (targetYaw - yaw) * 0.05
      tiltX += (targetTiltX - tiltX) * 0.05
      draw()
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running || reduce) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointer = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      targetYaw = nx * 0.7
      targetTiltX = 0.35 + ny * 0.35
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true })

    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    readColors()
    resize()
    draw()

    return () => {
      mo.disconnect()
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
