import React, { useState } from 'react'
import { Drawer } from '@mui/material'

export const MenuDrawer = ({ children, open, setOpen }) => {

    const handleClose = () => {
        setOpen(false)
    }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#212121', // Dark background color
          color: 'white', // Text color
          padding: '20px', // Padding
        }
      }}
    >
      {children}
    </Drawer>
  );
}