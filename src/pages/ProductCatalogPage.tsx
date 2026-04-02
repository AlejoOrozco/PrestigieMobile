import { useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Container } from '../components/layout/Container'
import { Header } from '../components/layout/Header'
import { SiteCreditFooter } from '../components/layout/SiteCreditFooter'
import LightRays from '../components/ui/LightRays'
import { BRAND_CHAMPAGNE } from '../constants/brandColors'

export type CatalogProduct = {
  id: string
  name: string
  category: string
  priceCop: number
  detail: string
  specs: string[]
  imageUrls: string[]
  batteryPercent?: number
  priceShowDesde?: boolean
}

export type ProductCatalogPageProps = {
  onInicio: () => void
  onOpenProductsAirPods: () => void
  onOpenProductsiPhones: () => void
  products: CatalogProduct[]
  heading: string
}

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function whatsappPhoneDigits(): string | undefined {
  const raw = import.meta.env.WHATSAPP_PHONE_E164
  const digits = raw?.replace(/\D/g, '')
  return digits && digits.length > 0 ? digits : undefined
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

const IMAGE_ROTATE_MS = 3800

const CARD_MIN_PX = '220px'

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
    <div className="relative aspect-[4/3] w-full max-h-[min(28vh,140px)] overflow-hidden rounded-lg bg-white/[0.06] sm:max-h-[120px]">
      {urls.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <span className="sr-only">
        {name}: imagen {idx + 1} de {urls.length}
      </span>
    </div>
  )
}

export function ProductCatalogPage({
  onInicio,
  onOpenProductsAirPods,
  onOpenProductsiPhones,
  products,
  heading,
}: ProductCatalogPageProps) {
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
          className="sticky top-0 shrink-0"
          onInicio={onInicio}
          onOpenProductsAirPods={onOpenProductsAirPods}
          onOpenProductsiPhones={onOpenProductsiPhones}
        />

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pt-4 sm:px-6 sm:pt-5">
          <Container className="pb-6">
            <h1 className="shrink-0 text-lg font-semibold tracking-tight text-white sm:text-xl">
              {heading}
            </h1>

            <motion.ul
              className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-4"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_MIN_PX}, 1fr))`,
              }}
              variants={cardListVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((p) => (
                <motion.li
                  key={p.id}
                  className="min-w-0 [will-change:transform,opacity,filter]"
                  variants={cardItemVariants}
                >
                  <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#c9a882]/25 bg-white/[0.03] p-3 shadow-[0_16px_48px_-32px_rgba(201,168,130,0.35)] transition-colors hover:border-[#c9a882]/45 sm:p-3">
                    <div className="shrink-0">
                      <ProductCardImages name={p.name} urls={p.imageUrls} />
                    </div>

                    <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden">
                      <div className="mb-1.5 flex flex-wrap items-start justify-between gap-1.5">
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide"
                          style={{
                            color: BRAND_CHAMPAGNE,
                            backgroundColor: 'rgba(201, 168, 130, 0.12)',
                          }}
                        >
                          {p.category}
                        </span>
                        <span className="text-right text-[11px] font-semibold tabular-nums text-white sm:text-xs">
                          {p.priceShowDesde
                            ? `Desde ${formatCOP(p.priceCop)}`
                            : formatCOP(p.priceCop)}
                        </span>
                      </div>
                      <h2 className="text-xs font-semibold leading-snug text-white sm:text-sm">
                        {p.name}
                      </h2>
                      <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-white/75 sm:text-xs">
                        {p.detail}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {p.batteryPercent != null ? (
                          <li className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-[9px] text-white/85 sm:text-[10px]">
                            🔋{p.batteryPercent}%
                          </li>
                        ) : null}
                        {p.specs.map((s) => (
                          <li
                            key={s}
                            className="rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-[9px] text-white/85 sm:text-[10px]"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={whatsappUrlForProduct(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block w-full rounded-lg border border-[#c9a882]/40 py-1.5 text-center text-[11px] font-medium transition-colors hover:bg-[#c9a882]/10 sm:text-xs"
                        style={{ color: BRAND_CHAMPAGNE }}
                        aria-label={`Contactar por WhatsApp sobre ${p.name}`}
                      >
                        Me gustan estos
                      </a>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </Container>
        </main>
        <SiteCreditFooter />
      </div>
    </div>
  )
}
