import React from "react";
import { Box,  Grid, Typography } from "@mui/material";
import { Cursor } from "@phosphor-icons/react";


export const VehicleCard = ({ title, price, category, cc,brand, image }) => {
  return (
    <Grid item xs={3}>
      <Box sx={styles.cardContainer}>
        <Box sx={styles.ccContainer}>
            <Typography sx={styles.ccText}>{cc}cc</Typography>
        </Box>
        <Box sx={styles.priceContainer}>
            <Typography sx={styles.priceText}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
            </Typography>
        </Box>
      {image ? <Box component="img" src={image} sx={styles.image} /> : <Box sx={styles.imagePlaceholder} />}
        <Box sx={styles.cardContent}>
          <Typography sx={styles.title}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "start",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: 'white',
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    minWidth: "180px",
    minHeight: "140px",
    maxWidth: "180px",
    maxHeight: "140px",
    cursor: "pointer",
    p: '0px 0px 5px 0px'
    
  },
  ccContainer:{
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: "5px",
    backgroundColor: "black",
    p: "3px",
    color: "white",
  },
    ccText:{
        fontSize: 10,
    },
  imagePlaceholder: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "grey",
    height: "80",
  },
  title: {
    textAlign: "center",
    fontSize: "10px",
    pt:1,
    px:2,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    maxHeight: 100,
  },
  priceContainer: {
    position: "absolute",
    top: 0,
    left: 0,

    border: "1px solid green",
    backgroundColor: "#4CAF50",
    p: "3px",
    color: "white",
  },
  priceText:{
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    h2: {
      fontSize: 15,
    },
    p: {
      fontSize: "1rem",
    },
  },
};
