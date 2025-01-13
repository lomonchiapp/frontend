import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vehicle } from "@/types"
import { motion } from "framer-motion"
import { Eye } from 'lucide-react'
import { PlaceholderImage } from './PlaceholderImage'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { VehicleView } from '@/components/VehicleView'; // Import VehicleView component

interface VehicleCardProps extends Vehicle {
  onClick: () => void
  isDialogOpen: boolean;
  compact?: boolean;
  setIsDialogOpen: (open: boolean) => void
}

export function VehicleCard({ 
  name, 
  salePrice, 
  category, 
  cc, 
  images,
  brand,
  isDialogOpen,
  setIsDialogOpen,
  onClick,
  compact = false
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

  const handleMouseLeave = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCurrentImageIndex(0);
  };
  
  if (compact) {
    return (
      <div className="flex items-center space-x-4" onClick={onClick}>
        <img
          src={images?.[0]}
          alt={name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{brand?.name}</p>
          <p className="text-sm text-gray-500">{category?.name}</p>
          <p className="font-bold mt-1">${salePrice.toLocaleString()}</p>
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
        onClick={onClick}
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

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl text-green-600 dark:text-green-400">
              {new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(salePrice)}
            </span>
            
          </div>
          <div className="flex justify-center items-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-4 py-2 bg-[#38367D] text-white rounded-lg font-semibold text-sm transition-colors duration-300 hover:bg-[#38367D]"
              onClick={() => setIsDialogOpen(true)} // Added onClick handler
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver detalles
            </motion.button>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  )
}

