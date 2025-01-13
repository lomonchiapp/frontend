import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageCarousel } from './ImageCarousel'
import { VehicleDetails } from './VehicleDetails'
import { FinancingCalculator } from './FinancingCalculator'
import { VehicleSpecs } from './VehicleSpecs'
import { ClientApplicationForm } from '../forms/ClientApplicationForm'
import { useGlobalState } from "@/hooks/context/global/useGlobalState"
import { useNewAppState } from "@/hooks/context/global/useNewAppState"

export function VehicleView() {
  const { selectedVehicle } = useGlobalState()
  const { setVehicle } = useNewAppState()
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const handleOpenApplication = () => {
    setVehicle(selectedVehicle)
    setShowApplicationForm(true)
  }

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Columna izquierda: Imagen y detalles */}
        <div className="flex-1 space-y-6">
          <div className="sm:max-h-[600px]">
            <ImageCarousel images={selectedVehicle?.images} />
          </div>
          <VehicleDetails vehicle={selectedVehicle} />
          <Button 
            className="w-full" 
            onClick={handleOpenApplication}
          >
            Solicitar Financiamiento
          </Button>
        </div>

        {/* Columna derecha: Tabs de financiamiento y especificaciones */}
        <div className="flex-1">
          <Tabs defaultValue="financing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="financing">Financiamiento</TabsTrigger>
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="financing">
              <FinancingCalculator 
                vehicle={selectedVehicle} 
              />
            </TabsContent>
            <TabsContent value="specs">
              <VehicleSpecs vehicle={selectedVehicle} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog 
        open={showApplicationForm} 
        onOpenChange={setShowApplicationForm}
      >
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] w-[90vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitud de Financiamiento</DialogTitle>
          </DialogHeader>
          <ClientApplicationForm 
            vehicleId={selectedVehicle?.id!}
            onSuccess={() => {
              setShowApplicationForm(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

