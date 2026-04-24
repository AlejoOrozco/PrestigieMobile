import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import logoSrc from '../../assets/mock/pretigiemobilelogo.webp'
import { Container } from './Container'

export type SiteCreditFooterProps = {
  className?: string
  /** Set false when a parent element owns `id="recursos"` (e.g. landing mobile). */
  withRecursosAnchor?: boolean
}

const linkClass =
  'underline decoration-white/25 underline-offset-2 transition-colors hover:text-white/80 hover:decoration-white/40'

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
        <div
          className={[
            'mx-auto w-full min-w-0 rounded-xl border border-[#c9a882]/25 bg-white/[0.03] p-4 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] backdrop-blur-sm sm:p-5',
            'flex flex-col items-stretch gap-4 text-center',
            'md:grid md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_minmax(0,10rem)] md:items-center md:gap-5',
          ].join(' ')}
        >
          <div className="flex shrink-0 justify-center self-center md:justify-self-start md:justify-start">
            <img
              src={logoSrc}
              alt="Prestigie Mobile"
              className="h-14 w-auto object-contain sm:h-16 md:h-24"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="w-full min-w-0 md:min-w-0">
            <p className="text-balance text-xs leading-relaxed text-white/55 sm:text-sm md:text-pretty">
              Todos los derechos reservados para{' '}
              <a
                href="https://www.prestigiemobile.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={{ color: BRAND_CHAMPAGNE }}
              >
                www.prestigiemobile.com
              </a>
            </p>
            <p className="mt-2 text-balance text-xs leading-relaxed text-white/55 sm:text-sm md:text-pretty">
              Este sitio web fue creado por el equipo de{' '}
              <a
                href="https://simplexa-labs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={{ color: BRAND_CHAMPAGNE }}
              >
                Simplexa Labs
              </a>
              .
            </p>
          </div>

          <div className="hidden min-h-0 md:block md:w-full" aria-hidden />
        </div>
      </Container>
    </footer>
  )
}
