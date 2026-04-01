import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import { Container } from './Container'

type NavLink = { label: string; href: string }

const links: NavLink[] = [
  { label: 'Inicio', href: '#' },
  { label: 'Nosotros', href: '#' },
  { label: 'Productos', href: '#' },
  { label: 'Recursos', href: '#' },
  { label: 'Pagos', href: '#' },
]

type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={[
        'relative border-b border-white/[0.08]',
        'bg-black/15 supports-[backdrop-filter]:bg-black/20',
        'backdrop-blur-2xl backdrop-saturate-150',
        'shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container className="relative flex h-18 items-center justify-between sm:h-22">
        <div className="flex items-center">
          <span
            className="text-sm font-medium tracking-wide sm:text-base"
            style={{ color: BRAND_CHAMPAGNE }}
          >
            Pretigie Mobile
          </span>
        </div>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          style={{ color: BRAND_CHAMPAGNE }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="opacity-[0.88] transition-opacity hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: BRAND_CHAMPAGNE }}
          >
            Contacto
          </a>
        </div>
      </Container>
    </header>
  )
}

