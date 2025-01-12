import { Card, CardContent } from "@/components/ui/card"
import { BrandSlideshow } from "./BrandSlideshow"
import { VehicleCard } from "@/components/VehicleCard"
import { shuffle } from "lodash"
import { useGlobalState } from "@/hooks/context/global/useGlobalState"
import { Vehicle } from "@/types/types"

interface EmptyResultProps {
  setOpenDialog: (open: boolean) => void
}

export function EmptyResult({ setOpenDialog }: EmptyResultProps) {
  const { vehicles, setSelectedVehicle, loading, setSearchText } = useGlobalState()

  const randomFourVehicles = shuffle(vehicles).slice(0, 4)

  return (
    <Card className="w-full bg-gray-100 shadow-md transition-all duration-300 min-h-[400px] md:min-h-[600px] m-2">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-center mb-4">
          No se encontraron resultados para tu búsqueda
        </h3>
        <p className="text-center mb-6">
          Pero no te preocupes, aquí tienes algunas sugerencias que podrían interesarte:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {randomFourVehicles.map((vehicle: Vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => {
                setSelectedVehicle(vehicle)
                setOpenDialog(true)
              }}
              className="cursor-pointer"
            >
              <VehicleCard
                name={vehicle.name}
                salePrice={vehicle.salePrice}
                cc={vehicle.cc}
                description={vehicle.description}
                images={vehicle.images}
                brand={vehicle.brand}
                category={vehicle.category}
                onClick={() => {
                  setSelectedVehicle(vehicle)
                  setOpenDialog(true)
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <BrandSlideshow setSearchText={setSearchText} />
          <div className="bg-gray-200 p-2 rounded-lg max-w-fit mx-auto mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-bold">¿No encuentras lo que buscas?</span>
              {" "}Prueba a buscar por marca.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

