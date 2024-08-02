import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const VehicleDialog = ({children, title, openDialog, setOpenDialog}) => {

    const handleClose = () => {
        setOpenDialog(false)
    }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '600px',
          minHeight: '550px',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
