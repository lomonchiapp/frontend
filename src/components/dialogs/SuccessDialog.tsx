import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
}

export function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <DialogTitle>¡Solicitud Enviada!</DialogTitle>
          </div>
          <DialogDescription className="pt-4 space-y-2">
            <p>
              Su solicitud de financiamiento ha sido recibida exitosamente. 
              Nuestro equipo estará revisando su información y se pondrá en contacto 
              con usted en las próximas 24-48 horas laborables.
            </p>
            <p>
              Si tiene alguna pregunta, puede contactarnos al:
              <br />
              <span className="font-medium">
                
              </span>
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 