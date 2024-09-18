import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { locations } from "./locations";
import { Grid, Box, Typography, Button, Stack, Card, CardContent } from "@mui/material";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine';

export const Dealers = () => {
  const mapStyles = {
    height: "300px",
    width: "100%",
  };
  const [initialPosition, setInitialPosition] = useState({lat:18.4566342, lng:-69.296238});
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const [userPosition, setUserPosition] = useState({lat: null, lng:null});
  const [map, setMap] = useState(null);
  const [route,setRoute] = useState(null);
  const mapRef = useRef(null);

  const dealer = L.icon({
    iconUrl: "/location/dealerPin.svg",
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });

  const mePin = L.icon({
    iconUrl: "/location/mePin.svg",
    iconSize: [38, 38], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
  });

  const CenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position.lat && position.lng) {
        map.setView([position.lat, position.lng], 14);
      }
    }, [position, map]);
    return null;
  };
  const handleClickMap = (lat, lng) => {
    setCurrentPosition({ lat, lng });
    if (userPosition.lat && userPosition.lng) {
      if (route) {
        route.setWaypoints([
          L.latLng(userPosition.lat, userPosition.lng),
          L.latLng(lat, lng),
        ]);
      } else {
        const newRoute = L.Routing.control({
          waypoints: [
            L.latLng(userPosition.lat, userPosition.lng),
            L.latLng(lat, lng),
          ],
          routeWhileDragging: true,
        }).addTo(mapRef.current);
        setRoute(newRoute);
      }
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setCurrentPosition(newPosition);
        if (map) {
          map.setView(newPosition, 13);
        }
      });
    }
  };

  const styles = {
    container: {

      flexDirection: "column",
    },
    mapLabel: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: "1rem 0",
    },
    locationsBox: {
      mt:10,
      display: 'flex',
      flexDirection:'row',
    },
    locationCard: {
      width: '200px',
      margin: '0.3rem',
    },
    locationStack:{
      width:'100%',
      flexWrap:'wrap',

    },
    locationName: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "inherit",
    },
    locationCity:{
      fontSize:12,
      fontFamily: "inherit",
    },
    locationButton:{
      fontFamily:"inherit",

    }
    
  };
  return (
    <Box>
    <Stack sx={styles.locationStack} direction="row">
      {locations.map((location) => (
        <Card key={location.id} sx={styles.locationCard}>
          <CardContent>
            <Typography sx={styles.locationName}>{location.name}</Typography>
            <Typography sx={styles.locationCity}>{location.city}</Typography>
            <Typography sx={styles.locationPhone}>{location.phone}</Typography>
            <Button
              variant="outlined"
              sx={styles.locationButton}
              onClick={() => handleClickMap(location.lat, location.lng)}
            >
              Ver en el Mapa
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
    <MapContainer center={initialPosition} zoom={13} style={mapStyles}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {currentPosition.lat && currentPosition.lng && (
        <>
          <Marker position={[currentPosition.lat, currentPosition.lng]} icon={dealer} />
          <CenterMap position={currentPosition} />
        </>
      )}
      {userPosition.lat && userPosition.lng && (
        <Marker position={[userPosition.lat, userPosition.lng]} icon={mePin} />
      )}
    </MapContainer>
  </Box>
  );
};
