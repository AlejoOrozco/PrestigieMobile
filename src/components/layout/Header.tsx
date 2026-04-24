import { useCallback, useEffect, useRef, useState } from 'react'
import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import { Container } from './Container'

type HeaderProps = {
  className?: string
  /** Ir al inicio (landing: scroll arriba; catálogo: volver a la landing). También para el nombre de marca. */
  onInicio?: () => void
  onOpenProductsAirPods?: () => void
  onOpenProductsiPhones?: () => void
  /** Si no se pasa, Recursos usa #recursos */
  onRecursos?: () => void
}

const SUBMENU_LEAVE_MS = 160

export function Header({
  className,
  onInicio,
  onOpenProductsAirPods,
  onOpenProductsiPhones,
  onRecursos,
}: HeaderProps) {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    setMobileProductsOpen(false)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen, closeMobileMenu])

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }, [])

  const openProductsMenu = useCallback(() => {
    clearLeaveTimer()
    setProductsOpen(true)
  }, [clearLeaveTimer])

  const scheduleCloseProductsMenu = useCallback(() => {
    clearLeaveTimer()
    leaveTimerRef.current = setTimeout(() => {
      setProductsOpen(false)
      leaveTimerRef.current = null
    }, SUBMENU_LEAVE_MS)
  }, [clearLeaveTimer])

  const handleIphones = useCallback(() => {
    clearLeaveTimer()
    setProductsOpen(false)
    onOpenProductsiPhones?.()
    closeMobileMenu()
  }, [clearLeaveTimer, onOpenProductsiPhones, closeMobileMenu])

  const handleAirPods = useCallback(() => {
    clearLeaveTimer()
    setProductsOpen(false)
    onOpenProductsAirPods?.()
    closeMobileMenu()
  }, [clearLeaveTimer, onOpenProductsAirPods, closeMobileMenu])

  const goInicio = useCallback(() => {
    onInicio?.()
    closeMobileMenu()
  }, [onInicio, closeMobileMenu])

  const goRecursos = useCallback(() => {
    if (onRecursos) {
      onRecursos()
    } else {
      document.getElementById('recursos')?.scrollIntoView({ behavior: 'smooth' })
    }
    closeMobileMenu()
  }, [onRecursos, closeMobileMenu])

  return (
    <header
      className={[
        'relative border-b border-white/[0.08]',
        'bg-black/15 supports-[backdrop-filter]:bg-black/20',
        'backdrop-blur-2xl backdrop-saturate-150',
        'shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)]',
        className,
        'z-50',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container className="relative flex h-14 items-center justify-between sm:h-16 md:h-[4.5rem]">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onInicio ? (
            <button
              type="button"
              onClick={goInicio}
              className="truncate text-left text-sm font-medium tracking-wide transition-opacity hover:opacity-90 sm:text-base"
              style={{ color: BRAND_CHAMPAGNE }}
            >
              Pretigie Mobile
            </button>
          ) : (
            <a
              href="#inicio"
              className="truncate text-sm font-medium tracking-wide sm:text-base"
              style={{ color: BRAND_CHAMPAGNE }}
            >
              Pretigie Mobile
            </a>
          )}
        </div>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          style={{ color: BRAND_CHAMPAGNE }}
        >
          {onInicio ? (
            <button
              type="button"
              onClick={onInicio}
              className="opacity-[0.88] transition-opacity hover:opacity-100"
            >
              Inicio
            </button>
          ) : (
            <a
              href="#inicio"
              className="opacity-[0.88] transition-opacity hover:opacity-100"
            >
              Inicio
            </a>
          )}

          <div
            className="relative"
            onMouseEnter={openProductsMenu}
            onMouseLeave={scheduleCloseProductsMenu}
          >
            <button
              type="button"
              className="opacity-[0.88] transition-opacity hover:opacity-100"
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              aria-controls="header-productos-submenu"
            >
              Productos
            </button>
            {productsOpen ? (
              <div
                id="header-productos-submenu"
                role="menu"
                aria-label="Categorías de productos"
                className="absolute left-1/2 top-full z-50 min-w-[10.5rem] -translate-x-1/2 pt-2"
              >
                <div className="overflow-hidden rounded-lg border border-white/[0.12] bg-black/90 py-1 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                  <button
                    type="button"
                    role="menuitem"
                    className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06]"
                    onClick={handleIphones}
                  >
                    iPhones
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06]"
                    onClick={handleAirPods}
                  >
                    AirPods
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {onRecursos ? (
            <button
              type="button"
              onClick={onRecursos}
              className="opacity-[0.88] transition-opacity hover:opacity-100"
            >
              Recursos
            </button>
          ) : (
            <a
              href="#recursos"
              className="opacity-[0.88] transition-opacity hover:opacity-100"
            >
              Recursos
            </a>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:contents">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a882]/30 bg-white/[0.06] shadow-[0_8px_28px_-18px_rgba(201,168,130,0.35)] backdrop-blur-md backdrop-saturate-150 md:hidden"
            style={{ color: BRAND_CHAMPAGNE }}
            aria-expanded={mobileMenuOpen}
            aria-controls="header-mobile-menu"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? (
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            ) : (
              <span className="flex w-5 flex-col gap-1" aria-hidden>
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            )}
          </button>
          <span className="hidden w-16 shrink-0 md:block md:w-20" aria-hidden />
        </div>
      </Container>

      {mobileMenuOpen ? (
        <div
          id="header-mobile-menu"
          className={[
            'fixed inset-0 top-14 z-[100] flex flex-col sm:top-16 md:hidden',
            'border-t border-white/[0.08]',
            'bg-black/50 supports-[backdrop-filter]:bg-black/30',
            'backdrop-blur-2xl backdrop-saturate-150',
            'shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)]',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onClick={closeMobileMenu}
        >
          <button
            type="button"
            className="absolute right-4 top-3 z-[1] rounded-lg px-3 py-2 text-sm text-white/70"
            onClick={(e) => {
              e.stopPropagation()
              closeMobileMenu()
            }}
          >
            Cerrar
          </button>
          <nav
            className="flex flex-1 flex-col gap-1 px-6 pb-8 pt-14 text-base"
            style={{ color: BRAND_CHAMPAGNE }}
            onClick={(e) => e.stopPropagation()}
          >
            {onInicio ? (
              <button
                type="button"
                className="rounded-lg py-3 text-left font-medium"
                onClick={goInicio}
              >
                Inicio
              </button>
            ) : (
              <a
                href="#inicio"
                className="rounded-lg py-3 font-medium"
                onClick={closeMobileMenu}
              >
                Inicio
              </a>
            )}

            <div className="border-t border-white/10 pt-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg py-3 text-left font-medium"
                onClick={() => setMobileProductsOpen((o) => !o)}
                aria-expanded={mobileProductsOpen}
              >
                Productos
                <span className="text-white/50">{mobileProductsOpen ? '−' : '+'}</span>
              </button>
              {mobileProductsOpen ? (
                <div className="ml-2 flex flex-col border-l border-white/10 pl-3">
                  <button
                    type="button"
                    className="py-2.5 text-left text-[15px] text-white/90"
                    onClick={handleIphones}
                  >
                    iPhones
                  </button>
                  <button
                    type="button"
                    className="py-2.5 text-left text-[15px] text-white/90"
                    onClick={handleAirPods}
                  >
                    AirPods
                  </button>
                </div>
              ) : null}
            </div>

            {onRecursos ? (
              <button
                type="button"
                className="rounded-lg py-3 text-left font-medium"
                onClick={goRecursos}
              >
                Recursos
              </button>
            ) : (
              <a
                href="#recursos"
                className="rounded-lg py-3 font-medium"
                onClick={closeMobileMenu}
              >
                Recursos
              </a>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
