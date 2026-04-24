import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Container } from '../components/layout/Container'
import { Header } from '../components/layout/Header'
import { SiteCreditFooter } from '../components/layout/SiteCreditFooter'
import LightRays from '../components/ui/LightRays'
import { WhatsAppFloatingButton } from '../components/ui/WhatsAppFloatingButton'
import { BRAND_CHAMPAGNE } from '../constants/brandColors'

export type CatalogProduct = {
  id: string
  name: string
  category: string
  priceCop: number | null
  detail: string
  specs: string[]
  imageUrls: string[]
  batteryPercent?: number
  priceShowDesde?: boolean
  color?: string
  model?: string
  storage?: string
}

export type ProductCatalogPageProps = {
  onInicio: () => void
  onOpenProductsAirPods: () => void
  onOpenProductsiPhones: () => void
  onRecursos: () => void
  products: CatalogProduct[]
  heading: string
  enableFilters?: boolean
  defaultViewLabel?: string
  mostWantedProductIds?: string[]
  infoHoverMessage?: string
}

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function whatsappPhoneDigits(): string | undefined {
  const raw = import.meta.env.WHATSAPP_PHONE_E164 ?? ''
    .trim()
    .replace(/^["']|["']$/g, '')
  const digits = raw.replace(/\D/g, '')
  return digits.length > 0 ? digits : undefined
}

function whatsappUrlForProduct(p: CatalogProduct): string {
  const phone = whatsappPhoneDigits()
  if (!phone) return '#'

  const isIphone = p.category.trim().toLowerCase() === 'iphone'
  const text = isIphone
    ? `Hola, me interesa el ${p.name}, ¿me podrías dar más información por favor?`
    : `Hola, me interesan los ${p.name}, ¿me podrías dar más información por favor?`

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

function whatsappUrlWithText(text: string): string {
  const phone = whatsappPhoneDigits()
  if (!phone) return '#'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

const IMAGE_ROTATE_MS = 3800

const CARD_BLUR_STEP_DURATION = 0.58
const CARD_BLUR_STEPS = 2
const CARD_BLUR_TOTAL_DURATION = CARD_BLUR_STEP_DURATION * CARD_BLUR_STEPS

const cardListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
}

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: [0, 0.5, 1],
    y: [-50, 5, 0],
    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
    transition: {
      duration: CARD_BLUR_TOTAL_DURATION,
      times: [0, 0.5, 1],
      ease: [0, 0, 1, 1],
    },
  },
}

function ProductCardImages({
  name,
  urls,
}: {
  name: string
  urls: string[]
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (urls.length <= 1) return
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % urls.length)
    }, IMAGE_ROTATE_MS)
    return () => window.clearInterval(t)
  }, [urls.length])

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 -bottom-2 z-[1] h-7 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,130,0.2)_0%,rgba(201,168,130,0.08)_42%,transparent_75%)] blur-md"
      />
      <div
        className="relative z-[2] aspect-[4/3] w-full max-h-[min(22vh,96px)] overflow-hidden rounded-lg bg-white/[0.06] sm:max-h-[120px]"
        style={{
          maskImage:
            'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
        }}
      >
      {urls.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{
            opacity: i === idx ? 1 : 0,
            maskImage:
              'radial-gradient(120% 95% at 50% 48%, black 58%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(120% 95% at 50% 48%, black 58%, transparent 100%)',
          }}
        />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.04)_36%,rgba(0,0,0,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_55%,transparent_45%,rgba(0,0,0,0.45)_100%)] ring-1 ring-inset ring-white/10"
        style={{
          maskImage:
            'radial-gradient(120% 90% at 50% 55%, transparent 56%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(120% 90% at 50% 55%, transparent 56%, black 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-transparent"
      />
      <span className="sr-only">
        {name}: imagen {idx + 1} de {urls.length}
      </span>
      </div>
    </div>
  )
}

export function ProductCatalogPage({
  onInicio,
  onOpenProductsAirPods,
  onOpenProductsiPhones,
  onRecursos,
  products,
  heading,
  enableFilters = false,
  defaultViewLabel = 'Los mas deseados',
  mostWantedProductIds = [],
  infoHoverMessage,
}: ProductCatalogPageProps) {
  const [selectedColor, setSelectedColor] = useState('all')
  const [selectedModel, setSelectedModel] = useState('all')
  const [selectedStorage, setSelectedStorage] = useState('all')
  const [selectedBattery, setSelectedBattery] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedView, setSelectedView] = useState<'most-wanted' | 'all'>(
    'most-wanted'
  )
  const [infoPanelOpen, setInfoPanelOpen] = useState(false)
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false)
  const infoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!infoPanelOpen) return
    const closeIfOutside = (e: MouseEvent | TouchEvent) => {
      const root = infoWrapRef.current
      if (!root) return
      const t = e.target
      if (t instanceof Node && !root.contains(t)) setInfoPanelOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInfoPanelOpen(false)
    }
    document.addEventListener('mousedown', closeIfOutside)
    document.addEventListener('touchstart', closeIfOutside, { passive: true })
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', closeIfOutside)
      document.removeEventListener('touchstart', closeIfOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [infoPanelOpen])

  const mostWantedSet = useMemo(
    () => new Set(mostWantedProductIds),
    [mostWantedProductIds]
  )

  const colors = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.color?.trim()).filter(Boolean) as string[])
      ).sort((a, b) => a.localeCompare(b)),
    [products]
  )

  const models = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.model?.trim()).filter(Boolean) as string[])
      ).sort((a, b) => a.localeCompare(b)),
    [products]
  )

  const storages = useMemo(
    () =>
      Array.from(
        new Set(
          products.map((p) => p.storage?.trim()).filter(Boolean) as string[]
        )
      ).sort((a, b) => a.localeCompare(b)),
    [products]
  )

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        enableFilters &&
        selectedView === 'most-wanted' &&
        mostWantedSet.size > 0 &&
        !mostWantedSet.has(p.id)
      ) {
        return false
      }

      if (selectedColor !== 'all' && p.color !== selectedColor) return false
      if (selectedModel !== 'all' && p.model !== selectedModel) return false
      if (selectedStorage !== 'all' && p.storage !== selectedStorage) return false

      if (selectedPrice !== 'all') {
        const price = p.priceCop
        if (price == null) return false
        if (selectedPrice === '600k-1m' && (price < 600_000 || price > 1_000_000))
          return false
        if (
          selectedPrice === '1m-2m' &&
          (price < 1_000_000 || price > 2_000_000)
        )
          return false
        if (
          selectedPrice === '2m-3m' &&
          (price < 2_000_000 || price > 3_000_000)
        )
          return false
        if (
          selectedPrice === '3m-4m' &&
          (price < 3_000_000 || price > 4_000_000)
        )
          return false
      }

      if (selectedBattery !== 'all') {
        const battery = p.batteryPercent
        if (battery == null) return false
        if (selectedBattery === '80-85' && (battery < 80 || battery > 85))
          return false
        if (selectedBattery === '86-90' && (battery < 86 || battery > 90))
          return false
        if (selectedBattery === '91-100' && (battery < 91 || battery > 100))
          return false
      }

      return true
    })
  }, [
    enableFilters,
    mostWantedSet,
    products,
    selectedBattery,
    selectedColor,
    selectedModel,
    selectedPrice,
    selectedStorage,
    selectedView,
  ])

  const hasActiveFilters =
    selectedColor !== 'all' ||
    selectedModel !== 'all' ||
    selectedStorage !== 'all' ||
    selectedBattery !== 'all' ||
    selectedPrice !== 'all' ||
    selectedView !== 'most-wanted'

  const missingModelWhatsappUrl = whatsappUrlWithText(
    'hola, no encontre el modelo de iphone que queria, me podrias ayudar?'
  )
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor={BRAND_CHAMPAGNE}
          raysSpeed={0.85}
          lightSpread={0.55}
          rayLength={2.8}
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1.15}
          saturation={0.92}
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_100%,rgba(0,0,0,0.75)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(201,168,130,0.08),transparent_48%)]" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Header
          className="shrink-0"
          onInicio={onInicio}
          onOpenProductsAirPods={onOpenProductsAirPods}
          onOpenProductsiPhones={onOpenProductsiPhones}
          onRecursos={onRecursos}
        />

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pt-4 sm:px-6 sm:pt-5">
          <Container className="pb-6">
            <h1 className="shrink-0 text-lg font-semibold tracking-tight text-white sm:text-xl">
              {heading}
            </h1>

            {enableFilters ? (
              <section className="mt-3 rounded-xl border border-[#c9a882]/25 bg-white/[0.03] p-3 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] backdrop-blur-sm sm:mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedView('most-wanted')}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        selectedView === 'most-wanted'
                          ? 'border-[#c9a882]/55 bg-[#c9a882]/20 text-[#edd1ae]'
                          : 'border-white/20 bg-black/25 text-white/80 hover:border-[#c9a882]/45'
                      }`}
                    >
                      {defaultViewLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedView('all')}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        selectedView === 'all'
                          ? 'border-[#c9a882]/55 bg-[#c9a882]/20 text-[#edd1ae]'
                          : 'border-white/20 bg-black/25 text-white/80 hover:border-[#c9a882]/45'
                      }`}
                    >
                      Todos
                    </button>
                  </div>

                  {infoHoverMessage ? (
                    <div
                      ref={infoWrapRef}
                      className="group relative flex items-center"
                    >
                      <button
                        type="button"
                        id="catalog-info-trigger"
                        aria-expanded={infoPanelOpen}
                        aria-controls="catalog-info-popover"
                        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#c9a882]/40 bg-black/40 text-xs font-semibold text-[#edd1ae] transition-colors hover:border-[#c9a882]/55 md:cursor-help"
                        onClick={() => setInfoPanelOpen((o) => !o)}
                      >
                        <span className="sr-only">
                          Información sobre &quot;{defaultViewLabel}&quot;
                        </span>
                        <span aria-hidden>i</span>
                      </button>
                      <div
                        id="catalog-info-popover"
                        role="region"
                        aria-labelledby="catalog-info-trigger"
                        className={[
                          'absolute right-0 top-8 z-20 w-[min(90vw,420px)] rounded-lg border border-[#c9a882]/35 bg-black/90 p-2 text-[11px] leading-relaxed text-white/90 shadow-xl transition-opacity',
                          infoPanelOpen
                            ? 'pointer-events-auto opacity-100'
                            : 'pointer-events-none opacity-0 md:group-hover:opacity-100',
                        ].join(' ')}
                      >
                        {infoHoverMessage}
                        <span className="ml-1 align-middle" aria-hidden>
                          🟢
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  id="catalog-filters-toggle"
                  aria-expanded={mobileFiltersExpanded}
                  aria-controls="catalog-filters-panel"
                  className="mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-white/20 bg-black/35 px-3 py-2 text-left text-xs transition-colors hover:border-[#c9a882]/45 md:hidden"
                  onClick={() => setMobileFiltersExpanded((v) => !v)}
                >
                  <span className="font-medium" style={{ color: BRAND_CHAMPAGNE }}>
                    Filtros
                  </span>
                  <span className="flex items-center gap-1.5 text-white/55">
                    <span className="sr-only">
                      {mobileFiltersExpanded
                        ? 'Ocultar filtros avanzados'
                        : 'Mostrar filtros avanzados'}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-[#c9a882] transition-transform duration-200 ease-out ${
                        mobileFiltersExpanded ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  id="catalog-filters-panel"
                  className={[
                    'mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5',
                    mobileFiltersExpanded ? 'max-md:mt-2' : 'max-md:hidden',
                  ].join(' ')}
                >
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/35 px-2 py-2 text-xs text-white outline-none transition-colors hover:border-[#c9a882]/45 focus:border-[#c9a882]/55"
                  >
                    <option value="all">Color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/35 px-2 py-2 text-xs text-white outline-none transition-colors hover:border-[#c9a882]/45 focus:border-[#c9a882]/55"
                  >
                    <option value="all">Modelo</option>
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStorage}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/35 px-2 py-2 text-xs text-white outline-none transition-colors hover:border-[#c9a882]/45 focus:border-[#c9a882]/55"
                  >
                    <option value="all">Almacenamiento</option>
                    {storages.map((storage) => (
                      <option key={storage} value={storage}>
                        {storage}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedBattery}
                    onChange={(e) => setSelectedBattery(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/35 px-2 py-2 text-xs text-white outline-none transition-colors hover:border-[#c9a882]/45 focus:border-[#c9a882]/55"
                  >
                    <option value="all">Batería</option>
                    <option value="80-85">80% - 85%</option>
                    <option value="86-90">86% - 90%</option>
                    <option value="91-100">91% - 100%</option>
                  </select>

                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="rounded-lg border border-white/20 bg-black/35 px-2 py-2 text-xs text-white outline-none transition-colors hover:border-[#c9a882]/45 focus:border-[#c9a882]/55"
                  >
                    <option value="all">Precio</option>
                    <option value="600k-1m">600.000 COP - 1.000.000 COP</option>
                    <option value="1m-2m">1.000.000 COP - 2.000.000 COP</option>
                    <option value="2m-3m">2.000.000 COP - 3.000.000 COP</option>
                    <option value="3m-4m">3.000.000 COP - 4.000.000 COP</option>
                  </select>
                </div>
              </section>
            ) : null}

            <motion.ul
              className={[
                'mt-3 grid gap-2 max-sm:grid-cols-2 sm:mt-4 sm:gap-4',
                'sm:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]',
              ].join(' ')}
              variants={cardListVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((p) => (
                <motion.li
                  key={p.id}
                  className="min-w-0 [will-change:transform,opacity,filter]"
                  variants={cardItemVariants}
                >
                  <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-lg border border-[#c9a882]/25 bg-white/[0.03] p-2 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] transition-colors hover:border-[#c9a882]/45 sm:rounded-xl sm:p-3">
                    <div className="shrink-0">
                      <ProductCardImages name={p.name} urls={p.imageUrls} />
                    </div>

                    <div className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden sm:mt-2">
                      <div className="mb-1 flex flex-wrap items-start justify-between gap-1 sm:mb-1.5 sm:gap-1.5">
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide sm:px-2 sm:text-[9px]"
                          style={{
                            color: BRAND_CHAMPAGNE,
                            backgroundColor: 'rgba(201, 168, 130, 0.12)',
                          }}
                        >
                          {p.category}
                        </span>
                        {p.priceCop != null ? (
                          <span className="text-right text-[10px] font-semibold tabular-nums text-white sm:text-xs">
                            {p.priceShowDesde
                              ? `Desde ${formatCOP(p.priceCop)}`
                              : formatCOP(p.priceCop)}
                          </span>
                        ) : null}
                      </div>
                      <h2 className="text-[11px] font-semibold leading-snug text-white max-sm:line-clamp-2 sm:text-xs sm:leading-snug md:text-sm">
                        {p.name}
                      </h2>
                      <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-white/75 sm:mt-1 sm:line-clamp-3 sm:text-xs">
                        {p.detail}
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1 sm:mt-2 sm:gap-1.5">
                        {p.batteryPercent != null ? (
                          <li className="rounded border border-white/10 bg-black/30 px-1 py-0.5 text-[8px] text-white/85 sm:px-1.5 sm:text-[10px]">
                            🔋{p.batteryPercent}%
                          </li>
                        ) : null}
                        {p.specs.map((s) => (
                          <li
                            key={s}
                            className="rounded border border-white/10 bg-black/30 px-1 py-0.5 text-[8px] text-white/85 max-sm:max-w-full max-sm:truncate sm:px-1.5 sm:text-[10px]"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={whatsappUrlForProduct(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 block w-full rounded-md border border-[#c9a882]/40 py-1 text-center text-[10px] font-medium transition-colors hover:bg-[#c9a882]/10 sm:mt-2 sm:rounded-lg sm:py-1.5 sm:text-xs"
                        style={{ color: BRAND_CHAMPAGNE }}
                        aria-label={`Contactar por WhatsApp sobre ${p.name}`}
                      >
                        Me interesa
                      </a>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>

            {enableFilters && hasActiveFilters && filteredProducts.length === 0 ? (
              <div className="mt-4 rounded-xl border border-[#c9a882]/25 bg-white/[0.03] p-4 text-center text-sm text-white/80 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] backdrop-blur-sm">
                no encontraste lo que necesitabas?{' '}
                <a
                  href={missingModelWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/25 underline-offset-2 transition-colors hover:text-white/95 hover:decoration-white/40"
                  style={{ color: BRAND_CHAMPAGNE }}
                >
                  contactanos
                </a>
              </div>
            ) : null}
          </Container>
          <SiteCreditFooter />
        </main>
        <WhatsAppFloatingButton message="hola, vengo de la pagina web, me podrias ayudar?" />
      </div>
    </div>
  )
}
