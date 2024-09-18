import React from "react";
import { Box, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";


export const MobileMenu = () => {
  return (
    <Box sx={styles.container}>
        <Box sx={styles.logoContainer}>
            <img src="logo.png" alt="logo" style={{ width: '150px' }} />
        </Box>
        <List sx={styles.menu}>
            <ListItem>
                <Link to="/">Puntos de Venta</Link>
            </ListItem>
            <ListItem>
                <Link to="/about">Quienes Somos</Link>
            </ListItem>
            <ListItem>
                <Link to="/about">Quiero Vender</Link>
            </ListItem>
            <ListItem>
                <Link to="/contact">Contactar a Alguien</Link>
            </ListItem>
            
        </List>
        <Box sx={styles.socialBox}>
            <Box sx={styles.socialIcon}>
                <FacebookLogo
                    style={{ color: 'white', fontSize: '30px' }}
                />
            </Box>
            <Box sx={styles.socialIcon}>
                <InstagramLogo
                    style={{ color: 'white', fontSize: '30px' }}
                />
            </Box>
            <Box sx={styles.socialIcon}>
                <XLogo style={{ color: 'white', fontSize: '30px' }} />
            </Box>
        </Box>
    </Box>
  )
};

const styles = {
   logoContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1  0px',
    width: '100%',
    img:{
      width: '150px',
      mb:4,
    }
   },
   socialBox:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '20px',
    backgroundColor: '#3e3e3e',
    gap:2,
    padding: '10px 0',
    borderRadius: '0 0 10px 10px',
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
    socialBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: '20px',
    },
  },
};