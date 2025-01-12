import { Dealer } from '@/types'
import { dealers } from './locations'
import { Button } from '../ui/button'
import { MapPin, Navigation } from 'lucide-react'

interface DealersListProps {
  setSelectedDealer: (dealer: Dealer | null) => void
}

export function DealersList({ setSelectedDealer }: DealersListProps) {
  const openGoogleMaps = (dealer: Dealer) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dealer.lat},${dealer.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dealers.map((dealer) => (
        <div 
          key={dealer.id} 
          className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:border-primary/20 transition-all"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{dealer.name}</h3>
            
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="h-5 w-5 mt-0.5 text-primary" />
              <p className="text-sm leading-tight">
                {dealer.address}
              </p>
            </div>

            {dealer.phone && (
              <p className="text-sm text-gray-600">
                📞 {dealer.phone}
              </p>
            )}

            {dealer.schedule && (
              <p className="text-sm text-gray-600">
                🕒 {dealer.schedule}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => setSelectedDealer(dealer)}
              >
                <MapPin className="h-4 w-4" />
                Ver en mapa
              </Button>
              
              <Button 
                variant="default"
                className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                onClick={() => openGoogleMaps(dealer)}
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

