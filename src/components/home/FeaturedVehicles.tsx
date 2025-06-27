import { useEffect, useState } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { VehicleCard } from '@/components/VehicleCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Vehicle } from '@/types'
import { useNavigate } from 'react-router-dom'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DollarSign, Tag, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeaturedVehiclesProps {
  setIsDialogOpen: (open: boolean) => void
  isDialogOpen: boolean
  onClick: (vehicle: Vehicle) => void
}

export function FeaturedVehicles({ setIsDialogOpen, isDialogOpen, onClick }: FeaturedVehiclesProps) {
  const { vehicles, fetchVehicles } = useGlobalState()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInitialPrice, setShowInitialPrice] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        if (vehicles.length === 0) {
          await fetchVehicles()
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err)
        setError('Failed to load vehicles. Please try again later.')
      }
    }

    loadVehicles()
    setLoading(false)
  }, [fetchVehicles, vehicles.length])

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Header skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-64 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const featuredVehicles = vehicles.slice(0, 4)

  const getDisplayPrice = (vehicle: Vehicle) => {
    if (!vehicle) return 0
    if (showInitialPrice) {
      return vehicle.initPrice || Math.round(vehicle.salePrice * 0.3)
    }
    return vehicle.salePrice
  }

  const getSecondaryPrice = (vehicle: Vehicle) => {
    if (!vehicle) return 0
    if (showInitialPrice) {
      return vehicle.salePrice
    }
    return vehicle.initPrice || Math.round(vehicle.salePrice * 0.3)
  }

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Vehículos Destacados
              </h2>
              <p className="text-sm text-gray-600">
                Los modelos más populares y mejor valorados
              </p>
            </div>
            
            {/* Price Toggle */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl shadow-sm border">
              <div className={`flex items-center gap-2 transition-colors duration-200 ${
                !showInitialPrice ? "text-red-600 font-medium" : "text-gray-500"
              }`}>
                <DollarSign className={`h-4 w-4 ${!showInitialPrice ? "text-red-600" : "text-gray-400"}`} />
                <Label 
                  htmlFor="featured-price-mode" 
                  className="cursor-pointer text-sm whitespace-nowrap select-none"
                >
                  Precio total
                </Label>
              </div>
              
              <Switch
                id="featured-price-mode"
                checked={showInitialPrice}
                onCheckedChange={setShowInitialPrice}
                className="data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-300"
              />
              
              <div className={`flex items-center gap-2 transition-colors duration-200 ${
                showInitialPrice ? "text-red-600 font-medium" : "text-gray-500"
              }`}>
                <Tag className={`h-4 w-4 ${showInitialPrice ? "text-red-600" : "text-gray-400"}`} />
                <Label 
                  htmlFor="featured-price-mode" 
                  className="cursor-pointer text-sm whitespace-nowrap select-none"
                >
                  Precio inicial
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VehicleCard
                  {...vehicle}
                  displayPrice={getDisplayPrice(vehicle)}
                  secondaryPrice={getSecondaryPrice(vehicle)}
                  showInitialPrice={showInitialPrice}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  onClick={() => onClick(vehicle)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50/50">
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/catalogo')}
              className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700 font-medium
                px-6 py-3 rounded-xl shadow-sm transition-all duration-200
                hover:shadow-md hover:scale-[1.02] group"
            >
              <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Ver todos los vehículos
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

