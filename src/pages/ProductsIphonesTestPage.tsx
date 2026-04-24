import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsIphonesTestPageProps = {
  onInicio: () => void
  onRecursos: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

const RANDOM_STORAGE = ['128 GB', '256 GB', '512 GB', '1 TB'] as const

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

const iphoneImageModules = import.meta.glob(
  '../assets/mock/products/Iphones/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
) as Record<string, { default: string }>

function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

function parseColorFromFilename(
  filenameWithoutExt: string,
  series: string,
  modelFolder: string
): string {
  const normalized = filenameWithoutExt
    .trim()
    .toLowerCase()
    .replace(/^ihpone\s+/, 'iphone ')
    .replace(/^iphone\s+/, '')
    .replace(new RegExp(`^${series}\\s+`), '')
    .replace(new RegExp(`^${modelFolder.toLowerCase().replace(/\s+/g, '\\s+')}\\s+`), '')
    .trim()

  if (!normalized) return 'Color no especificado'
  return toTitleCase(normalized)
}

function hashValue(value: string): number {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

const productsByModel = new Map<
  string,
  {
    modelLabel: string
    modelSlug: string
    color: string
    imageUrls: string[]
    sourceName: string
  }
>()

Object.entries(iphoneImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .forEach(([modulePath, module]) => {
    const match = modulePath.match(
      /Iphones\/(?<series>\d+)\/(?<modelFolder>[^/]+)\/(?<filename>[^/]+)\.(?<ext>jpg|jpeg|png|webp)$/i
    )

    if (!match?.groups) return

    const { series, modelFolder, filename } = match.groups
    const modelName = toTitleCase(modelFolder.replace(/-/g, ' '))
    const modelLabel = `iPhone ${series} ${modelName}`
    const modelSlug = modelName.toLowerCase().replace(/\s+/g, '-')
    const productId = `iphone-${series}-${modelSlug}`
    const color = parseColorFromFilename(filename, series, modelFolder)

    const existing = productsByModel.get(productId)
    if (existing) {
      existing.imageUrls.push(module.default)
      return
    }

    productsByModel.set(productId, {
      modelLabel,
      modelSlug,
      color,
      imageUrls: [module.default],
      sourceName: filename,
    })
  })

const IPHONE_PRODUCTS: CatalogProduct[] = Array.from(productsByModel.entries()).map(
  ([id, product]) => {
    const seed = hashValue(id)
    const storage = RANDOM_STORAGE[seed % RANDOM_STORAGE.length]
    const batteryPercent = 80 + (seed % 21)

    return {
      id,
      name: product.modelLabel,
      category: 'iPhone',
      priceCop: null,
      batteryPercent,
      detail: `${toTitleCase(product.sourceName)}. Equipo con pruebas completas y excelente rendimiento.`,
      specs: [storage, `Color ${product.color}`],
      imageUrls: product.imageUrls,
      model: product.modelLabel,
      color: product.color,
      storage,
    }
  }
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
