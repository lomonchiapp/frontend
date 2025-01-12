import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { SuccessDialog } from "../dialogs/SuccessDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNewAppState } from "@/hooks/context/global/useNewAppState"
import { useNewAppClient } from "@/hooks/context/global/useNewAppClient"
import { Client } from "@/types/interfaces/client"
import { Application } from "@/types/interfaces/application"
import { ApplicationStatus } from "@/types/enums"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LocationPicker } from "@/components/maps/LocationPicker"

interface ClientApplicationFormProps {
  vehicleId: string
  onSuccess: () => void
}

export function ClientApplicationForm({ vehicleId, onSuccess }: ClientApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { createClient, createApplication } = useNewAppClient()
  const { initialDeposit, financingMonths, vehicle } = useNewAppState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cedula: "",
    phone: "",
    address: "",
  })
  const [location, setLocation] = useState<{ lat: number, lng: number }>({
    lat: 18.4861,
    lng: -69.9312
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng })
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert("Por favor, complete el captcha")
      return
    }

    try {
      setIsLoading(true)
      
      const clientData: Omit<Client, 'id'> = {
        ...formData,
        debt: 0,
        city: { name: "Santo Domingo", ...location },
        lat: location.lat,
        lng: location.lng,
      }
      
      let clientId: string
      try {
        clientId = await createClient(clientData)
        console.log('Cliente creado con ID:', clientId)
      } catch (error) {
        console.error('Error al crear el cliente:', error)
        throw new Error('No se pudo crear el cliente')
      }

      if (clientId) {
        const applicationData: Omit<Application, 'id'> = {
          clientId,
          vehicleId,
          status: ApplicationStatus.PENDING,
          name: `Aplicación de ${formData.name}`,
          description: `Solicitud de financiamiento - Depósito: RD$${initialDeposit.toLocaleString()} - Plazo: ${financingMonths} meses`,
          initialPaymentAmount: initialDeposit,
          financingMonths,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        try {
          await createApplication(applicationData)
          console.log('Aplicación creada exitosamente')
          setShowSuccess(true)
          // Resetear el captcha
          recaptchaRef.current?.reset()
          setCaptchaVerified(false)
        } catch (error) {
          console.error('Error al crear la aplicación:', error)
          throw new Error('No se pudo crear la aplicación')
        }
      }
    } catch (error) {
      console.error("Error creating client and application:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onSuccess()
  }

  const monthlyPayment = vehicle ? (vehicle.salePrice - initialDeposit) / financingMonths : 0

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cedula">Cédula</Label>
            <Input
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              minLength={11}
            />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              minLength={10}
            />
          </div>
          <div>
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              minLength={5}
            />
          </div>
          <div>
            <Label>Ubicación</Label>
            <LocationPicker 
              onLocationSelect={handleLocationSelect}
              initialLocation={location}
            />
          </div>
          
          <div className="flex justify-center my-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              theme="light"
            />
          </div>

          <Alert className="mt-6 bg-muted">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Al enviar esta solicitud, usted autoriza a Oriental Ramírez a realizar 
              las investigaciones crediticias correspondientes en el buró de crédito.
            </AlertDescription>
          </Alert>

          <Button 
            type="submit" 
            disabled={isLoading || !captchaVerified} 
            className="w-full"
          >
            {isLoading ? "Procesando..." : "Enviar Solicitud"}
          </Button>
        </form>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Vehículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modelo:</span>
                <span className="font-medium">{vehicle?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marca:</span>
                <span className="font-medium">{vehicle?.brand.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precio:</span>
                <span className="font-medium">RD$ {vehicle?.salePrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Financiamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Depósito Inicial:</span>
                <span className="font-medium">RD$ {initialDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto a Financiar:</span>
                <span className="font-medium">
                  RD$ {(vehicle?.salePrice ? vehicle.salePrice - initialDeposit : 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plazo:</span>
                <span className="font-medium">{financingMonths} meses</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-muted-foreground">Cuota Mensual:</span>
                <span className="font-medium text-lg">
                  RD$ {monthlyPayment.toLocaleString(undefined, { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SuccessDialog 
        open={showSuccess} 
        onClose={handleSuccessClose}
      />
    </>
  )
} 