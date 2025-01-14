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
      <div className="grid px-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-48 rounded-lg mb-2"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
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
    <div className="pt-9 bg-white rounded-lg shadow-lg mt-10 pb-9">
      <div className="flex justify-between items-center px-12 mb-8">
        <h2 className="text-3xl text-gray-600">Vehículos Destacados</h2>
        <div className="flex items-center gap-2">
          <Switch
            id="featured-price-mode"
            checked={showInitialPrice}
            onCheckedChange={setShowInitialPrice}
          />
          <Label htmlFor="featured-price-mode" className="text-sm text-gray-600">
            {showInitialPrice ? "Mostrar precio total" : "Mostrar precio inicial"}
          </Label>
        </div>
      </div>
      <div className="grid grid-cols-1 px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" onClick={() => navigate('/catalogo')}>
          Ver todos los vehículos
        </Button>
      </div>
    </div>
  )
}

