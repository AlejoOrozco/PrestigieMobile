import { motion, type Transition } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type BlurTextAs = 'p' | 'span'

type BlurTextProps = {
  /** Use `span` when nesting inside a heading (e.g. h1) for valid HTML. */
  as?: BlurTextAs
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
  style?: CSSProperties
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ])

  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

export default function BlurText({
  as = 'p',
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  style: styleProp,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const pRef = useRef<HTMLParagraphElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = (as === 'span' ? spanRef.current : pRef.current)
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [as, threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  )

  const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    ...styleProp,
  }

  const content = elements.map((segment, index) => {
    const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

    const spanTransition: Transition = {
      duration: totalDuration,
      times,
      delay: (index * delay) / 1000,
      ease: easing,
    }

    return (
      <motion.span
        key={index}
        initial={fromSnapshot}
        animate={inView ? animateKeyframes : fromSnapshot}
        transition={spanTransition}
        onAnimationComplete={
          index === elements.length - 1 ? onAnimationComplete : undefined
        }
        style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
      >
        {segment === ' ' ? '\u00A0' : segment}
        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
      </motion.span>
    )
  })

  if (as === 'span') {
    return (
      <span ref={spanRef} className={className} style={style}>
        {content}
      </span>
    )
  }

  return (
    <p ref={pRef} className={className} style={style}>
      {content}
    </p>
  )
}

