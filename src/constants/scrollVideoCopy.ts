/**
 * Textos para las experiencias de vídeo con scroll (AirPods / iPhone).
 * Misma estructura de fases; campos opcionales omiten bloques en UI/GSAP.
 */
export type ScrollVideoCopy = {
  /** Tras terminar el clip 1 (línea principal, centrada). */
  seq1Title: string
  /** Tras clip 1, segunda línea (opcional). */
  seq1Subtitle?: string
  scrollHint: string
  /** Tras terminar el clip 2 (título principal). */
  seq2Title: string
  /** Tras clip 2, subtítulo (opcional). */
  seq2Subtitle?: string
  ctaLabel: string
}

export const SCROLL_VIDEO_COPY_AIRPODS: ScrollVideoCopy = {
  seq1Title: 'El mundo, en silencio',
  scrollHint: 'Desliza hacia abajo para continuar',
  seq2Title: 'Así suena lo esencial.',
  seq2Subtitle: 'Estás listo?',
  ctaLabel: 'Ver todos los productos',
}

export const SCROLL_VIDEO_COPY_IPHONE: ScrollVideoCopy = {
  seq1Title: 'Algo se siente pesado ya.',
  seq1Subtitle:
    'Algunas cosas envejecen sin aviso. Hasta que ya no se puede ignorar.',
  scrollHint: 'Desliza hacia abajo para continuar',
  seq2Title: 'Elige lo que ya va adelante.',
  ctaLabel: 'Ver iPhones',
}
