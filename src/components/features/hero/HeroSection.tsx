import { motion } from 'motion/react'
import { Container } from '../../layout/Container'
import { Section } from '../../layout/Section'
import BlurText from '../../ui/BlurText'
import ShinyText from '../../ui/ShinyText'
import { CategoryCard } from './CategoryCard'

import { BRAND_CHAMPAGNE, BRAND_CHAMPAGNE_SHINE } from '../../../constants/brandColors'
import iphoneImg from '../../../assets/mock/Iphones4k.webp'
import airpodsImg from '../../../assets/mock/Airpods4k.webp'
import logoSrc from '../../../assets/mock/pretigiemobilelogo.webp'

type HeroSectionProps = {
  onExploreAirPods?: () => void
  onExploreiPhones?: () => void
}

export function HeroSection({
  onExploreAirPods,
  onExploreiPhones,
}: HeroSectionProps) {
  return (
    <Section
      id="inicio"
      className="relative z-10 flex w-full flex-col bg-transparent py-3 max-md:min-h-[calc(100svh-4.5rem)] max-md:overflow-visible md:min-h-[calc(100vh-4.5rem)] md:py-0"
    >
      <Container className="relative flex w-full max-w-6xl flex-col pt-2 pb-4 max-md:min-h-0 max-md:flex-1 max-md:overflow-visible max-md:px-3 md:min-h-full md:flex-1 md:pt-6 md:pb-6 md:px-4 lg:pt-8 lg:pb-8">
        <div className="flex w-full flex-col items-center gap-3 py-1 max-md:min-h-0 max-md:flex-1 max-md:justify-center max-md:gap-3 md:min-h-0 md:flex-1 md:justify-center md:gap-5 md:py-2">
          <div className="w-full max-w-6xl shrink-0 text-center">
            <img
              src={logoSrc}
              alt="Pretigie Mobile"
              className="mx-auto mb-1 h-12 w-auto max-w-[58vw] object-contain sm:mb-4 sm:h-24 sm:max-w-[520px] md:h-28 lg:h-32"
              loading="eager"
              decoding="async"
            />
            <h1 className="min-w-0">
              <motion.div
                className="flex w-full min-w-0 flex-nowrap items-baseline justify-center gap-x-1 whitespace-nowrap sm:gap-x-2 md:gap-x-2.5"
                initial={{ opacity: 0, filter: 'blur(14px)', y: -10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="shrink-0">
                  <ShinyText
                    text="Calidad Premium"
                    speed={3}
                    delay={1}
                    color={BRAND_CHAMPAGNE}
                    shineColor={BRAND_CHAMPAGNE_SHINE}
                    spread={150}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="text-base font-medium leading-none tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                  />
                </span>
                <span
                  className="font-luxury-script shrink-0 px-0.5 leading-none text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  style={{ color: BRAND_CHAMPAGNE }}
                >
                  Sin
                </span>
                <span className="shrink-0">
                  <ShinyText
                    text="Costo Premium"
                    speed={3}
                    delay={1}
                    color={BRAND_CHAMPAGNE}
                    shineColor={BRAND_CHAMPAGNE_SHINE}
                    spread={150}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="text-base font-medium leading-none tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                  />
                </span>
              </motion.div>
            </h1>
            <BlurText
              text="iPhones usados y certificados. AirPods de alta calidad."
              delay={130}
              animateBy="words"
              direction="top"
              className="mx-auto mt-0.5 w-full max-w-2xl justify-center text-center text-[11px] leading-snug sm:mt-3 sm:text-base"
              style={{ color: BRAND_CHAMPAGNE }}
            />
          </div>

          <div className="mt-8 grid w-full max-w-5xl shrink-0 grid-cols-1 justify-items-center gap-3 px-0 sm:mt-10 sm:gap-4 md:mt-14 md:grid-cols-2 md:gap-4">
            <CategoryCard
              label="Explora iPhones"
              imageSrc={iphoneImg}
              imageAlt="Categoría iPhone"
              onActivate={onExploreiPhones}
            />
            <CategoryCard
              label="Explora AirPods"
              imageSrc={airpodsImg}
              imageAlt="Categoría AirPods"
              onActivate={onExploreAirPods}
            />
          </div>

          <BlurText
            text="Dispositivos certificados. Calidad aprobada. Mejor precio."
            delay={110}
            animateBy="words"
            direction="top"
            className="shrink-0 justify-center px-1 text-center text-[10px] leading-tight sm:px-2 sm:text-xs sm:text-sm"
            style={{ color: BRAND_CHAMPAGNE }}
          />
        </div>
      </Container>
    </Section>
  )
}
