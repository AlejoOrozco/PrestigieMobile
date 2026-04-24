import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import { BRAND_CHAMPAGNE, BRAND_CHAMPAGNE_SHINE } from '../constants/brandColors'
import type { ScrollVideoCopy } from '../constants/scrollVideoCopy'
import ShinyText from './ui/ShinyText'
import './ScrollVideoSection.css'

const SCROLL_SECTION_HEIGHT_VH = 260
const DIM_OVERLAY_MAX = 0.52

const TEXT_BLUR_IN = 'blur(14px)'
const TEXT_BLUR_OUT = 'blur(12px)'

const TAIL_FRACTION = 0.2
const TAIL_MIN_RATE = 0.26

function applyPlaybackTail(video: HTMLVideoElement) {
  const d = video.duration
  if (!Number.isFinite(d) || d <= 0) {
    video.playbackRate = 1
    return
  }
  const t = video.currentTime
  const tail = d * TAIL_FRACTION
  if (t < d - tail) {
    video.playbackRate = 1
    return
  }
  const u = (t - (d - tail)) / tail
  const eased = 1 - (1 - TAIL_MIN_RATE) * u * u
  video.playbackRate = Math.max(TAIL_MIN_RATE, eased)
}

export type ScrollVideoPhase = 'seq1' | 'seq1_post' | 'seq2' | 'seq2_post'

export type ScrollVideoSectionProps = {
  id?: string
  videoSrc1: string
  videoSrc2: string
  copy: ScrollVideoCopy
  onViewProducts?: () => void
  onGoToProducts?: () => void
  /** Para ocultar el header mientras se reproduce el clip 1 o 2. */
  onPhaseChange?: (phase: ScrollVideoPhase) => void
}

export function ScrollVideoSection({
  id,
  videoSrc1,
  videoSrc2,
  copy,
  onViewProducts,
  onGoToProducts,
  onPhaseChange,
}: ScrollVideoSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const text1Ref = useRef<HTMLParagraphElement>(null)
  const seq1SubRef = useRef<HTMLParagraphElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const seq2MainRef = useRef<HTMLHeadingElement>(null)
  const seq2SubRef = useRef<HTMLParagraphElement | null>(null)
  const productsCtaRef = useRef<HTMLDivElement>(null)
  const dimOverlayRef = useRef<HTMLDivElement>(null)

  const [phase, setPhase] = useState<ScrollVideoPhase>('seq1')
  const phaseRef = useRef<ScrollVideoPhase>('seq1')

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    onPhaseChange?.(phase)
  }, [phase, onPhaseChange])

  const playback1StartedRef = useRef(false)
  const seq2StartedRef = useRef(false)
  const touchStartYRef = useRef<number | null>(null)

  const isSectionVisiblyOnScreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    return rect.top < vh * 0.92 && rect.bottom > vh * 0.08
  }, [])

  const tryPlaySeq1 = useCallback(() => {
    const video = video1Ref.current
    if (!video || playback1StartedRef.current) return
    if (!Number.isFinite(video.duration) || video.duration <= 0) return
    if (!isSectionVisiblyOnScreen()) return

    playback1StartedRef.current = true
    video.playbackRate = 1
    video.currentTime = 0
    void video.play().catch(() => {
      playback1StartedRef.current = false
    })
  }, [isSectionVisiblyOnScreen])

  useLayoutEffect(() => {
    const text1 = text1Ref.current
    const hint = scrollHintRef.current
    const main2 = seq2MainRef.current
    const sub2 = seq2SubRef.current
    const dim = dimOverlayRef.current
    const sub1 = seq1SubRef.current
    if (!text1 || !hint || !main2 || !dim) return

    gsap.set(dim, { opacity: 0 })
    gsap.set(text1, { opacity: 0, y: 28, filter: TEXT_BLUR_IN })
    if (sub1) gsap.set(sub1, { opacity: 0, y: 20, filter: TEXT_BLUR_IN })
    gsap.set(hint, { opacity: 0, y: 14, filter: TEXT_BLUR_IN })
    gsap.set(main2, { opacity: 0, y: 28, filter: TEXT_BLUR_IN })
    if (sub2) gsap.set(sub2, { opacity: 0, y: 14, filter: TEXT_BLUR_IN })
    const cta = productsCtaRef.current
    if (cta) gsap.set(cta, { opacity: 0, y: 22, filter: TEXT_BLUR_IN })
  }, [])

  useLayoutEffect(() => {
    const video = video1Ref.current
    const container = containerRef.current
    const text1 = text1Ref.current
    const hint = scrollHintRef.current
    const dim = dimOverlayRef.current
    if (!video || !container || !text1 || !hint || !dim) return

    const onSeq1Ended = () => {
      if (phaseRef.current !== 'seq1') return
      video.playbackRate = 1
      setPhase('seq1_post')
      gsap.to(dim, { opacity: DIM_OVERLAY_MAX, duration: 1, ease: 'power2.out' })
      gsap.fromTo(
        text1,
        { opacity: 0, y: 28, filter: TEXT_BLUR_IN },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power2.out',
        },
      )
      const sub1 = seq1SubRef.current
      if (sub1) {
        gsap.fromTo(
          sub1,
          { opacity: 0, y: 20, filter: TEXT_BLUR_IN },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power2.out',
            delay: 0.35,
          },
        )
      }
      gsap.fromTo(
        hint,
        { opacity: 0, y: 14, filter: TEXT_BLUR_IN },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power2.out',
          delay: sub1 ? 0.65 : 0.5,
        },
      )
    }

    const onLoaded = () => tryPlaySeq1()

    video.addEventListener('ended', onSeq1Ended)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('canplay', onLoaded)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            tryPlaySeq1()
            break
          }
        }
      },
      { threshold: [0, 0.15, 0.2, 0.35, 0.5] },
    )
    observer.observe(container)

    const t = window.setTimeout(() => tryPlaySeq1(), 350)

    return () => {
      window.clearTimeout(t)
      observer.disconnect()
      video.removeEventListener('ended', onSeq1Ended)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('canplay', onLoaded)
    }
  }, [tryPlaySeq1])

  const startSequence2 = useCallback(() => {
    if (seq2StartedRef.current || phaseRef.current !== 'seq1_post') return
    seq2StartedRef.current = true

    const v1 = video1Ref.current
    const v2 = video2Ref.current
    const text1 = text1Ref.current
    const hint = scrollHintRef.current
    const dim = dimOverlayRef.current
    const sub1 = seq1SubRef.current
    if (!v1 || !v2 || !text1 || !hint || !dim) return

    setPhase('seq2')

    const tl = gsap.timeline({
      onComplete: () => {
        v1.pause()
        v1.playbackRate = 1
        v2.playbackRate = 1
        v2.currentTime = 0
        gsap.set(v1, { opacity: 0 })
        gsap.set(v2, { opacity: 1 })
        void v2.play().catch(() => {})
      },
    })

    tl.to(dim, { opacity: 0, duration: 1, ease: 'power2.in' })
    tl.fromTo(
      text1,
      { opacity: 1, y: 0, filter: 'blur(0px)' },
      {
        opacity: 0,
        y: 28,
        filter: TEXT_BLUR_OUT,
        duration: 1,
        ease: 'power2.in',
      },
      0,
    )
    if (sub1) {
      tl.fromTo(
        sub1,
        { opacity: 1, y: 0, filter: 'blur(0px)' },
        {
          opacity: 0,
          y: 20,
          filter: TEXT_BLUR_OUT,
          duration: 0.85,
          ease: 'power2.in',
        },
        0.12,
      )
    }
    tl.fromTo(
      hint,
      { opacity: 1, y: 0, filter: 'blur(0px)' },
      {
        opacity: 0,
        y: 14,
        filter: TEXT_BLUR_OUT,
        duration: 0.7,
        ease: 'power2.in',
      },
      0.45,
    )
  }, [])

  const onSeq2Ended = useCallback(() => {
    if (phaseRef.current !== 'seq2') return
    const v2 = video2Ref.current
    if (v2) v2.playbackRate = 1
    const main2 = seq2MainRef.current
    const sub2 = seq2SubRef.current
    const dim = dimOverlayRef.current
    if (!main2 || !dim) return

    setPhase('seq2_post')

    gsap.to(dim, { opacity: DIM_OVERLAY_MAX, duration: 1, ease: 'power2.out' })
    gsap.fromTo(
      main2,
      { opacity: 0, y: 28, filter: TEXT_BLUR_IN },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.05,
        ease: 'power2.out',
      },
    )
    if (sub2) {
      gsap.fromTo(
        sub2,
        { opacity: 0, y: 14, filter: TEXT_BLUR_IN },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power2.out',
          delay: 0.5,
        },
      )
    }

    const cta = productsCtaRef.current
    if (cta && onViewProducts) {
      gsap.set(cta, { opacity: 0, y: 22, filter: TEXT_BLUR_IN })
      gsap.fromTo(
        cta,
        { opacity: 0, y: 22, filter: TEXT_BLUR_IN },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power2.out',
          delay: sub2 ? 1.35 : 1.1,
        },
      )
    }
  }, [onViewProducts])

  useEffect(() => {
    if (phase !== 'seq1_post') return

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== 'seq1_post') return
      if (e.deltaY > 1) {
        e.preventDefault()
        startSequence2()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null
    }

    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== 'seq1_post') return
      const start = touchStartYRef.current
      if (start == null) return
      const y = e.touches[0]?.clientY
      if (y == null) return
      if (start - y > 24) startSequence2()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [phase, startSequence2])

  useLayoutEffect(() => {
    const v2 = video2Ref.current
    if (!v2) return

    v2.addEventListener('ended', onSeq2Ended)
    return () => v2.removeEventListener('ended', onSeq2Ended)
  }, [onSeq2Ended])

  useEffect(() => {
    const v1El = video1Ref.current
    const v2El = video2Ref.current

    let raf = 0
    const tick = () => {
      const v1 = video1Ref.current
      const v2 = video2Ref.current
      if (v1) {
        if (!v1.paused && v1.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          applyPlaybackTail(v1)
        } else {
          v1.playbackRate = 1
        }
      }
      if (v2) {
        if (!v2.paused && v2.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          applyPlaybackTail(v2)
        } else {
          v2.playbackRate = 1
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      if (v1El) v1El.playbackRate = 1
      if (v2El) v2El.playbackRate = 1
    }
  }, [])

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${SCROLL_SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 z-30 relative flex h-[100svh] min-h-0 w-full flex-col bg-black supports-[height:100dvh]:h-[100dvh] md:h-[100dvh]">
        {/* Video + dim: full stage; out of flex flow */}
        <div className="pointer-events-none absolute inset-0 overflow-x-hidden overflow-y-visible">
          <div className="absolute inset-0 overflow-hidden">
            <div className="scroll-video-glow" aria-hidden />

            <video
              ref={video1Ref}
              key={videoSrc1}
              className="absolute inset-0 z-[1] h-full w-full object-contain object-center"
              src={videoSrc1}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />

            <video
              ref={video2Ref}
              key={videoSrc2}
              className="absolute inset-0 z-[1] h-full w-full object-contain object-center opacity-0"
              src={videoSrc2}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>

          <div
            ref={dimOverlayRef}
            className="scroll-video-dim pointer-events-none absolute inset-0 z-[2] bg-black"
            style={{ opacity: 0 }}
            aria-hidden
          />
        </div>

        {/* Copy: flex-1 uses the real sticky height (svh/dvh), so flex center matches the visible viewport */}
        <div className="relative z-[3] flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-8 sm:px-6 pointer-events-none">
          <div className="relative grid w-full max-w-4xl grid-cols-1 grid-rows-1 place-items-center">
            <div className="col-start-1 row-start-1 flex w-full flex-col items-center gap-3 text-center">
              <p
                ref={text1Ref}
                className="max-w-4xl text-center text-3xl font-medium leading-[1.25] tracking-wide will-change-[filter,opacity,transform] sm:text-4xl sm:leading-[1.28] md:text-5xl md:leading-[1.3]"
                style={{ letterSpacing: '0.06em', opacity: 0 }}
              >
                <ShinyText
                  text={copy.seq1Title}
                  speed={3}
                  delay={1}
                  color={BRAND_CHAMPAGNE}
                  shineColor={BRAND_CHAMPAGNE_SHINE}
                  spread={150}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="text-3xl font-medium tracking-[0.06em] sm:text-4xl md:text-5xl"
                />
              </p>
              {copy.seq1Subtitle ? (
                <p
                  ref={seq1SubRef}
                  className="max-w-2xl text-center text-sm font-medium leading-relaxed will-change-[filter,opacity,transform] sm:text-base sm:leading-relaxed"
                  style={{ letterSpacing: '0.04em', opacity: 0 }}
                >
                  <ShinyText
                    text={copy.seq1Subtitle}
                    speed={3}
                    delay={1}
                    color={BRAND_CHAMPAGNE}
                    shineColor={BRAND_CHAMPAGNE_SHINE}
                    spread={150}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="text-sm sm:text-base"
                  />
                </p>
              ) : null}
            </div>

            <div className="col-start-1 row-start-1 flex w-full flex-col items-center gap-2 text-center">
              <h2
                ref={seq2MainRef}
                className="max-w-4xl text-3xl font-medium leading-[1.28] tracking-wide will-change-[filter,opacity,transform] sm:text-4xl sm:leading-[1.3] md:text-5xl md:leading-[1.32]"
                style={{ letterSpacing: '0.06em', opacity: 0 }}
              >
                <ShinyText
                  text={copy.seq2Title}
                  speed={3}
                  delay={1}
                  color={BRAND_CHAMPAGNE}
                  shineColor={BRAND_CHAMPAGNE_SHINE}
                  spread={150}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="text-3xl font-medium tracking-[0.06em] sm:text-4xl md:text-5xl"
                />
              </h2>
              {copy.seq2Subtitle ? (
                <p
                  ref={seq2SubRef}
                  className="mx-auto mt-1 max-w-xl text-sm will-change-[filter,opacity,transform] sm:mt-2 sm:text-base"
                  style={{ opacity: 0 }}
                >
                  <ShinyText
                    text={copy.seq2Subtitle}
                    speed={3}
                    delay={1}
                    color={BRAND_CHAMPAGNE}
                    shineColor={BRAND_CHAMPAGNE_SHINE}
                    spread={150}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="text-sm sm:text-base"
                  />
                </p>
              ) : null}
              {onViewProducts ? (
                <div
                  ref={productsCtaRef}
                  className="mt-8 max-w-md will-change-[filter,opacity,transform]"
                  style={{ opacity: 0 }}
                >
                  <button
                    type="button"
                    onClick={onViewProducts}
                    className="pointer-events-auto w-full rounded-full border border-[#c9a882]/45 bg-black/40 px-6 py-3 text-sm font-medium tracking-wide backdrop-blur-sm transition-colors hover:bg-[#c9a882]/15 sm:text-base"
                    style={{ color: BRAND_CHAMPAGNE }}
                  >
                    {copy.ctaLabel}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          className="scroll-video-hint pointer-events-none absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-1/2 z-[4] w-[min(100%,24rem)] -translate-x-1/2 px-4 sm:bottom-[12%]"
          style={{ opacity: 0 }}
          role="status"
          aria-live="polite"
        >
          <span className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-black/50 px-4 py-2 shadow-lg backdrop-blur-md will-change-[filter,opacity,transform]">
            <ShinyText
              text={copy.scrollHint}
              speed={3}
              delay={1}
              color={BRAND_CHAMPAGNE}
              shineColor={BRAND_CHAMPAGNE_SHINE}
              spread={150}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              className="text-xs font-medium tracking-wide sm:text-sm"
            />
          </span>
        </div>

        {onGoToProducts ? (
          <div className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 z-[5] -translate-x-1/2 sm:bottom-6">
            <button
              type="button"
              onClick={onGoToProducts}
              className="pointer-events-auto rounded-full border border-[#c9a882]/45 bg-black/40 px-4 py-1.5 text-[11px] font-medium tracking-wide text-[#c9a882] backdrop-blur-sm transition-colors hover:bg-[#c9a882]/15 sm:text-xs"
            >
              ir a los productos
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
