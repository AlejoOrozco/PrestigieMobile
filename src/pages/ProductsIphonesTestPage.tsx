import iphoneHero from '../assets/mock/Iphones4k.webp'

import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsIphonesTestPageProps = {
  onInicio: () => void
  onRecursos: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

const IPHONE_SERIES_MODELS = [
  { series: '13', models: ['Mini', '13', 'Pro', 'Pro Max'] },
  { series: '14', models: ['Plus', 'Pro', 'Pro Max'] },
  { series: '15', models: ['Plus', 'Pro', 'Pro Max'] },
  { series: '16', models: ['Plus', 'Pro', 'Pro Max', 'E'] },
  { series: '17', models: ['Air', 'Pro', 'Pro Max'] },
] as const

const RANDOM_COLORS = [
  'Negro',
  'Blanco',
  'Azul',
  'Titanio Natural',
  'Rosa',
  'Verde',
] as const

const RANDOM_STORAGE = ['128 GB', '256 GB', '512 GB', '1 TB'] as const

const RANDOM_DETAILS = [
  'Equipo reacondicionado con pruebas completas y excelente rendimiento.',
  'Estado estético muy bueno, libre para operador y listo para usar.',
  'Revisión técnica al día, ideal para uso diario y trabajo.',
  'Funcionalidad completa, cámara y Face ID verificados.',
] as const

const MOST_WANTED_IDS = [
  'iphone-17-air',
  'iphone-17-pro',
  'iphone-17-pro-max',
  'iphone-16-pro',
  'iphone-16-pro-max',
  'iphone-15-pro',
  'iphone-15-pro-max',
  'iphone-14-pro-max',
]

const IPHONE_PRODUCTS: CatalogProduct[] = IPHONE_SERIES_MODELS.flatMap(
  ({ series, models }, seriesIndex) =>
    models.map((model, modelIndex) => {
      const index = seriesIndex * 10 + modelIndex
      const color = RANDOM_COLORS[index % RANDOM_COLORS.length]
      const storage = RANDOM_STORAGE[(index * 2) % RANDOM_STORAGE.length]
      const detail = RANDOM_DETAILS[(index * 3) % RANDOM_DETAILS.length]
      const batteryPercent = 80 + ((index * 7) % 21)
      const slug = model.toLowerCase().replace(/\s+/g, '-')
      const modelLabel = `iPhone ${series} ${model}`

      return {
        id: `iphone-${series}-${slug}`,
        name: modelLabel,
        category: 'iPhone',
        priceCop: null,
        batteryPercent,
        detail,
        specs: [storage, `Color ${color}`],
        imageUrls: [iphoneHero],
        model: modelLabel,
        color,
        storage,
      }
    })
)

export function ProductsIphonesTestPage({
  onInicio,
  onRecursos,
  onOpenProducts,
}: ProductsIphonesTestPageProps) {
  return (
    <ProductCatalogPage
      onInicio={onInicio}
      onRecursos={onRecursos}
      onOpenProductsAirPods={() => onOpenProducts('airpods')}
      onOpenProductsiPhones={() => onOpenProducts('iphones')}
      products={IPHONE_PRODUCTS}
      heading="iPhones"
      enableFilters
      defaultViewLabel="Los mas deseados"
      mostWantedProductIds={MOST_WANTED_IDS}
      infoHoverMessage="Los modelos cambian constantemente, si necesitas uno en especifico contactanos por WhatsApp con el icono al costado derecho de la pagina."
    />
  )
}
