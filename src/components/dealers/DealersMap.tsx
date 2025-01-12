import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'
import '@/styles/map.css'
import { dealers } from './locations'
import { Dealer } from '@/types'
import L from 'leaflet'
declare module 'leaflet' {
  namespace Routing {
    function control(options: any): any;
  }
}



const dealerIcon = L.icon({
  iconUrl: '/location/dealerPin.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

const userIcon = L.icon({
  iconUrl: '/location/mePin.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

function CenterMap({ position }: { position: number[] }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView(position as L.LatLngExpression, 14)
    }
  }, [position, map])
  return null
}

function RoutingMachine({ userPosition, destination }: { userPosition: number[], destination: number[] }) {
  const map = useMap()
  const routingControlRef = useRef(null)

  useEffect(() => {
    if (userPosition && destination) {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current)
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(destination[0], destination[1])
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: '#6366F1', weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
      }).addTo(map)
    }

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current)
      }
    }
  }, [map, userPosition, destination])

  return null
}

export function DealersMap({ selectedDealer, setSelectedDealer }: { selectedDealer: Dealer | null, setSelectedDealer: (dealer: Dealer | null) => void }) {
  const [userPosition, setUserPosition] = useState<number[] | null>(null)
  const [destination, setDestination] = useState<number[] | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error getting user's location:", error)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (selectedDealer) {
      setDestination([selectedDealer.lat, selectedDealer.lng])
    }
  }, [selectedDealer])

  return (
    <div className="relative h-[500px] w-full">
      <MapContainer 
        center={[18.4566342, -69.296238]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dealers.map((dealer) => (
          <Marker 
            key={dealer.id} 
            position={[dealer.lat, dealer.lng]} 
            icon={dealerIcon}
            eventHandlers={{
              click: () => setSelectedDealer(dealer),
            }}
          >
            <Popup>{dealer.name}</Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition as L.LatLngExpression} icon={userIcon}>
            <Popup>Estás aquís</Popup>
          </Marker>
        )}
        {selectedDealer && <CenterMap position={[selectedDealer.lat, selectedDealer.lng]} />}
        {userPosition && destination && (
          <RoutingMachine userPosition={userPosition} destination={destination} />
        )}
      </MapContainer>
    </div>
  )
}

