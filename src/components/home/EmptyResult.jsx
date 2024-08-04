import React, { useState, useEffect } from "react";
import { Grid, Box, Typography} from "@mui/material";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { VehicleCard } from "../VehicleCard";
import { database } from "../../firebase";
import { useVehicleState } from "../../context/useVehicleState";
import { shuffle } from "lodash";
import { BrandSlideshow } from "./BrandSlideshow";

export const EmptyResult = ({ text, setOpenDialog, openDialog, setSearchText}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedVehicle } = useVehicleState();


  const fetchVehicles = async () => {
    setLoading(true);
    const vehiclesCollection = collection(database, "vehicles");
    const vehiclesSnapshot = await getDocs(vehiclesCollection);
    const vehiclesData = vehiclesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const randomVehicles = shuffle(vehiclesData).slice(0, 4);
    setVehicles(randomVehicles);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <Grid sx={styles.box} container>
      <Box>
        <BrandSlideshow setSearchText={setSearchText} />
        <Box sx={styles.helperTextContainer}>
        <Typography sx={{...styles.helperText, fontWeight:'bold'}}>
        ¿No sabes por donde empezar?
          </Typography><Typography sx={{...styles.helperText, ml:0.5}}> Selecciona tu marca favorita.</Typography>
          </Box>
      </Box>
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.header}>Ultimos Vehículos Buscados</Typography>
      </Box>
        <Grid sx={styles.vehiclesContainer}>
          {vehicles.map((vehicle) => (
            <Box
              onClick={() => {
                setSelectedVehicle(vehicle);
                setOpenDialog(true);
              }}
              key={vehicle.id}
            >
              <VehicleCard
                key={vehicle.id}
                title={vehicle.name}
                price={vehicle.salePrice}
                cc={vehicle.cc}
                image={vehicle.image}
              />
            </Box>
          ))}
        </Grid>

    </Grid>
  );
};

const styles = {
  box: {
    padding: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    margin: 2,
    minWidth: 600,
    minHeight: 500,
  },
  headerContainer: {
    mt:5,
  },
  header:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  helperTextContainer:{
    p:1,
    display: "flex",
    maxWidth:'fit-content',
    margin: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#ECEBEB",
  },
  helperText: {
    fontSize: 12,
    textAlign: "center",
    color:'grey',
  },
  vehiclesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 2,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
};

//const styles = {
//  box: {
//   display: "flex",
//    overflow: "auto",
//    minWidth: "100%",
//    minHeight: "100%",
//    backgroundColor: "#f4f4f4",
//    borderRadius: "10px",
//    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
//    padding: "1rem",
//    margin: "1rem",
//  },
//  vehiclesContainer: {
//    display: "flex",
//    flexDirection: "row",
//    flexWrap: "wrap",
//  },
//  vehicle: {
//    display: "flex",
//  },
//};
