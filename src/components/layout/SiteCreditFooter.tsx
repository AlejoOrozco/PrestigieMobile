import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import logoSrc from '../../assets/mock/pretigiemobilelogo.webp'
import { Container } from './Container'

export type SiteCreditFooterProps = {
  className?: string
  /** Set false when a parent element owns `id="recursos"` (e.g. landing mobile). */
  withRecursosAnchor?: boolean
}

export function SiteCreditFooter({
  className,
  withRecursosAnchor = true,
}: SiteCreditFooterProps) {
  return (
    <footer
      id={withRecursosAnchor ? 'recursos' : undefined}
      className={[
        'relative shrink-0 scroll-mt-16 bg-transparent px-3 pb-3 pt-0 sm:px-4 sm:pb-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container>
        <div className="mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl border border-[#c9a882]/25 bg-white/[0.03] p-4 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] backdrop-blur-sm sm:gap-5 sm:p-5">
          <div className="flex w-28 justify-start sm:w-40">
            <img
              src={logoSrc}
              alt="Prestigie Mobile"
              className="h-16 w-auto object-contain sm:h-24"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p
              className="text-center text-[11px] leading-relaxed text-white/45 sm:text-xs"
            >
              Todos los derechos reservados para <a href="https://www.prestigiemobile.com" target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-2 transition-colors hover:text-white/80 hover:decoration-white/40" style={{ color: BRAND_CHAMPAGNE }}>www.prestigiemobile.com</a>
            </p>
            <p className="mt-1 text-center text-[11px] leading-relaxed text-white/45 sm:text-xs">
              Este sitio web fue creado por el equipo de{' '}
              <a
                href="https://simplexa-labs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/25 underline-offset-2 transition-colors hover:text-white/80 hover:decoration-white/40"
                style={{ color: BRAND_CHAMPAGNE }}
              >
                Simplexa Labs
              </a>
              .
            </p>
          </div>
          <div className="w-28 sm:w-40" aria-hidden />
        </div>
      </Container>
    </footer>
  )
}
