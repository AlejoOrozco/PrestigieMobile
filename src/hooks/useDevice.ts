import { useEffect, useMemo, useState } from 'react'

type DeviceInfo = {
  isMobile: boolean
  isDesktop: boolean
}

const DESKTOP_QUERY = '(min-width: 768px)'

export function useDevice(): DeviceInfo {
  const canMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (!canMatchMedia) return false
    return window.matchMedia(DESKTOP_QUERY).matches
  })

  useEffect(() => {
    if (!canMatchMedia) return

    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }

    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [canMatchMedia])

  return useMemo(
    () => ({ isMobile: !isDesktop, isDesktop }),
    [isDesktop],
  )
}

