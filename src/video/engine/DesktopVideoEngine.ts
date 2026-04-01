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
    'h-full w-full bg-gradient-to-br from-black via-[#120d06] to-black'
  container.appendChild(fallback)
}

export class DesktopVideoEngine implements VideoEngine {
  readonly kind = 'desktop' as const

  mount(container: HTMLElement, options?: MountOptions): () => void {
    clearContainer(container)

    const src = options?.source?.desktop
    const poster = options?.source?.poster

    if (!src) {
      renderFallback(container, poster)
      return () => clearContainer(container)
    }

    // Always render a stable fallback first to avoid layout shifts.
    renderFallback(container, poster)

    let destroyed = false
    let cleanup: (() => void) | null = null

    void (async () => {
      try {
        const mod = await import('scrolly-video')
        if (destroyed) return

        // scrolly-video API can vary; support common shapes without coupling UI code.
        const ScrollyVideoCtor =
          (mod as unknown as { default?: unknown; ScrollyVideo?: unknown })
            .default ??
          (mod as unknown as { ScrollyVideo?: unknown }).ScrollyVideo

        if (typeof ScrollyVideoCtor !== 'function') return

        const prefersWebCodecs =
          typeof window !== 'undefined' && 'VideoDecoder' in window

        const instance = new (ScrollyVideoCtor as new (args: unknown) => unknown)(
          {
            scrollyVideoContainer: container,
            src,
            useWebCodecs: prefersWebCodecs,
          },
        )

        cleanup = () => {
          const maybe = instance as unknown as { destroy?: () => void }
          maybe.destroy?.()
        }
      } catch {
        // If the module fails or is unsupported, keep the fallback.
      }
    })()

    return () => {
      destroyed = true
      try {
        cleanup?.()
      } catch {
        // no-op
      } finally {
        clearContainer(container)
      }
    }
  }
}

