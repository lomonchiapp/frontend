// ** React Import
import React, { useState, useEffect } from "react"
import { Grid, Box, Typography } from "@mui/material"
// ** Firebase Imports
import { collection, getDocs } from "firebase/firestore"
import { database } from "../../firebase"
// ** Custom Components
import { VehicleCard } from "../VehicleCard"

import { shuffle } from "lodash"
import { BrandSlideshow } from "./BrandSlideshow"
// ** Global Imports
import { useSearchState } from "../../context/useSearchState"
import { useVehicleState } from "../../context/useVehicleState"

export const EmptyResult = ({ setOpenDialog}) => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const { setSelectedVehicle } = useVehicleState()
  const { setSearchText } = useSearchState()


  const fetchVehicles = async () => {
    setLoading(true)
    const vehiclesCollection = collection(database, "vehicles")
    const vehiclesSnapshot = await getDocs(vehiclesCollection)
    const vehiclesData = vehiclesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const randomVehicles = shuffle(vehiclesData).slice(0, 4)
    setVehicles(randomVehicles)
    setLoading(false)
  };

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <Grid sx={styles.box} container>
      <Grid item
        xs={10}
        sm={10}
        md={12}
        lg={12}
        xl={12}
      >
        <BrandSlideshow />
        <Box sx={styles.helperTextContainer}>
        <Typography sx={{...styles.helperText, fontWeight:'bold'}}>
        ¿No sabes por donde empezar?
          </Typography><Typography sx={{...styles.helperText, ml:0.5}}> Selecciona tu marca favorita.</Typography>
          </Box>
      </Grid>
      <Box sx={styles.headerContainer}>
        <Typography sx={styles.header}>Ultimos Vehículos Buscados</Typography>
      </Box>
        <Grid item sx={styles.vehiclesContainer}
          xs={12} sm={12} md={12} lg={12} xl={12}>
        
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
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    minHeight: {
      xs: 600,
      sm: 600,
      md:400,
    },
    margin: 2,
  },
  headerContainer: {
    mt:5,
  },
  header:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:2,
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
