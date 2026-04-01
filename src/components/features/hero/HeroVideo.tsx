import { useEffect, useRef } from 'react'
import { useVideoEngine } from '../../../video/hooks/useVideoEngine'
import type { VideoSource } from '../../../video/types'

type HeroVideoProps = {
  source?: VideoSource
}

export function HeroVideo({ source }: HeroVideoProps) {
  const engine = useVideoEngine()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cleanup = engine.mount(el, { source })
    return () => cleanup()
  }, [engine, source])

  return (
    <div className="relative w-full">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div ref={ref} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#f5d27a]/10" />
    </div>
  )
}

