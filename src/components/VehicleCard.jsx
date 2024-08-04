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
          <Typography sx={styles.title} variant="h2">
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
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    minWidth: "180px",
    minHeight: "150px",
    maxWidth: "180px",
    maxHeight: "120px",
    cursor: "pointer",
    padding: "1rem",
    margin: "1rem",
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
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    fontSize: "1rem",
    pt:1,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "80",
    borderRadius: "10px",
  },
  priceContainer: {
    position: "absolute",
    top: 1,
    left: 1,
    borderRadius: "5px",
    border: "1px solid green",
    backgroundColor: "#4CAF50",
    p: "3px",
    color: "white",
  },
  priceText:{
    fontSize: 15,
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
