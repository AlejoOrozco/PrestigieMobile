import type { ElementType, ReactNode } from 'react'

type TypographyProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
}

export function Typography<T extends ElementType = 'p'>({
  as,
  children,
  className,
}: TypographyProps<T>) {
  const Comp = (as ?? 'p') as ElementType
  return (
    <Comp className={['text-white/90', className].join(' ')}>{children}</Comp>
  )
}

