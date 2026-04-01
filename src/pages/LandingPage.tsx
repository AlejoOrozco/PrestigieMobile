import { useEffect, useState } from 'react'
import { HeroSection } from '../components/features/hero/HeroSection'
import { Header } from '../components/layout/Header'
import { ScrollVideoSection } from '../components/ScrollVideoSection'
import { BRAND_CHAMPAGNE } from '../constants/brandColors'
import LightRays from '../components/ui/LightRays'

const AIRPODS_SCROLL_ID = 'airpods-scroll-experience'

type LandingPageProps = {
  onViewProducts?: () => void
}

export function LandingPage({ onViewProducts }: LandingPageProps) {
  const [airpodsScrollActive, setAirpodsScrollActive] = useState(false)

  useEffect(() => {
    if (!airpodsScrollActive) return
    const timer = setTimeout(() => {
      document
        .getElementById(AIRPODS_SCROLL_ID)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(timer)
  }, [airpodsScrollActive])

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Light rays – sits behind everything but is a direct child so the
          header's backdrop-filter can see through to it */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
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

      <Header className="sticky top-0 z-40" />

      <div className="relative z-10">
        <HeroSection
          onExploreAirPods={() => setAirpodsScrollActive(true)}
        />
      </div>

      {airpodsScrollActive && (
        <ScrollVideoSection
          id={AIRPODS_SCROLL_ID}
          onViewProducts={onViewProducts}
        />
      )}
    </div>
  )
}

