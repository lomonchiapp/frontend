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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
      <div>
        <ImageCarousel images={selectedVehicle?.images} />
        <VehicleDetails vehicle={selectedVehicle} />
        <Button 
          className="w-full mt-10" 
          onClick={handleOpenApplication}
        >
          Solicitar Financiamiento
        </Button>
      </div>
      <div>
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

      <Dialog 
        open={showApplicationForm} 
        onOpenChange={setShowApplicationForm}
      >
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
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

