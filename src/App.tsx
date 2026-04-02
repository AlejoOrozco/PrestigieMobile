import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { ProductsIphonesTestPage } from './pages/ProductsIphonesTestPage'
import { ProductsTestPage } from './pages/ProductsTestPage'

type AppView = 'landing' | 'products-airpods' | 'products-iphones'

function scrollToRecursosAfterNav() {
  window.setTimeout(() => {
    document.getElementById('recursos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, 150)
}

function App() {
  const [view, setView] = useState<AppView>('landing')

  if (view === 'products-airpods') {
    return (
      <ProductsTestPage
        onInicio={() => setView('landing')}
        onRecursos={() => {
          setView('landing')
          scrollToRecursosAfterNav()
        }}
        onOpenProducts={(category) =>
          setView(category === 'iphones' ? 'products-iphones' : 'products-airpods')
        }
      />
    )
  }

  if (view === 'products-iphones') {
    return (
      <ProductsIphonesTestPage
        onInicio={() => setView('landing')}
        onRecursos={() => {
          setView('landing')
          scrollToRecursosAfterNav()
        }}
        onOpenProducts={(category) =>
          setView(category === 'iphones' ? 'products-iphones' : 'products-airpods')
        }
      />
    )
  }

  return (
    <LandingPage
      onViewProducts={() => setView('products-airpods')}
      onViewIphoneProducts={() => setView('products-iphones')}
      onOpenProducts={(category) =>
        setView(category === 'iphones' ? 'products-iphones' : 'products-airpods')
      }
    />
  )
}

export default App
