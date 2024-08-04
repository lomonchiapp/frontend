import { Link } from "react-router-dom";
import { Box,  Grid, Stack, Typography } from "@mui/material";
import "../../src/index.css";
import { List, User } from "@phosphor-icons/react";
import { useThemeState } from "../context/useThemeState";

export const Navigation = () => {
  const {logoWidth, setAbout, setContact, setDealers} = useThemeState()

  return (
    <Grid alignItems="center" container sx={styles.header}>
      <Box sx={styles.menuIcon}>
        <List color="white" size={30} />
      </Box>
      {/* Logo Column */}
      <Grid sx={{zIndex:3}} item xs={3}>
        <Box style={{
    zIndex: 3,
    top: 20,
    width: "100%",
    maxWidth: logoWidth,
    height: "auto",
    transition:"max-width 0.5s ease"
  }} component="img" src="logo.png" />
      </Grid>
      {/* Navigation Column */}
      <Grid md={9} lg={9} xl={9}>
        <Stack sx={styles.navigation} direction="row" spacing={2}>
          <Box sx={styles.boxMenu}>
          <Link onClick={() => setDealers(true)}>Consorcios</Link>
          <Link onClick={() => setAbout(true)}>Sobre Nosotros</Link>
          <Link onClick={() => setContact(true)}>Contáctanos</Link>
          <Link to="https://orientalramirez-a8745.web.app/" style={{ textDecoration: "none", color: "white" }}>
          <Box
            sx={styles.button}
            variant="contained"
            component="button"
            color="secondary"
          >
            
            <Box sx={{ pr: 1, pt:0.5, alignContent:'center', alignSelf:'center' }}>
              <User color="#F7F32E" size={16} />
            </Box>
            <Typography sx={{ fontFamily: "inherit", fontSize:14 }}>Acceder</Typography>
          </Box>
          </Link>
          </Box>
        </Stack>
      </Grid>
      {/* User Column */}
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
    backgroundColor:"#1B1B1BA5",
    display:'flex',
    py:1,
    px:5,
    borderRadius:3,
    alignItems:'center',
    },
  header: {
    px: "15rem",
    py: "1rem",
    pt: 4.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
  },
  menuIcon:{
    position:'absolute',
    zIndex:4,
    top: 30,
    left: 30,
    backgroundColor: "#1B1B1B",
    borderRadius: 3,
    p:'0.6rem 0.6rem 0.3rem 0.6rem',
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9A0000",
    fontFamily: "inherit",
    color: "white",
    border:'1px solid #FFFFFF',
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
