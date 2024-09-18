import React from 'react'
import { Drawer, Divider, Typography, Box } from '@mui/material'
import { ContactForm } from './ContactForm'
import { WhatsappLogo } from '@phosphor-icons/react'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

export const ContactDrawer = ({open, setOpen, children}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#212121',
          color: 'white',
          width: '400px',
          padding: '20px',
        }
      }}
    >
      <ContactForm />
      <Divider />
      <Box sx={styles.wsBox}>
        <Box>
        <WhatsappLogo size={50} />

        </Box>
        <Box>
        <Typography sx={styles.title}>
          WhatsApp / Chat
        </Typography>
        <Typography sx={styles.wsNumber} gutterBottom>
          809 000 0000
        </Typography>
        </Box>
        <Box>
          <CaretRight size={50} />
        </Box>


      </Box>
      {children}
    </Drawer>
  )
}

const styles = {
  wsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginTop: 2,
    padding: 1,
    border: '1px solid #424242',
    borderRadius: 2,
    mx: 3.9,
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#00a126',
    },
  },
  wsNumber: {
    fontSize: 20,
    fontFamily: 'inherit',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'inherit',
  }
}
