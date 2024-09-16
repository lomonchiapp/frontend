import React from "react";
import { Box } from "@mui/material";


export const MobileMenu = () => {
  return (
    <Box sx={styles.container}>
        <Box>
            <img src="logo.png" alt="logo" style={{ width: '150px' }} />
        </Box>
        <nav style={styles.nav}>
            <ul style={styles.menu}>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </Box>
  )
};

const styles = {
    drawer: {
      '& .MuiDrawer-paper': {
        backgroundColor: '#333', // Dark background color
        color: 'white', // Text color
        width: '250px', // Width of the drawer
      },
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    menu: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      width: '100%',
      a:{
        color: 'white',
        textDecoration: 'none',
        padding: '10px 15px',
        display: 'block',
        '&:hover':{
          backgroundColor: 'red',
      }
    },
    container: {
      display: 'flex',
    flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      height: '100%',
      width: '100%',
    },
  },
};