import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vehicle } from "@/types"
import { motion } from "framer-motion"
import { PlaceholderImage } from './PlaceholderImage'

interface VehicleCardProps extends Vehicle {
  onClick: () => void
  isDialogOpen: boolean
  compact?: boolean
  setIsDialogOpen: (open: boolean) => void
  displayPrice: number
  secondaryPrice: number
  showInitialPrice: boolean
}

export function VehicleCard({ 
  name, 
  category, 
  cc, 
  images,
  brand,
  setIsDialogOpen,
  onClick,
  compact = false,
  displayPrice,
  secondaryPrice,
  showInitialPrice
}: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleMouseEnter = () => {
    if (images && images.length > 1) {
      const id = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000);
      setIntervalId(id);
    }
  };

  const handleOnClick = () => {
    setIsDialogOpen(true)
    onClick()
  }

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCurrentImageIndex(0);
  };
  
  if (compact) {
    return (
      <div className="flex items-center space-x-4" onClick={handleOnClick}>
        <img
          src={images?.[0]}
          alt={name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{brand?.name}</p>
          <p className="text-sm text-gray-500">{category?.name}</p>
          <p className="font-bold mt-1">${secondaryPrice.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="w-full z-0 max-w-64 mx-auto overflow-hidden shadow-lg 
        transition-all duration-300 hover:shadow-2xl cursor-pointer 
        bg-gradient-to-br from-white to-gray-100 dark:from-gray-800
         dark:to-gray-900"
        onClick={handleOnClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
          {images && images.length > 0 ? (
            <img 
              src={images[currentImageIndex]} 
              alt={`${name} - imagen ${currentImageIndex + 1}`} 
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <PlaceholderImage />
          )}
          <Badge variant="outline" className="text-xs font-medium px-2 absolute top-2 left-2 bg-white py-1">
              {cc} cc
            </Badge>
          <Badge variant="secondary" className="text-xs font-semibold px-2 py-1 absolute top-2 right-2 z-10">
            {category?.name}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-xl text-gray-800 dark:text-gray-100 truncate">{name}</h2>
          </div>

          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-600">
              RD$ {displayPrice?.toLocaleString()}
            </p>

            <div className="mt-2 pt-2 border-t">
              <p className="text-sm text-gray-600">
                {showInitialPrice ? "Precio total" : "Depósito mínimo"}:
                <span className="ml-1 font-medium">
                  RD$ {secondaryPrice?.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  )
}

