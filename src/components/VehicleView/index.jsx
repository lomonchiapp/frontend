import React, {useState} from "react"
import {
  Grid,
  Box,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material"
import { useVehicleState } from "../../context/useVehicleState"
import { FinancingForm } from "../forms/FinancingForm"

export const VehicleView = () => {
  const { selectedVehicle } = useVehicleState()
  const [initDeposit, setInitDeposit] = useState(0)
  const [financingTime, setFinancingTime] = useState(12)
    const monthlyPayment = (selectedVehicle.salePrice - initDeposit) / financingTime;
  return (
    <Grid sx={styles.view} container>
      <Grid item xs={12}>
        <Box sx={styles.box}>
          <h1>{selectedVehicle.name}</h1>
        </Box>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        item
      >
        <Box sx={styles.imgBox}>
          <Box>
            <img
              src={selectedVehicle.image}
              style={styles.img}
              alt={selectedVehicle.name}
            />
          </Box>
          <Box sx={styles.desc}>
            <Box sx={styles.ccContainer}>
              <Typography sx={styles.ccText}>
                {selectedVehicle.cc} cc
              </Typography>
            </Box>
            <Box sx={styles.categoryContainer}>
              <Typography sx={styles.ccText}>
                Categoria: {selectedVehicle.category.name}
              </Typography>
            </Box>
            <Box sx={styles.brandContainer}>
              <Typography sx={styles.ccText}>
                Marca: {selectedVehicle.brand.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.inForm}>
          <Box sx={styles.formContainer}>
            <FinancingForm
              initDeposit={initDeposit}
              setFinancingTime={setFinancingTime}
              setInitDeposit={setInitDeposit}
              financingTime={financingTime}
            />
          </Box>
        </Box>
      </Grid>
      <TableContainer sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 'auto',
      }}>
        <Table sx={{
            width:'100%',
        }}>
          {/*Precio total de venta */}
          <TableRow>
            <TableCell sx={styles.cell}>
              <Typography sx={styles.tableLabel}>Precio de Venta</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={styles.tableValue}>RD$ {selectedVehicle.salePrice}</Typography>
            </TableCell>
          </TableRow>
          {/*Cantidad a depositar */}
          <TableRow>
            <TableCell sx={styles.cell}>
              <Typography sx={styles.tableLabel}>Deposito Inicial</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={styles.tableValue}>RD$ {initDeposit}</Typography>
            </TableCell>
          </TableRow>
        {/*Cantidad a depositar */}
        <TableRow>
            <TableCell sx={styles.cell}>
              <Typography sx={styles.tableLabel}>Monto a Financiar</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={styles.tableValue}>RD$ {selectedVehicle.salePrice - initDeposit}</Typography>
            </TableCell>
          </TableRow>
           {/*Cantidad a depositar */}
        <TableRow>
            <TableCell sx={styles.cell}>
              <Typography sx={styles.tableLabel}>Pago Mensual</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={styles.tableValue}>RD$ {(monthlyPayment).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Grid>
  );
};

const styles = {
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cell:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ccContainer: {
    display: "flex",
    backgroundColor: "#2d2d2d",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    mr:1,
    borderRadius: 5,
  },
  tableLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
    tableValue: {
    fontSize: 14,
    },
  brandContainer: {
    display: "flex",
    backgroundColor: "#2d2d2d",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    mr:1,
    borderRadius: 5,
  },
  categoryContainer: {
    display: "flex",
    backgroundColor: "#2d2d2d",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    mr:1,
    borderRadius: 5,
  },
  ccText: {
    fontSize: 10,
    color: "white",
  },
  label: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  inForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imgBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    border: "1px solid #f4f4f4",
    borderRadius: 5,
    p:1
  },
  formContainer: {
    display: "flex",
    pl: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  img: {
    aspectRatio: "1/1",
    objectFit: "cover",
    width: 250,
  },
};
