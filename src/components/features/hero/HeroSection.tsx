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
      className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] flex-col bg-transparent md:min-h-[calc(100vh-4.5rem)]"
    >
      <Container className="relative flex min-h-full flex-1 flex-col pt-2 pb-2 max-md:px-3 sm:pt-6 sm:pb-4 md:pt-8 md:pb-6">
        <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-1.5 py-1 max-md:justify-evenly sm:gap-4 sm:py-4 md:gap-5">
          <div className="w-full max-w-6xl text-center">
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
              text="iPhones reacondicionados y certificados. AirPods de alta calidad."
              delay={130}
              animateBy="words"
              direction="top"
              className="mx-auto mt-0.5 w-full max-w-2xl justify-center text-center text-[11px] leading-snug sm:mt-3 sm:text-base"
              style={{ color: BRAND_CHAMPAGNE }}
            />
          </div>

          <div className="grid w-full max-w-5xl grid-cols-1 place-content-center gap-1.5 px-0 sm:gap-3 md:grid-cols-2 md:gap-4">
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
            className="justify-center px-1 text-center text-[10px] leading-tight sm:px-2 sm:text-xs sm:text-sm"
            style={{ color: BRAND_CHAMPAGNE }}
          />
        </div>
      </Container>
    </Section>
  )
}
