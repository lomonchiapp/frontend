import {getDocs, collection} from 'firebase/firestore';
import {database} from '../firebase';
import { Vehicle } from '@/types/interfaces/vehicle';

// Ahora exportamos la caché para que pueda ser limpiada desde otras partes de la aplicación
export let cachedVehicles: Vehicle[] = [];

// Agregamos un parámetro forceRefresh para forzar la recarga de datos
export const getVehicles = async (forceRefresh = false): Promise<Vehicle[]> => {
    // Si forceRefresh es true, ignoramos la caché
    if (!forceRefresh && cachedVehicles.length > 0) {
        console.log('Usando vehículos del caché en memoria');
        return cachedVehicles;
    }

    if (!forceRefresh) {
        const localStorageVehicles = localStorage.getItem('cachedVehicles');
        if (localStorageVehicles) {
            console.log('Usando vehículos del caché en localStorage');
            cachedVehicles = JSON.parse(localStorageVehicles) as Vehicle[];
            console.log(cachedVehicles)
            return cachedVehicles;
        }
    } else {
        console.log('Forzando recarga de vehículos desde Firebase');
    }

    try {
        const vehiclesCollection = collection(database, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesCollection);
        
        if (vehiclesSnapshot.empty) {
            console.warn('No se encontraron vehículos.');
            cachedVehicles = [];
        } else {
            // Importante: aquí extraemos el ID para que esté disponible en los objetos
            cachedVehicles = vehiclesSnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id  // Aseguramos que el ID siempre esté disponible
                } as Vehicle;
            });
            localStorage.setItem('cachedVehicles', JSON.stringify(cachedVehicles));
        }
        console.log('Vehículos obtenidos del servidor:', cachedVehicles.length)
        return cachedVehicles;
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        return [];
    }
}
