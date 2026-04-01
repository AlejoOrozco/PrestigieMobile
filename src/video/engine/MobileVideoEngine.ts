import type { MountOptions, VideoEngine } from './VideoEngine'

function clearContainer(container: HTMLElement) {
  while (container.firstChild) container.removeChild(container.firstChild)
}

function renderFallback(container: HTMLElement, poster?: string) {
  if (poster) {
    const img = document.createElement('img')
    img.src = poster
    img.alt = ''
    img.decoding = 'async'
    img.loading = 'lazy'
    img.className = 'h-full w-full object-cover'
    container.appendChild(img)
    return
  }

  const fallback = document.createElement('div')
  fallback.className =
    'h-full w-full bg-gradient-to-br from-[#0b0b0b] via-black to-[#241a0b]'
  container.appendChild(fallback)
}

export class MobileVideoEngine implements VideoEngine {
  readonly kind = 'mobile' as const

  mount(container: HTMLElement, options?: MountOptions): () => void {
    clearContainer(container)

    const src = options?.source?.mobile
    const poster = options?.source?.poster

    if (!src) {
      renderFallback(container, poster)
      return () => clearContainer(container)
    }

    const video = document.createElement('video')
    video.className = ['h-full w-full object-cover', options?.className]
      .filter(Boolean)
      .join(' ')
    video.src = src
    if (poster) video.poster = poster

    video.playsInline = true
    video.muted = true
    video.loop = true
    video.preload = 'metadata'

    // Opt-in: other layers can request seeks without thrashing.
    let rafId: number | null = null
    let pendingSeek: number | null = null
    const onSeekRequest = (event: Event) => {
      const custom = event as CustomEvent<{ time: number }>
      if (typeof custom.detail?.time !== 'number') return
      pendingSeek = custom.detail.time
      if (rafId != null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        if (pendingSeek == null) return
        try {
          video.currentTime = pendingSeek
        } catch {
          // Ignore: seeking might fail before metadata is loaded.
        } finally {
          pendingSeek = null
        }
      })
    }

    container.addEventListener('video:seek', onSeekRequest as EventListener)
    container.appendChild(video)

    void video.play().catch(() => {
      // Autoplay may be blocked; still render the first frame/poster.
    })

    return () => {
      container.removeEventListener('video:seek', onSeekRequest as EventListener)
      if (rafId != null) window.cancelAnimationFrame(rafId)
      try {
        video.pause()
      } catch {
        // no-op
      }
      clearContainer(container)
    }
  }
}

