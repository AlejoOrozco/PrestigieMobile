import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import { Container } from './Container'

export function SiteCreditFooter() {
  return (
    <footer
      id="recursos"
      className={[
        'relative shrink-0 scroll-mt-16 border-t border-white/[0.08] py-6 sm:py-8',
        'bg-black/15 supports-[backdrop-filter]:bg-black/20',
        'backdrop-blur-2xl backdrop-saturate-150',
        'shadow-[0_-12px_40px_-18px_rgba(0,0,0,0.55)]',
      ].join(' ')}
    >
      <Container>
        <p className="text-center text-[11px] leading-relaxed text-white/45 sm:text-xs">
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
      </Container>
    </footer>
  )
}
