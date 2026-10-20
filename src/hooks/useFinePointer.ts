import { useEffect, useState } from 'react'

/** True when the device has a hover-capable mouse AND the user hasn't asked for reduced motion. */
export function useFinePointer(): boolean {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setOk(fine.matches && !reduce.matches)
    update()
    fine.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  return ok
}
