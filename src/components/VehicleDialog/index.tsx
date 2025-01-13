import React from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface VehicleDialogProps {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  children: React.ReactNode
}

export function VehicleDialog({ openDialog, setOpenDialog, children }: VehicleDialogProps) {
  if (!children) return null

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white sm: p-0 max-h-[90vh]">
        <button
          onClick={() => setOpenDialog(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </button>
        {children}
      </DialogContent>
    </Dialog>
  )
}

