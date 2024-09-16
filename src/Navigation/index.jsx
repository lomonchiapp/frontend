import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import "../../src/index.css";
import { List, User } from "@phosphor-icons/react";
import { useThemeState } from "../context/useThemeState";
import { MenuDrawer } from "./MenuDrawer";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { MobileMenu } from "./MobileMenu";

export const Navigation = () => {
  const { logoWidth, setAbout, setContact, setDealers } = useThemeState();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOnClose = () => {
    setMenuOpen(false);
  };

  return (
    <Grid alignItems="center" container sx={styles.header}>
      <Box onClick={() => setMenuOpen(true)} sx={styles.menuIcon}>
        <List style={{ color: "white", fontSize: 30 }} />
      </Box>
      {/* Logo Column */}
      <Grid sx={{ zIndex: 3, position: 'relative', display:'flex', justifyContent:'center' }} item xs={12} sm={12} md={4} lg={3} xl={4}>
        <Box
          component="img"
          src="logo.png"
          alt="logo"
          sx={{
            width: {
              xs: "150px",
              sm: "150px",
              md: "130px",
              lg: "150px",
              xl: "200px",
            },
            display: {
              xs: "block",
              md: "none",
              lg: "block",
            },
            mb: {
              xs: -22,
              md: 0,
            },
            pb:{
              xs: 5,
              md: 0
            }
          }}
        />
      </Grid>
      {/* Navigation Column */}
      <Grid md={8} lg={9} xl={9} sx={{ display: { xs: "none", md: "block" } }}>
        <Stack sx={styles.navigation} direction="row" spacing={2}>
          <Box sx={styles.boxMenu}>
            <Link onClick={() => setDealers(true)}>Consorcios</Link>
            <Link onClick={() => setAbout(true)}>Sobre Nosotros</Link>
            <Link onClick={() => setContact(true)}>Contáctanos</Link>
            <Link
              to="https://orientalramirez-a8745.web.app/"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Box
                sx={styles.button}
                variant="contained"
                component="button"
                color="secondary"
              >
                <Box
                  sx={{
                    pr: 1,
                    pt: 0.5,
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <User color="#F7F32E" size={16} />
                </Box>
                <Typography sx={{ fontFamily: "inherit", fontSize: 14 }}>
                  Acceder
                </Typography>
              </Box>
            </Link>
          </Box>
        </Stack>
      </Grid>
      {/* User Column */}
      <MenuDrawer open={menuOpen} setOpen={setMenuOpen} onClose={handleOnClose}>
        <Box>
                <MobileMenu />
        </Box>
      </MenuDrawer>
    </Grid>
  );
};

const styles = {
  navigation: {
    width: "100%",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 2,
    a: {
      textDecoration: "none",
      px: "1.5rem",
      py: "0.5rem",
      color: "white",
      minWidth: {
        md: "100px",
      },
      fontSize: 14,
      borderBottom: "solid 1px",
      borderBottomColor: "transparent",
      transition: "all 0.3s ease",
      "&:hover": {
        borderBottomColor: "#e10f18",
        borderRadius: "5px",
        color: "white",
      },
    },
  },
  boxMenu: {
    backgroundColor: "#1B1B1BA5",
    display: "flex",
    py: 1,
    px: 5,
    borderRadius: 3,
    alignItems: "center",
  },
  header: {
    px: "7rem",
    py: "1rem",
    pt: 4.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
  },
  menuIcon: {
    position: "absolute",
    zIndex: 4,
    top: 38,
    height: 50,
    alignContent: "center",
    left: 30,
    cursor: "pointer",
    backgroundColor: "#1B1B1B",
    borderRadius: 3,
    p: "0.6rem 0.6rem 0.3rem 0.6rem",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9A0000",
    fontFamily: "inherit",
    color: "white",
    border: "1px solid #FFFFFF",
    height: "2rem",
    borderRadius: "5px",
    p: "0.5rem 1rem",
    transition: "all 0.3s ease",
    "&:hover": {
      borderRadius: "5px",
      color: "white",
    },
  },
};
