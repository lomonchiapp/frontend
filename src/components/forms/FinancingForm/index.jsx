import React, { useState, useEffect } from "react";
// ** MUI Components
import { Grid, Box, Button, Typography,FormControl,FormHelperText, Select,MenuItem,TextField, Slider, Divider, FormLabel } from "@mui/material";
import { useVehicleState } from "../../../context/useVehicleState"

export const FinancingForm = ({setInitDeposit, initDeposit, financingTime, setFinancingTime }) => {
    const { selectedVehicle } = useVehicleState()
  const minPercentage = 0.35;
  const minDeposit = getMinDeposit()
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'DOP',
    }).format(value);
  };
  function getMinDeposit() {
    return selectedVehicle.salePrice * minPercentage;
  }

  return (
    <Grid sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    }} container>
      <Box>
        <Typography sx={styles.label}>Deposito Inicial</Typography>
        </Box>
      <Box sx={styles.initScreen}>${formatCurrency(initDeposit)}</Box> {/* Pantalla */}
      <Box sx={{width:200}}>
        <Slider
          aria-label="Temperature"
          defaultValue={minDeposit}
          onChange={(e, value) => setInitDeposit(value)}
          valueLabelDisplay="off"
          step={1000}
          marks
          min={minDeposit}
          max={selectedVehicle.salePrice}
        />
        <Typography sx={styles.helperText}>
          Ajuste el monto del deposito inicial.
        </Typography>
      </Box>
     
      {/* <Box>
        <Typography sx={styles.label}>Monto a financiar</Typography>
        <Box sx={styles.restScreen}>
          {formatCurrency(selectedVehicle.salePrice - initDeposit)}
        </Box>
      </Box>*/}
      <Box>
        <FormControl sx={{mt:3}}>
        <Typography sx={styles.secondLabel}>Elige un plazo para pagar</Typography>
        <Select
          value={financingTime}
          label="Plazo"
          onChange={(e) => setFinancingTime(e.target.value) }
          sx={{width:180}}
          size="small"
        >
          <MenuItem selected value={12}>12 meses</MenuItem>
          <MenuItem value={24}>24 meses</MenuItem>
          <MenuItem value={36}>36 meses</MenuItem>
          <MenuItem value={48}>48 meses</MenuItem>
          <MenuItem value={60}>60 meses</MenuItem>
        </Select>
        </FormControl>
      </Box>
    </Grid>
  );
}

const styles = {
    initScreen:{
        border: '1px solid #071565',
        backgroundColor: '#071565',
        color: '#fff',
        p:1,
    },
    helperText:{
      p:1,
      backgroundColor: '#f4f4f4',
        textAlign: 'center',
        fontSize: 10,
        color: '#071565',
    },
    secondLabel:{
        fontSize: 16,
        fontWeight:'600',
    },
    label:{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    restScreen:{
        border: '1px solid',
        backgroundColor: '#f4f4f4',
        color: '#071565',
        textAlign: 'center',
        p:1,
    },
    };
