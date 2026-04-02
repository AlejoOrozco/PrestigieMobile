import type { CSSProperties, ElementType, ReactNode } from 'react'

type SectionProps<T extends ElementType> = {
  as?: T
  id?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Section<T extends ElementType = 'section'>({
  as,
  id,
  children,
  className,
  style,
}: SectionProps<T>) {
  const Comp = (as ?? 'section') as ElementType
  return (
    <Comp id={id} className={['w-full', className].join(' ')} style={style}>
      {children}
    </Comp>
  )
}

