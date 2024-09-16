import React, { useState, useEffect } from 'react';
import { Grid, Box, Pagination, Button, Select, MenuItem } from '@mui/material';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { VehicleCard } from '../VehicleCard';
import { database } from '../../firebase';
// ** Global Imports
import { useSearchState } from '../../context/useSearchState';
import { useVehicleState } from '../../context/useVehicleState';

export const SearchResult = ({ setOpenDialog, openDialog }) => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const { setSelectedVehicle } = useVehicleState()
  const {searchText } = useSearchState()


  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const fetchVehicles = async () => {
    setLoading(true);
    const vehiclesCollection = collection(database, 'vehicles');
    const vehiclesSnapshot = await getDocs(vehiclesCollection);
    const vehiclesData = vehiclesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setVehicles(vehiclesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);



  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const pageCount = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <Grid sx={styles.box} container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid sx={styles.vehiclesContainer}>
          {searchText && filteredVehicles.length === 0 ? (
            <Box sx={styles.emptyResult}>
              <h2>No se encontraron vehículos</h2>
            </Box>            
          ): null}
          {filteredVehicles
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((vehicle) => (
              <Box
              onClick={() => {
                setSelectedVehicle(vehicle)
                setOpenDialog(true)
              }}
              key={vehicle.id}>
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
        <Box sx={styles.paginationContainer}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
          <Select
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
            displayEmpty
            inputProps={{ 'aria-label': 'Items per page' }}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  box: {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    margin: 2,
  },
  vehiclesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
