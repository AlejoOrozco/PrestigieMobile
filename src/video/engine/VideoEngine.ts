import type { VideoSource } from '../types'

export type VideoEngineKind = 'mobile' | 'desktop'

export type MountOptions = {
  source?: VideoSource
  className?: string
}

export interface VideoEngine {
  readonly kind: VideoEngineKind
  mount(container: HTMLElement, options?: MountOptions): () => void
}

