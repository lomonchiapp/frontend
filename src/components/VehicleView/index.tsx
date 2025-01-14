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
    <div className="flex flex-col lg:flex-row">
      {/* Columna izquierda: Imagen, detalles y botón */}
      <div className="flex-1 flex flex-col h-full">
        {/* Contenido fijo superior */}
        <div className="flex-shrink-0">
          {/* Imagen */}
          <div className="w-full h-[40vh] lg:h-[50vh]">
            <ImageCarousel images={selectedVehicle?.images} />
          </div>
          
          {/* Botón sticky - visible en móvil */}
          <div className="lg:hidden sticky top-0 z-10 bg-white border-b shadow-sm">
            <div className="p-4">
              <Button 
                className="w-full" 
                onClick={handleOpenApplication}
              >
                Solicitar Financiamiento
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <VehicleDetails vehicle={selectedVehicle} />
            
            {/* Botón - visible en desktop */}
            <div className="hidden lg:block mt-6">
              <Button 
                className="w-full" 
                onClick={handleOpenApplication}
              >
                Solicitar Financiamiento
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: Tabs */}
      <div className="lg:w-[45%] lg:h-full lg:overflow-y-auto">
        <Tabs defaultValue="financing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white z-10">
            <TabsTrigger value="financing">Financiamiento</TabsTrigger>
            <TabsTrigger value="specs">Especificaciones</TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="financing">
              <FinancingCalculator 
                vehicle={selectedVehicle} 
              />
            </TabsContent>
            <TabsContent value="specs">
              <VehicleSpecs vehicle={selectedVehicle} />
            </TabsContent>
          </div>
        </Tabs>
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

