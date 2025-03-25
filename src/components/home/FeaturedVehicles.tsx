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
import { DollarSign, Tag } from 'lucide-react'

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
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid px-[5%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2%]">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-[12rem] rounded-lg mb-[2%]"></div>
            <div className="bg-gray-300 h-[1rem] w-[75%] rounded mb-[2%]"></div>
            <div className="bg-gray-300 h-[1rem] w-[50%] rounded"></div>
          </div>
        ))}
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
    <div className="pt-[3%] bg-white rounded-lg shadow-lg mt-[4%] pb-[3%]">
      <div className="flex flex-col md:flex-row justify-between items-center px-[2%] sm:px-[3%] mb-[3%]">
        <h2 className="text-3xl text-gray-600">Vehículos Destacados</h2>
        <div className="flex items-center gap-[2%] bg-gray-50 p-[1%] px-[2%] rounded-full shadow-sm">
          <div className={`flex items-center gap-[1%] ${!showInitialPrice ? "text-red-600 font-medium" : "text-gray-500"}`}>
            <DollarSign className={`h-[1rem] w-[1rem] ${!showInitialPrice ? "text-red-600" : "text-gray-400"}`} />
            <Label htmlFor="featured-price-mode" className="cursor-pointer">
              Precio total
            </Label>
          </div>
          <Switch
            id="featured-price-mode"
            checked={showInitialPrice}
            onCheckedChange={setShowInitialPrice}
            className="data-[state=checked]:bg-red-600"
          />
          <div className={`flex items-center gap-2 ${showInitialPrice ? "text-red-600 font-medium" : "text-gray-500"}`}>
            <Tag className={`h-4 w-4 ${showInitialPrice ? "text-red-600" : "text-gray-400"}`} />
            <Label htmlFor="featured-price-mode" className="cursor-pointer">
              Precio inicial
            </Label>
          </div>
          <div className={`flex items-center gap-[1%] ${showInitialPrice ? "text-red-600 font-medium" : "text-gray-500"}`}>
            <Tag className={`h-[1rem] w-[1rem] ${showInitialPrice ? "text-red-600" : "text-gray-400"}`} />
            <Label htmlFor="featured-price-mode" className="cursor-pointer">
              Precio inicial
            </Label>
          </div>
        </div>
      </div>
      <div className="grid px-[5%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2%]">
        {featuredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            {...vehicle}
            displayPrice={getDisplayPrice(vehicle)}
            secondaryPrice={getSecondaryPrice(vehicle)}
            showInitialPrice={showInitialPrice}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            onClick={() => onClick(vehicle)}
          />
        ))}
      </div>
      <div className="mt-[3%] text-center">
        <Button variant="outline" size="lg" onClick={() => navigate('/catalogo')}>
          Ver todos los vehículos
        </Button>
      </div>
    </div>
  )
}

