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
  const [financingValues, setFinancingValues] = useState({
    deposit: selectedVehicle?.salePrice ? selectedVehicle.salePrice * 0.3 : 0,
    months: 12
  })

  const handleFinancingChange = (deposit: number, months: number) => {
    setFinancingValues({ deposit, months })
  }

  const handleOpenApplication = () => {
    setVehicle(selectedVehicle)
    setShowApplicationForm(true)
  }

  return (
    <div className="flex flex-col h-[85vh] sm:h-auto sm:grid sm:grid-cols-2 gap-4 bg-white">
      <div className="sticky top-0 z-10 bg-white">
        <ImageCarousel images={selectedVehicle?.images} />
      </div>
      
      <div className="overflow-y-auto px-4 pb-4 flex-1">
        <VehicleDetails vehicle={selectedVehicle} />
        <Button 
          className="w-full mt-4 mb-6" 
          onClick={handleOpenApplication}
        >
          Solicitar Financiamiento
        </Button>
        
        <Tabs defaultValue="financing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-white">
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

