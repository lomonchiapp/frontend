import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Stack } from '@mui/material'
import '../../src/index.css'


export const Navigation = () => {
  return (
    <Grid alignItems="center" container sx={styles.header}>
      {/* Logo Column */}
      <Grid item xs={2}>
        <Box style={styles.logo} component="img" src="logo.png" />
      </Grid>
      {/* Navigation Column */}
      <Grid xs={8}>
    <Stack sx={styles.navigation} direction="row" spacing={2}>
      <Link to="/">Home</Link>
      <Link to="/about">Catalog</Link>
      <Link to="/about">Catalog</Link>
      <Link to="/contact">Contact</Link>

    </Stack>
    </Grid>
      {/* User Column */}
      <Grid item xs={2}>
        <Stack direction="row" spacing={2}>
          <Link to="/login">Acceder</Link>
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Financiamiento
            </Button>
          </Link>
        </Stack>
        </Grid>
    </Grid>
  )
}

const styles = {
  navigation: {
    width: '100%',
    position: 'relative',
    pt: '1rem',

    a: {
      textDecoration: 'none',
      px: '1rem',
      py: '0.5rem',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#e10f18',
        borderRadius: '5px',
        color: 'white',
      },
    },
  },
  header: {
    px: '15rem',
    py: '1rem',
    backgroundColor: '#333',
  },
  logo: {
    position: 'absolute',
    zIndex: 3,
    top:20,
    width: '100%',
    maxWidth: '150px',
    height: 'auto',
  },
}
