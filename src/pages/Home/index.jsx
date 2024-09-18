// ** React Imports
import { useState } from "react";
// ** MUI Import
import {
  Box,
  Grid,
  Typography,
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
import { Dealers } from "../../components/DealersDialog/Dealers";
import {DealersDialog } from "../../components/DealersDialog"
import { AboutContent } from "../../components/AboutDialog/AboutContent"
import {SearchInput} from '../../components/home/SearchInput'
import { ContactDrawer } from "../../components/ContactDrawer";


export const Home = () => {
  // Estado global que uso para manejar los cambios en el template
  const {
    setLogoWidth,
    about,
    dealers,
    setDealers,
    setAbout,
    contact,
    setContact
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
        <Grid item
          xs={10}
          sm={9}
          md={8}
          lg={6}
          xl={6}
        sx={showResult ? styles.headerBoxGone : styles.headerBox}>
          <Typography sx={styles.homeTitle}>
            ¡La Casa de las mejores Marcas!
          </Typography>
          <Slideshow />
        </Grid>
        <Grid item
          xs={10}
          sm={10}
          md={10}
          lg={8}
          xl={8}
        sx={styles.searchContainer}>
          <Typography sx={styles.searchLabel}>Hola, ¿Que vehículo te interesa?</Typography>
          <Grid sx={{width:'90%'}}>
            <SearchInput
              setSearchText={setSearchText}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
            />
          </Grid>
        </Grid>

        <Grid sx={{
          width: "100%",
          display:'flex',
          justifyContent:'center',
          mt:2,
        }} container>
          <Grid item
            xs={12}
            sm={12}
            md={10}
            lg={8}
            xl={8}
          sx={!showResult ? styles.resultContainer : styles.resultContainerActive}>
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
            <DealersDialog openDialog={dealers} setOpenDialog={setDealers}>
              <Dealers/>
                </DealersDialog>
                <ContactDrawer open={contact} setOpen={setContact}>
                  </ContactDrawer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = {
  home: {
    width: "100%",
    position: "relative",
    flexDirection: "column",
    display: "flex",
    minHeight:{
      xs:"1280px",
      sm:"1280px",
      md:"900px",
      lg:"900px",
    },
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('main.jpg')",
    backgroundSize: "cover",
    mt: {
      xs: -7,
      sm: -7,
      md: -15,
      lg: -30,
      xl: -30,
    },
    zIndex: 0,
    backgroundPosition: "center",
  },
  pageContainer: {
    position: "relative",
    width: "100%",
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
    zIndex:2,
    transition: "transform 0.5s ease",
    transform: "translateY(-150px)",
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
    minHeight: '100%',
    flexDirection: "column",
    alignItems: "center",
    zIndex: 300,
    transition: "opacity 1s ease",
  },
  resultContainerActive: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 300,
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
    zIndex:2,
    opacity:1,
    mb:2,
  },
  headerBoxGone:{
    opacity:0,
    mb:2,
    transition:'opacity 0.3s ease'
  },
  searchLabel: {
    color: "black",
    fontFamily: "inherit",
    fontSize: 25,
    display: "flex",
    mb: 2,
    textAlign: "center",
  },

  homeTitle: {
    color: "white",
    fontFamily: "inherit",
    fontSize: 30,
    display:'none',
    mb: 2,
    textAlign: "center",
    textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  resetBtnText:{
    fontSize:12,
    color:'white',
  },
  containerFocused: {
    display: "flex",
    zIndex: 5,
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
    width: "100%",
    zIndex:5,
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
