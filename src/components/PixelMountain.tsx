/** Small 8-bit mountain scene (pure SVG rects), a nod to "building from the ground up". */
const W = 34
const PX = 6

function heightAt(x: number): number {
  const p1 = 15 - Math.abs(x - 11) * 1.1
  const p2 = 11 - Math.abs(x - 24) * 0.95
  const base = 3 + Math.sin(x * 1.7) * 0.6
  return Math.max(0, Math.round(Math.max(p1, p2, base)))
}

export default function PixelMountain({ className = '' }: { className?: string }) {
  const cols = Array.from({ length: W }, (_, x) => ({ x, h: heightAt(x) }))
  const maxH = Math.max(...cols.map((c) => c.h))
  const peakX = cols.find((c) => c.h === maxH)!.x
  const rects: JSX.Element[] = []
  for (const { x, h } of cols) {
    for (let k = 0; k < h; k++) {
      const y = maxH + 3 - k // flag space above
      const isTop = k >= h - 2
      const fill = isTop && h > 6 ? '#dcd8ff' : x < peakX + 2 ? '#5b4fd1' : x < 20 ? '#3e33a8' : '#4a3fc0'
      const shade = (x + k) % 5 === 0 ? 0.85 : 1
      rects.push(<rect key={`${x}-${k}`} x={x * PX} y={y * PX} width={PX} height={PX} fill={fill} opacity={shade} />)
    }
  }
  const fy = (maxH + 3 - maxH) * PX
  return (
    <svg
      viewBox={`0 0 ${W * PX} ${(maxH + 4) * PX}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects}
      {/* flag */}
      <rect x={peakX * PX + 2} y={fy - 4 * PX} width={2} height={5 * PX} fill="#e2e8f0" />
      <rect x={peakX * PX + 4} y={fy - 4 * PX} width={3 * PX} height={2 * PX} fill="rgb(190 247 58)" />
    </svg>
  )
}
