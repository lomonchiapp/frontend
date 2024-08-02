import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Slideshow } from "../../components/home/Slideshow";
import { SearchResult } from "../../components/home/SearchResult";
import { VehicleDialog } from "../../components/VehicleDialog";
import { VehicleView } from "../../components/VehicleView";

export const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleFocus = () => setShowResult(true);
  const handleBlur = () => {
    if (!searchText) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Grid sx={styles.home} container>
      <Box sx={styles.homeBefore} />
      <Grid search item xs={12} sx={styles.mainSearch}>
        <Box sx={showResult ? styles.containerFocused : styles.searchContainer}>
          <h1>¿Que vehículo te interesa?</h1>
          <Stack sx={styles.inputContainer} direction="row" spacing={2}>
            <TextField
              variant="outlined"
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={styles.searchInput}
              id="outlined-basic"
              label="Busca un Modelo / Marca"
            />
            <Button size="large" variant="contained">
              Buscar
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid sx={styles.resultContainer}>
        {searchText && (
          <SearchResult
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            text={searchText}
          />
        )}
        <VehicleDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
          <VehicleView />
        </VehicleDialog>
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
    backgroundImage: "url('/main.jpg')",
    backgroundSize: "cover",
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
    top: 250,
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
    transform: "translateY(-350px)",
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
    width: "70%",
  },
};
