import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { XCircle } from '@phosphor-icons/react';

export const AboutDialog = ({children, title, openDialog, setOpenDialog}) => {

    const handleClose = () => {
        setOpenDialog(false)
    }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '70%',
          minHeight: '50%',
        },
      }}
    >
      <XCircle size={30} onClick={handleClose} style={{position: 'absolute', top: 10, right: 10, cursor: 'pointer'}} />
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
