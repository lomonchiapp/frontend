import React from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface VehicleDialogProps {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  children: React.ReactNode
}

export function VehicleDialog({ openDialog, setOpenDialog, children }: VehicleDialogProps) {
  if (!children) return null

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className={cn(
        "bg-white rounded-lg p-5 max-h-[90vh] min-w-[70vw] pt-10",
        "w-[95vw] overflow-y-auto sm:w-[90vw]  md:w-[85vw] lg:w-[75vw] xl:w-[1200px]",
      )}>
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

