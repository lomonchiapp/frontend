import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from '@/components/ui/button'
import L from 'leaflet'

// Arreglar el ícono de marcador
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void
  initialLocation?: { lat: number, lng: number }
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>(
    initialLocation ? [initialLocation.lat, initialLocation.lng] : [18.4861, -69.9312]
  )
  const [showMap, setShowMap] = useState(false)

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng])
  }

  const handleConfirm = () => {
    onLocationSelect(position[0], position[1])
    setShowMap(false)
  }

  if (!showMap) {
    return (
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setShowMap(true)}
        className="w-full"
      >
        Establecer Ubicación en el Mapa
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[300px] relative">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
          <MapEvents onLocationSelect={handleLocationSelect} />
        </MapContainer>
      </div>
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setShowMap(false)}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button 
          type="button"
          onClick={handleConfirm}
          className="flex-1"
        >
          Confirmar Ubicación
        </Button>
      </div>
    </div>
  )
} 