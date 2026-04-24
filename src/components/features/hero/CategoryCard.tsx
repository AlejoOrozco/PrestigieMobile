import { BRAND_CHAMPAGNE } from '../../../constants/brandColors'
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
      className="mx-auto flex w-fit max-w-[min(100%,220px)] cursor-pointer flex-col items-center gap-1.5 overflow-visible rounded-2xl text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a882]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:max-w-[min(100%,300px)] sm:gap-2 md:max-w-[min(100%,340px)]"
    >
      <span className="group relative isolate block w-fit max-w-full overflow-visible">
        {/* Larger than image so glow reads on big assets; sits behind img */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[132%] w-[116%] max-md:h-[128%] max-md:w-[112%] max-md:max-h-[min(32vh,16rem)] max-md:max-w-[min(88vw,20rem)] min-h-[6rem] min-w-[6rem] max-h-[min(38vh,20rem)] max-w-[min(92vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-[45%] opacity-[0.65] blur-3xl transition-[opacity,transform] duration-300 group-hover:opacity-[0.92] sm:min-h-[9rem] sm:min-w-[9rem]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 72% 68% at 50% 48%, rgba(201,168,130,0.55) 0%, rgba(201,168,130,0.22) 42%, rgba(201,168,130,0.08) 62%, transparent 78%)',
          }}
        />
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="relative z-[1] max-h-[min(17vh,8.25rem)] w-auto max-w-full object-contain object-center transition-[transform,filter] duration-300 ease-out group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_14px_rgba(201,168,130,0.35)] max-md:[mask-image:none] max-md:[-webkit-mask-image:none] sm:max-h-[min(22vh,9.375rem)] md:max-h-[min(26vh,12.5rem)] md:[mask-image:radial-gradient(ellipse_95%_92%_at_50%_50%,black_52%,transparent_100%)] md:[-webkit-mask-image:radial-gradient(ellipse_95%_92%_at_50%_50%,black_52%,transparent_100%)] lg:max-h-[min(28vh,13.75rem)]"
        />
      </span>

      <BlurText
        text={label}
        delay={140}
        animateBy="words"
        direction="top"
        className="shrink-0 justify-center text-center text-[11px] font-medium leading-tight tracking-wide sm:text-xs"
        style={{ color: BRAND_CHAMPAGNE }}
      />
    </Wrapper>
  )
}
