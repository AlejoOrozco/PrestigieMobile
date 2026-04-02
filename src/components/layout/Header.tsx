import { useCallback, useRef, useState } from 'react'
import { BRAND_CHAMPAGNE } from '../../constants/brandColors'
import { Container } from './Container'

type HeaderProps = {
  className?: string
  /** En catálogo / subvistas: volver al inicio. */
  onBack?: () => void
  onOpenProductsAirPods?: () => void
  onOpenProductsiPhones?: () => void
}

const SUBMENU_LEAVE_MS = 160

export function Header({
  className,
  onBack,
  onOpenProductsAirPods,
  onOpenProductsiPhones,
}: HeaderProps) {
  const [productsOpen, setProductsOpen] = useState(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
  }, [clearLeaveTimer, onOpenProductsiPhones])

  const handleAirPods = useCallback(() => {
    clearLeaveTimer()
    setProductsOpen(false)
    onOpenProductsAirPods?.()
  }, [clearLeaveTimer, onOpenProductsAirPods])

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
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors hover:bg-white/5 sm:px-3 sm:text-sm"
              style={{ color: BRAND_CHAMPAGNE }}
            >
              ← Volver
            </button>
          ) : null}
          <span
            className="truncate text-sm font-medium tracking-wide sm:text-base"
            style={{ color: BRAND_CHAMPAGNE }}
          >
            Pretigie Mobile
          </span>
        </div>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          style={{ color: BRAND_CHAMPAGNE }}
        >
          <a
            href="#"
            className="opacity-[0.88] transition-opacity hover:opacity-100"
          >
            Inicio
          </a>

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

          <a
            href="#"
            className="opacity-[0.88] transition-opacity hover:opacity-100"
          >
            Recursos
          </a>
        </nav>

        <span className="hidden w-16 shrink-0 sm:block sm:w-20" aria-hidden />
      </Container>
    </header>
  )
}
