// ** React Imports
import React, { useState, useEffect } from "react";
// ** MUI Import
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
// ** Global State
import { useThemeState } from "../../context/useThemeState"
import { useSearchState } from "../../context/useSearchState"
// ** Components
import { Slideshow } from "../../components/home/Slideshow"
import { SearchResult } from "../../components/home/SearchResult"
import { VehicleDialog } from "../../components/VehicleDialog"
import { VehicleView } from "../../components/VehicleView"
import { EmptyResult } from "../../components/home/EmptyResult"
import { AboutDialog } from "../../components/AboutDialog"
import { AboutContent } from "../../components/AboutDialog/AboutContent"
import {SearchInput} from '../../components/home/SearchInput'
import { max } from "lodash";


export const Home = () => {
  // Estado global que uso para manejar los cambios en el template
  const {
    setLogoWidth,
    about,
    setAbout,
    contact,
    setContact,
    dealers,
    setDealers,
  } = useThemeState();

  // Estados locales
  const [showResult, setShowResult] = useState(false)

  const {searchText, setSearchText} = useSearchState()
  const [openDialog, setOpenDialog] = useState(false)

      //Handlers
      const handleFocus = () => {
        setShowResult(true);
        setLogoWidth("150px");
      };
      const handleBlur = () => {
        if (!searchText) {
          setLogoWidth("180px");
        }
      };
    

  return (
    <Grid sx={styles.home} container>
      <Box sx={styles.homeBefore} />
      <Grid sx={showResult ? styles.pageContainerActive : styles.pageContainer}>
        <Box sx={showResult ? styles.headerBoxGone : styles.headerBox}>
          <Typography sx={styles.homeTitle}>
            ¡La Casa de las mejores Marcas!
          </Typography>
          <Slideshow />
        </Box>
        

        <Box sx={styles.searchContainer}>
          <h1>¿Que vehículo te interesa?</h1>
          <Box sx={styles.inputContainer} spacing={2}>
            <SearchInput
              setSearchText={setSearchText}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
            />
          </Box>
        </Box>

        <Grid sx={{ position: "relative", display:'flex', flexDirection:'column', alignItems:'center' }} container>
          <Grid sx={!showResult ? styles.resultContainer : styles.resultContainerActive}>
            {searchText ? (
              <SearchResult
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            ) : null}
            {showResult && !searchText ? (
              <EmptyResult
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            ) : null}
            <VehicleDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            >
              <VehicleView />
            </VehicleDialog>
            <AboutDialog openDialog={about} setOpenDialog={setAbout}>
              <AboutContent />
            </AboutDialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = {
  home: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('main.jpg')",

    backgroundSize: "cover",
    mt: -33,
    zIndex: 0,
    backgroundPosition: "center",
  },
  pageContainer: {
    position: "relative",
    width: "100%",
 
    zIndex:5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageContainerActive: {
    position: "relative",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex:5,
    transition: "transform 0.5s ease",
    transform: "translateY(-200px)",
  },
  homeBefore: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black background with 50% opacity
    zIndex: 1, // Ensure the overlay is behind the content
    backdropFilter: "blur(5px)",
  },
  resultContainer: {
    position: "absolute",
    opacity:0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3,
    transition: "opacity 1s ease",
  },
  resultContainerActive: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3,
    transition: "opacity 1s ease",
    opacity: 1,
  },
  mainSearch: {
    display: "flex",
    zIndex: 2,
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox:{
    opacity:1,
    mb:2,
  },
  headerBoxGone:{
    opacity:0,
    mb:2,
    transition:'opacity 0.3s ease'
  },
  resetButton:{
    cursor:'pointer',
    borderRadius: 5,
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
    px:1,
    borderColor: 'transparent',
    backgroundColor: '#B30303',
    transition: 'background-color 0.3s',
    '&:hover':{
      backgroundColor: '#FF0000',
    }
  },
  homeTitle: {
    color: "white",
    fontFamily: "inherit",
    fontSize: 35,
    mb: 2,
    textAlign: "center",
    textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  resetBtnText:{
    fontSize:12,
    color:'white',
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerFocused: {
    display: "flex",
    width: "40%",
    zIndex: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
    
  },
  searchContainer: {
    display: "flex",
    width: "50%",
    zIndex: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    borderRadius: "5px",
    transition: "transform 0.5s ease",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
  },

};
