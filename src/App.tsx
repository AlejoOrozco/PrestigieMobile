import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { ProductsTestPage } from './pages/ProductsTestPage'

function App() {
  const [view, setView] = useState<'landing' | 'products'>('landing')

  if (view === 'products') {
    return <ProductsTestPage onBack={() => setView('landing')} />
  }

  return <LandingPage onViewProducts={() => setView('products')} />
}

export default App
