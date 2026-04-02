import iphoneHero from '../assets/mock/Iphones4k.webp'

import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsIphonesTestPageProps = {
  onBack: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

const IPHONE_PRODUCTS: CatalogProduct[] = [
  {
    id: 'iphone-12-128',
    name: 'iPhone 12 128GB',
    category: 'iPhone',
    priceCop: 860_000,
    batteryPercent: 100,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14-128',
    name: 'iPhone 14 128GB',
    category: 'iPhone',
    priceCop: 1_100_000,
    batteryPercent: 86,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14-pro-256',
    name: 'iPhone 14 Pro 256GB',
    category: 'iPhone',
    priceCop: 1_750_000,
    batteryPercent: 88,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['256 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14-pro-max-128',
    name: 'iPhone 14 Pro Max 128GB',
    category: 'iPhone',
    priceCop: 2_200_000,
    batteryPercent: 86,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14-plus-128',
    name: 'iPhone 14 Plus 128GB',
    category: 'iPhone',
    priceCop: 1_580_000,
    batteryPercent: 100,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-15-pro-128',
    name: 'iPhone 15 Pro 128GB',
    category: 'iPhone',
    priceCop: 2_100_000,
    batteryPercent: 86,
    detail: 'Reacondicionado certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
]

export function ProductsIphonesTestPage({
  onBack,
  onOpenProducts,
}: ProductsIphonesTestPageProps) {
  return (
    <ProductCatalogPage
      onBack={onBack}
      onOpenProductsAirPods={() => onOpenProducts('airpods')}
      onOpenProductsiPhones={() => onOpenProducts('iphones')}
      products={IPHONE_PRODUCTS}
      heading="iPhones"
    />
  )
}
