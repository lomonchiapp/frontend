
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface BrandSlideshowProps {
  setSearchText: (text: string) => void
}

const brands = [
  { name: "Honda", logo: "/brands/honda.png" },
  { name: "Yamaha", logo: "/brands/yamaha.png" },
  { name: "TVS", logo: "/brands/tvs.png" },
  { name: "Hero", logo: "/brands/hero.png" },
  { name: "Suzuki", logo: "/brands/suzuki.png" },
  { name: "PGO", logo: "/brands/pgo.png" },
  { name: "Super Tucan", logo: "/brands/supertucan.png" },
  { name: "Loncin", logo: "/brands/loncin.png" },
]

export function BrandSlideshow({ setSearchText }: BrandSlideshowProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {brands.map((brand) => (
          <Button
            key={brand.name}
            variant="ghost"
            className="w-[150px] h-[150px] flex flex-col items-center justify-center p-2"
            onClick={() => setSearchText(brand.name.toLowerCase())}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-contain mb-2"
            />
            <span className="text-sm font-medium">{brand.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

