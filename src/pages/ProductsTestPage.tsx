import { useEffect, useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Container } from '../components/layout/Container'
import { BRAND_CHAMPAGNE } from '../constants/brandColors'

import max_1 from '../assets/mock/products/Max/max_1.webp'
import max_2 from '../assets/mock/products/Max/max_2.webp'

import pro3Main from '../assets/mock/products/Pro 3/Pro3_main.webp'
import pro3_1 from '../assets/mock/products/Pro 3/pro3_1.webp'
import pro3_sizes from '../assets/mock/products/Pro 3/pro3_sizes.webp'

import serie3_1 from '../assets/mock/products/Serie 3/serie3_1.webp'
import serie3_2 from '../assets/mock/products/Serie 3/serie3_2.webp'
import serie3_main from '../assets/mock/products/Serie 3/serie3_main.webp'

type ProductsTestPageProps = {
  onBack: () => void
}

type Product = {
  id: string
  name: string
  category: string
  priceCop: number
  detail: string
  specs: string[]
  imageUrls: string[]
}

function formatCOP(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

function whatsappUrlForProduct(deviceName: string) {
  const phone = import.meta.env.WHATSAPP_PHONE_E164
  const text = `Hola, me interesan los ${deviceName}, ¿me podrías dar más información por favor?`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

const PRODUCTS: Product[] = [
  {
    id: 'serie-3',
    name: 'AirPods (3.ª gen)',
    category: 'AirPods',
    priceCop: 55_000,
    detail:
      'Audio espacial, resistencia al agua y ajuste cómodo. Certificados y revisados.',
    specs: ['Bluetooth 5.0', 'Estuche Lightning', 'Hasta 30 h con estuche'],
    imageUrls: [serie3_main, serie3_1, serie3_2],
  },
  {
    id: 'pro-3',
    name: 'AirPods Pro 3',
    category: 'AirPods',
    priceCop: 80_000,
    detail:
      'Cancelación activa de ruido, audio espacial y estuche MagSafe. Listos para el día a día.',
    specs: ['USB-C', 'ANC', 'Audio espacial'],
    imageUrls: [pro3Main, pro3_1, pro3_sizes],
  },
  {
    id: 'max',
    name: 'AirPods Max',
    category: 'AirPods',
    priceCop: 90_000,
    detail:
      'Sonido envolvente, ANC de diadema y modo transparencia. Experiencia premium.',
    specs: ['Chip Apple', 'Spatial Audio', 'Smart Case'],
    imageUrls: [max_1, max_2],
  },
]

const IMAGE_ROTATE_MS = 3800

/** Ancho mínimo de tarjeta en px; entran tantas columnas como quepan. */
const CARD_MIN_PX = '220px'

/** Misma lógica que `BlurText` (direction top): blur 10→5→0, y -50→5→0, opacidad 0→0.5→1. */
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

/** Misma curva en dos pasos que `BlurText` (opacidad, blur y movimiento desde arriba). */
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
          key={src}
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

export function ProductsTestPage({ onBack }: ProductsTestPageProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black text-white">
      <header className="shrink-0 border-b border-white/[0.08] bg-black/40 backdrop-blur-xl">
        <Container className="flex h-14 items-center justify-between sm:h-16">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: BRAND_CHAMPAGNE }}
          >
            ← Volver
          </button>
          <span
            className="text-sm font-medium tracking-wide sm:text-base"
            style={{ color: BRAND_CHAMPAGNE }}
          >
            Pretigie Mobile
          </span>
          <span className="w-16 sm:w-20" aria-hidden />
        </Container>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pt-4 sm:px-6 sm:pt-5">
        <Container className="pb-6">
          <h1 className="shrink-0 text-lg font-semibold tracking-tight text-white sm:text-xl">
            Productos
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
            {PRODUCTS.map((p) => (
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
                        Desde {formatCOP(p.priceCop)}
                      </span>
                    </div>
                    <h2 className="text-xs font-semibold leading-snug text-white sm:text-sm">
                      {p.name}
                    </h2>
                    <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-white/75 sm:text-xs">
                      {p.detail}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
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
                      href={whatsappUrlForProduct(p.name)}
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
    </div>
  )
}
