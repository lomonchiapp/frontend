import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

interface ImageCarouselProps {
  images: string[] | undefined
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`Vehicle image ${index + 1}`}
                //full width image
                className="w-full h-full object-cover sm:object-cover sm:w-full"
              />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

