import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '@/firebase';
import { useGlobalState } from '@/hooks/context/global/useGlobalState';
import { Vehicle, Brand, VehicleCategory } from '@/types/interfaces/vehicle';

// Tipo para campos actualizables en vehículos
export type VehicleUpdateField = 
  | 'name' 
  | 'brand' 
  | 'category' 
  | 'cc' 
  | 'initPrice' 
  | 'salePrice' 
  | 'description' 
  | 'images'
  | 'quantity'
  | 'isInexhaustible';

// Tipo para el valor del campo, que puede ser de diferentes tipos
export type VehicleFieldValue = string | number | Brand | VehicleCategory | string[] | boolean;

export interface UseVehicleUpdateReturn {
  updating: boolean;
  error: string | null;
  updateField: (vehicleId: string, field: VehicleUpdateField, value: VehicleFieldValue) => Promise<void>;
  updateVehicle: (vehicle: Vehicle) => Promise<void>;
}

export const useVehicleUpdate = (): UseVehicleUpdateReturn => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchVehicles } = useGlobalState();

  // Función para limpiar la caché
  const clearVehiclesCache = () => {
    try {
      // Limpia la caché local en localStorage
      localStorage.removeItem('cachedVehicles');
      
      // Intenta acceder a la variable global de caché (definida en getVehicles.ts)
      // y resetearla si está disponible en el scope global
      try {
        // Este enfoque es un hack, pero puede funcionar para limpiar la caché en memoria
        if (window && 'cachedVehicles' in window) {
          (window as any).cachedVehicles = [];
        }
      } catch (e) {
        // Ignorar errores al intentar limpiar la caché en memoria
      }
      
      console.log('Caché de vehículos limpiada completamente');
    } catch (err) {
      console.warn('No se pudo limpiar la caché:', err);
    }
  };

  // Función para esperar un tiempo determinado
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Actualiza un solo campo de un vehículo
  const updateField = async (vehicleId: string, field: VehicleUpdateField, value: VehicleFieldValue): Promise<void> => {
    if (!vehicleId) {
      setError('ID de vehículo no proporcionado');
      return;
    }

    try {
      setUpdating(true);
      setError(null);
      
      const vehicleRef = doc(database, "vehicles", vehicleId);
      const updateData = { [field]: value };
      
      // Actualizamos el documento en Firestore
      await updateDoc(vehicleRef, updateData);
      console.log(`Documento ${vehicleId} actualizado en Firestore:`, updateData);
      
      // Limpiamos la caché antes de refrescar los vehículos
      clearVehiclesCache();
      
      // Pequeño delay para asegurar que Firestore completó la actualización
      await delay(300);
      
      // Refresca la lista de vehículos para reflejar cambios
      await fetchVehicles();
    } catch (err) {
      console.error(`Error al actualizar campo ${field}:`, err);
      setError(`Error al actualizar vehículo: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  // Actualiza un vehículo completo
  const updateVehicle = async (vehicle: Vehicle): Promise<void> => {
    if (!vehicle.id) {
      setError('ID de vehículo no proporcionado');
      return;
    }

    try {
      setUpdating(true);
      setError(null);
      
      const vehicleRef = doc(database, "vehicles", vehicle.id);
      
      // Eliminamos el campo id para evitar errores de actualización
      const { id, ...vehicleData } = vehicle;
      
      // Actualizamos el documento en Firestore
      await updateDoc(vehicleRef, vehicleData);
      console.log(`Documento ${vehicle.id} actualizado en Firestore con datos completos`);
      
      // Limpiamos la caché antes de refrescar los vehículos
      clearVehiclesCache();
      
      // Pequeño delay para asegurar que Firestore completó la actualización
      await delay(300);
      
      // Refresca la lista de vehículos para reflejar cambios
      await fetchVehicles();
    } catch (err) {
      console.error('Error al actualizar vehículo:', err);
      setError(`Error al actualizar vehículo: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updating,
    error,
    updateField,
    updateVehicle
  };
}; 