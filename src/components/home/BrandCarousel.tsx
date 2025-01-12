import { useRef, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const brands = [
  { name: "Nipponia", logo: "brands/nipponia.png", whiteLogo: "brands/nipponia-white.png" },
  { name: "PGO", logo: "brands/pgo.png", whiteLogo: "brands/pgo-white.png" },
  { name: "Super Tucan", logo: "brands/supertucan.png", whiteLogo: "brands/supertucan-white.png" },
  { name: "Loncin", logo: "brands/loncin.png", whiteLogo: "brands/loncin-white.png" },
  { name: "Hero", logo: "brands/hero.png", whiteLogo: "brands/hero-white.png" },
  { name: "Super Gato", logo: "brands/supergato.png", whiteLogo: "brands/supergato-white.png" },
  { name: "TVS", logo: "brands/tvs.png", whiteLogo: "brands/tvs-white.png" },
]

export function BrandCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const carousel = carouselRef.current
        const items = carousel.querySelectorAll('.embla__slide')
        const centerIndex = Math.floor(items.length / 2)

        items.forEach((item, index) => {
          const distance = Math.abs(index - centerIndex)
          const scale = 1 - (distance * 0.15)
          ;(item as HTMLElement).style.transform = `scale(${scale})`
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Carousel
      ref={carouselRef}
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-md sm:max-w-2xl pt-10 md:max-w-4xl lg:max-w-6xl mx-auto mb-10"
    >
      <CarouselContent className="-ml-1">
        {brands.map((brand, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/3 md:basis-1/5 lg:basis-1/5">
            <div className="p-1">
              <img
                src={theme === 'dark' ? brand.whiteLogo : brand.logo}
                alt={`${brand.name} logo`}
                className={cn(
                  "w-full h-16 object-contain transition-transform duration-300 ease-in-out",
                  "hover:scale-110"
                )}
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

