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
import { useThemeState } from "../../context/useThemeState";
// ** Components
import { Slideshow } from "../../components/home/Slideshow";
import { SearchResult } from "../../components/home/SearchResult";
import { VehicleDialog } from "../../components/VehicleDialog";
import { VehicleView } from "../../components/VehicleView";
import { EmptyResult } from "../../components/home/EmptyResult";
import { AboutDialog } from "../../components/AboutDialog";
import { AboutContent } from "../../components/AboutDialog/AboutContent";
import { X } from "@phosphor-icons/react";

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
  const [showResult, setShowResult] = useState(false);
  const [delayedShowResult, setDelayedShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setDelayedShowResult(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setDelayedShowResult(false);
    }
  }, [showResult]);

  return (
    <Grid sx={styles.home} container>
      <Box sx={styles.homeBefore} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "initial",
        }}
      >
        <Slideshow />

        <Grid search xs={12} sx={styles.mainSearch}>
          <Box
            sx={showResult ? styles.containerFocused : styles.searchContainer}
          >
            <h1>¿Que vehículo te interesa?</h1>
            <Stack sx={styles.inputContainer} direction="row" spacing={2}>
              <TextField
                autoComplete="off"
                variant="outlined"
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={handleFocus}
                value={searchText}
                onBlur={handleBlur}
                sx={styles.searchInput}
                id="outlined-basic"
                label="Busca un Modelo / Marca"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchText && (
                        <Box onClick={()=>setSearchText("")} sx={styles.resetButton} component="button">
                          <X color="#EEFF71" size={12}/><Typography sx={styles.resetBtnText}>Resetear</Typography>
                        </Box>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
        </Grid>
      </Box>
      <Grid sx={styles.resultContainer}>
        {searchText ? (
          <SearchResult
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            text={searchText}
          />
        ) : null}
        {delayedShowResult && !searchText ? (
          <EmptyResult
            setSearchText={setSearchText}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ) : null}
        <VehicleDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <VehicleView />
        </VehicleDialog>
        <AboutDialog openDialog={about} setOpenDialog={setAbout}>
          <AboutContent />
        </AboutDialog>
      </Grid>
    </Grid>
  );
};

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
    mt: -32.5,
    zIndex: 0,
    backgroundPosition: "center",
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
    top: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 3,
  },
  mainSearch: {
    display: "flex",
    zIndex: 2,
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    borderRadius: "5px",
    transition: "transform 0.5s ease",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
    transform: "translateY(-250px)",
  },
  searchContainer: {
    display: "flex",
    width: "40%",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    borderRadius: "5px",
    transition: "transform 0.5s ease",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.25)",
  },
  searchInput: {
    width: "90%",
  },
};
