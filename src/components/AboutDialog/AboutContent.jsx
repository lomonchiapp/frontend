import React from "react";
import { Typography, Grid } from "@mui/material";
import { AboutInfo } from "./AboutInfo";
import { AboutSlider } from "./AboutSlider";

export const AboutContent = () => {
  return (
    <Grid sx={styles.container}>
        <Grid xs={6} sx={styles.infoContainer}>
            <Typography sx={styles.title} variant="h4">Sobre Nosotros</Typography>
      <AboutInfo />
        </Grid>
        <Grid>
            <AboutSlider/>
        </Grid>
      
    </Grid>
  );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        padding: "20px",
    },
    title: {
        color: "black",
        fontWeight: "bold",
    },
    };
