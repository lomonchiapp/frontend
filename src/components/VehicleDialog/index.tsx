import React from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"


interface VehicleDialogProps {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  children: React.ReactNode
}


export function VehicleDialog({ openDialog, setOpenDialog, children }: VehicleDialogProps) {
  if (!children) return null

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white sm:max-w-[800px]">
        {children}
      </DialogContent>
    </Dialog>
  )
}

