import iphoneHero from '../assets/mock/Iphones4k.webp'

import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsIphonesTestPageProps = {
  onBack: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

/** Catálogo de prueba: mismas imágenes mock hasta tener carpeta por modelo. */
const IPHONE_PRODUCTS: CatalogProduct[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    priceCop: 1_890_000,
    detail:
      'Titanio, chip A17 Pro y cámara 48 MP. Reacondicionado certificado con garantía.',
    specs: ['256 GB', 'USB-C', 'Dynamic Island'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    category: 'iPhone',
    priceCop: 1_250_000,
    detail:
      'Pantalla Super Retina XDR, gran autonomía y cámara dual. Ideal para el día a día.',
    specs: ['128 GB', '5G', 'Face ID'],
    imageUrls: [iphoneHero],
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    category: 'iPhone',
    priceCop: 980_000,
    detail:
      'Rendimiento sólido, modo cine y resistencia al agua. Excelente relación calidad-precio.',
    specs: ['128 GB', 'Night mode', 'Ceramic Shield'],
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
