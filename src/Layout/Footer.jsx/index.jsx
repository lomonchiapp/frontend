import React from "react";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <Grid sx={styles.footer} container>
      <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={7} lg={4}>
          <Grid item lg={11} md={12} xs={12} sx={styles.companyBox}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Box sx={{mr:1}}>
              <img
                src="logo.png"
                alt="logo"
                style={{ width: "100px", filter: "grayscale(100%)" }}
              />
            </Box>
            <Box sx={styles.companyInfo}>
              <Typography sx={styles.nameTitle}>
                Auto Moto Prestamo
                <br />
                Oriental Ramirez SRL.
              </Typography>
              <Typography sx={styles.rnc}>RNC: 130149382 </Typography>
            </Box>
            </Box>
            <Box sx={styles.socialBox}>
            <Box sx={styles.socialIcon}>
                <FacebookLogo
                    style={{ color: '#b4b3b3', fontSize: '25px' }}
                />
            </Box>
            <Box sx={styles.socialIcon}>
                <InstagramLogo
                    style={{ color: '#b4b3b3', fontSize: '25px' }}
                />
            </Box>
            <Box sx={styles.socialIcon}>
                <XLogo style={{ color: '#b4b3b3', fontSize: '25px' }} />
            </Box>
        </Box>
          </Grid>
        </Grid>
        <Grid sx={styles.column} item xs={6} sm={4} md={4} lg={3}>
          <Typography sx={styles.menuHeader}>Negocia Con Nosotros</Typography>
          <List sx={styles.menu}>
            <ListItem>
              <Typography sx={styles.menuItem}>Financiamiento</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={styles.menuItem}>Vender mi Vehiculo</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={styles.menuItem}>Seguros</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={styles.menuItem}>Garantías</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid sx={styles.column} item xs={6} sm={5} md={5} lg={3}>
          <Typography sx={styles.menuHeader}>Oriental Ramirez</Typography>
          <List sx={styles.menu}>
            <ListItem>
              <Typography sx={styles.menuItem}>Trabaja con Nosotros</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={styles.menuItem}>Condiciones de Uso</Typography>
            </ListItem>
            <ListItem>
              <Typography sx={styles.menuItem}>
                Políticas de Privacidad
              </Typography>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = {
  footer: {
    padding: "20px",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
  },
  menuItem: {
    color: "#bbbbbb",
    fontSize: "14px",
    fontFamily: "inherit",
    padding: "0",
    margin: 0,
  },

  menuHeader: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
    fontFamily: "inherit",
    ml: 1.8,
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    fontFamily: "inherit",
  },
  companyBox: {
    display: "flex",
    flexDirection: {
        xs: "column",
        sm: "column",
        md: "row",
        },
    alignItems: "center",
    justifyContent: "space-between",
    padding: {
        xs:"10px",

    },
    backgroundColor: "#4b4747",
    borderRadius: "10px",
    gap: 2,
  },
  companyInfo:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0.3,
    alignItems: "flex-start",
  },
  nameTitle: {
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    lineHeight: 1.2,
  },
  rnc: {
    color: "#9f9f9f",
    fontFamily: "inherit",
  },
  socialBox: {
    display: "flex",

    flexDirection: {
        xs: "row",
        sm: "row",
        md: "column",
        },
    justifyContent: "space-between",
    alignItems: "center",

  },
};
