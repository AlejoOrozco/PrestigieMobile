import { useEffect, useState } from 'react'
import { HeroSection } from '../components/features/hero/HeroSection'
import { Header } from '../components/layout/Header'
import { SiteCreditFooter } from '../components/layout/SiteCreditFooter'
import {
  ScrollVideoSection,
  type ScrollVideoPhase,
} from '../components/ScrollVideoSection'
import { BRAND_CHAMPAGNE } from '../constants/brandColors'
import {
  SCROLL_VIDEO_COPY_AIRPODS,
  SCROLL_VIDEO_COPY_IPHONE,
} from '../constants/scrollVideoCopy'
import LightRays from '../components/ui/LightRays'
import { WhatsAppFloatingButton } from '../components/ui/WhatsAppFloatingButton'

import videoAirpods1 from '../video/secuences/Secuence1.mp4'
import videoAirpods2 from '../video/secuences/Secuence2.mp4'
import videoIphone1 from '../video/secuences/Iphone/Seecuence1iphone.mp4'
import videoIphone2 from '../video/secuences/Iphone/Secuence2iphone.mp4'

const AIRPODS_SCROLL_ID = 'airpods-scroll-experience'
const IPHONE_SCROLL_ID = 'iphone-scroll-experience'

type LandingPageProps = {
  onViewProducts?: () => void
  onViewIphoneProducts?: () => void
  onOpenProducts?: (category: 'airpods' | 'iphones') => void
}

export function LandingPage({
  onViewProducts,
  onViewIphoneProducts,
  onOpenProducts,
}: LandingPageProps) {
  const [airpodsScrollActive, setAirpodsScrollActive] = useState(false)
  const [iphoneScrollActive, setIphoneScrollActive] = useState(false)
  const [scrollPhase, setScrollPhase] = useState<ScrollVideoPhase | null>(null)

  useEffect(() => {
    if (!airpodsScrollActive) return
    const timer = setTimeout(() => {
      document
        .getElementById(AIRPODS_SCROLL_ID)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(timer)
  }, [airpodsScrollActive])

  useEffect(() => {
    if (!iphoneScrollActive) return
    const timer = setTimeout(() => {
      document
        .getElementById(IPHONE_SCROLL_ID)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(timer)
  }, [iphoneScrollActive])

  const hideHeaderDuringVideo =
    (airpodsScrollActive || iphoneScrollActive) &&
    (scrollPhase === 'seq1' || scrollPhase === 'seq2')

  const goToIphoneProducts = () => onOpenProducts?.('iphones')

  return (
    <div className="relative flex min-h-[100dvh] min-h-[100svh] flex-col bg-black text-white md:min-h-screen">
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

      <Header
        className={hideHeaderDuringVideo ? 'hidden' : 'sticky top-0'}
        onInicio={() =>
          document
            .getElementById('inicio')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        onOpenProductsAirPods={() => onOpenProducts?.('airpods')}
        onOpenProductsiPhones={() => onOpenProducts?.('iphones')}
        onRecursos={() =>
          document
            .getElementById('recursos')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      />

      <div className="relative z-10 overflow-visible">
        <HeroSection
          onExploreAirPods={() => {
            setIphoneScrollActive(false)
            setAirpodsScrollActive(true)
            setScrollPhase('seq1')
          }}
          onExploreiPhones={() => {
            setAirpodsScrollActive(false)
            setIphoneScrollActive(true)
            setScrollPhase('seq1')
          }}
        />
      </div>

      {airpodsScrollActive ? (
        <ScrollVideoSection
          id={AIRPODS_SCROLL_ID}
          videoSrc1={videoAirpods1}
          videoSrc2={videoAirpods2}
          copy={SCROLL_VIDEO_COPY_AIRPODS}
          onViewProducts={onViewProducts}
          onGoToProducts={goToIphoneProducts}
          onPhaseChange={setScrollPhase}
        />
      ) : null}

      {iphoneScrollActive ? (
        <ScrollVideoSection
          id={IPHONE_SCROLL_ID}
          videoSrc1={videoIphone1}
          videoSrc2={videoIphone2}
          copy={SCROLL_VIDEO_COPY_IPHONE}
          onViewProducts={onViewIphoneProducts}
          onGoToProducts={goToIphoneProducts}
          onPhaseChange={setScrollPhase}
        />
      ) : null}

      <section
        id="recursos"
        tabIndex={-1}
        className="scroll-mt-20 shrink-0 outline-none max-md:h-0 max-md:overflow-hidden max-md:p-0"
      >
        <SiteCreditFooter
          withRecursosAnchor={false}
          className="hidden md:block"
        />
      </section>
      <WhatsAppFloatingButton message="hola, vengo de la pagina web, me podrias ayudar?" />
    </div>
  )
}
