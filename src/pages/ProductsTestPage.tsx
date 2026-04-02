import max_1 from '../assets/mock/products/Max/max_1.webp'
import max_2 from '../assets/mock/products/Max/max_2.webp'

import pro3Main from '../assets/mock/products/Pro 3/Pro3_main.webp'
import pro3_1 from '../assets/mock/products/Pro 3/pro3_1.webp'
import pro3_sizes from '../assets/mock/products/Pro 3/pro3_sizes.webp'

import serie3_1 from '../assets/mock/products/Serie 3/serie3_1.webp'
import serie3_2 from '../assets/mock/products/Serie 3/serie3_2.webp'
import serie3_main from '../assets/mock/products/Serie 3/serie3_main.webp'

import {
  ProductCatalogPage,
  type CatalogProduct,
} from './ProductCatalogPage'

type ProductsTestPageProps = {
  onBack: () => void
  onOpenProducts: (category: 'airpods' | 'iphones') => void
}

const AIRPODS_PRODUCTS: CatalogProduct[] = [
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

export function ProductsTestPage({ onBack, onOpenProducts }: ProductsTestPageProps) {
  return (
    <ProductCatalogPage
      onBack={onBack}
      onOpenProductsAirPods={() => onOpenProducts('airpods')}
      onOpenProductsiPhones={() => onOpenProducts('iphones')}
      products={AIRPODS_PRODUCTS}
      heading="AirPods"
    />
  )
}
