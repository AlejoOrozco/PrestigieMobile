import { BRAND_CHAMPAGNE } from '../../../constants/brandColors'
import { Card } from '../../ui/Card'
import BlurText from '../../ui/BlurText'

type CategoryCardProps = {
  label: string
  imageSrc: string
  imageAlt: string
  href?: string
  /** When set, click navigates in-app instead of following `href`. */
  onActivate?: () => void
}

export function CategoryCard({
  label,
  imageSrc,
  imageAlt,
  href = '#',
  onActivate,
}: CategoryCardProps) {
  const Wrapper = onActivate ? 'button' : 'a'
  const wrapperProps = onActivate
    ? { type: 'button' as const, onClick: onActivate }
    : { href }

  return (
    <Wrapper
      {...wrapperProps}
      className="block h-full cursor-pointer rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a882]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <Card className="group relative flex flex-col overflow-hidden border-[#c9a882]/30 bg-white/[0.03] p-2 transition-transform duration-200 active:scale-[0.98] sm:p-3 md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(201,168,130,0.4),0_30px_90px_-40px_rgba(201,168,130,0.45)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 md:group-hover:opacity-100">
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_40%,rgba(201,168,130,0.22),transparent_55%)]" />
        </div>

        <div className="relative flex flex-col gap-1.5 sm:gap-2">
          <div className="relative mx-auto w-full max-w-[min(100%,280px)] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] shadow-[inset_0_0_0_1px_rgba(201,168,130,0.14)] sm:max-w-[min(100%,320px)]">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 z-0 h-full w-full object-contain object-center p-1 sm:p-1.5"
              />
              <div className="card-image-edge-fade" aria-hidden="true" />
            </div>
          </div>

          <BlurText
            text={label}
            delay={140}
            animateBy="words"
            direction="top"
            className="shrink-0 justify-center text-center text-[11px] font-medium leading-tight tracking-wide sm:text-xs"
            style={{ color: BRAND_CHAMPAGNE }}
          />
        </div>
      </Card>
    </Wrapper>
  )
}

