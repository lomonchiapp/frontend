import { useEffect, useState } from 'react'
import { useGlobalState } from '@/hooks/context/global/useGlobalState'
import { VehicleCard } from '@/components/VehicleCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Vehicle } from '@/types'
import { useNavigate } from 'react-router-dom'

interface FeaturedVehiclesProps {
  setIsDialogOpen: (open: boolean) => void
  isDialogOpen: boolean
  onClick: (vehicle: Vehicle) => void
}

export function FeaturedVehicles({ setIsDialogOpen, isDialogOpen, onClick }: FeaturedVehiclesProps) {
  const { vehicles, fetchVehicles } = useGlobalState()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
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


  return (
    <div className="pt-9 bg-white rounded-lg shadow-lg mt-10 pb-9">
      <h2 className="text-3xl text-gray-600 text-center mb-8">Vehículos Destacados</h2>
      <div className="grid grid-cols-1 px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            {...vehicle}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            onClick={() => onClick(vehicle)}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" onClick={() => navigate('/catalog')}>
          Ver todos los vehículos
        </Button>
      </div>
    </div>
  )
}

