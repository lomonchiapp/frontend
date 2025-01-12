import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandCarousel } from '@/components/home/BrandCarousel'
import { SearchInput } from '@/components/home/SearchInput'
import { SearchResult } from '@/components/home/SearchResult'
import { FeaturedVehicles } from '@/components/home/FeaturedVehicles'
import { VehicleDialog } from '@/components/VehicleDialog'
import { VehicleView } from '@/components/VehicleView'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { Vehicle } from "@/types"

export default function Home() {
  const { setSelectedVehicle, selectedVehicle } = useGlobalState()
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setVehicleDialogOpen(true)
  }

  const handleSearchActiveChange = useCallback((isActive: boolean) => {
    setShowSearchResult(isActive)
  }, [])

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">

        <BrandCarousel />
        
        <SearchInput 
          inputRef={inputRef}
          onSearchActiveChange={handleSearchActiveChange}
        />

        <AnimatePresence>
          {showSearchResult ? (
            <motion.div
              key="search-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <SearchResult openDialog={vehicleDialogOpen} onClick={handleVehicleClick} setOpenDialog={setVehicleDialogOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="featured-vehicles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedVehicles onClick={handleVehicleClick} isDialogOpen={vehicleDialogOpen} setIsDialogOpen={setVehicleDialogOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <VehicleDialog
        openDialog={vehicleDialogOpen}
        setOpenDialog={setVehicleDialogOpen}
      >
        {selectedVehicle && <VehicleView />}
      </VehicleDialog>
    </div>
  )
}

