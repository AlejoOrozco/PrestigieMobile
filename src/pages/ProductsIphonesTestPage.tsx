import iphoneHero from '../assets/mock/Iphones4k.webp'
import iphone12Img from '../assets/mock/products/Iphones/12/12_1.png'
import iphone14Img from '../assets/mock/products/Iphones/14/14_1.png'
import iphone14ProImg from '../assets/mock/products/Iphones/14 pro/14pro_1.png'
import iphone14PlusImg from '../assets/mock/products/Iphones/14 plus/14plus_1.png'
import iphone15ProImg from '../assets/mock/products/Iphones/15 pro/15pro_1.png'

import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsIphonesTestPageProps = {
  onInicio: () => void
  onRecursos: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

const IPHONE_PRODUCTS: CatalogProduct[] = [
  {
    id: 'iphone-12-128',
    name: 'iPhone 12 128GB',
    category: 'iPhone',
    priceCop: 860_000,
    batteryPercent: 100,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphone12Img],
  },
  {
    id: 'iphone-14-128',
    name: 'iPhone 14 128GB',
    category: 'iPhone',
    priceCop: 1_100_000,
    batteryPercent: 86,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphone14Img],
  },
  {
    id: 'iphone-14-pro-256',
    name: 'iPhone 14 Pro 256GB',
    category: 'iPhone',
    priceCop: 1_750_000,
    batteryPercent: 88,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['256 GB'],
    imageUrls: [iphone14ProImg],
  },
  {
    id: 'iphone-14-pro-max-128',
    name: 'iPhone 14 Pro Max 128GB',
    category: 'iPhone',
    priceCop: 2_200_000,
    batteryPercent: 86,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14-plus-128',
    name: 'iPhone 14 Plus 128GB',
    category: 'iPhone',
    priceCop: 1_580_000,
    batteryPercent: 100,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphone14PlusImg],
  },
  {
    id: 'iphone-15-pro-128',
    name: 'iPhone 15 Pro 128GB',
    category: 'iPhone',
    priceCop: 2_100_000,
    batteryPercent: 86,
    detail: 'Usado y certificado, revisión de batería y garantía.',
    specs: ['128 GB'],
    imageUrls: [iphone15ProImg],
  },
]

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
    />
  )
}
