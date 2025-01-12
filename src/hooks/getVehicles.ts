import {getDocs, collection} from 'firebase/firestore';
import {database} from '../firebase';
import { Vehicle } from '@/types/types';

let cachedVehicles: Vehicle[] = [];

export const getVehicles = async (): Promise<Vehicle[]> => {
    if (cachedVehicles.length > 0) {
        console.log('Usando vehículos del caché en memoria');
        return cachedVehicles;
    }

    const localStorageVehicles = localStorage.getItem('cachedVehicles');
    if (localStorageVehicles) {
        console.log('Usando vehículos del caché en localStorage');
        cachedVehicles = JSON.parse(localStorageVehicles) as Vehicle[];
        console.log(cachedVehicles)
        return cachedVehicles;
    }

    try {
        const vehiclesCollection = collection(database, 'vehicles');
        const vehiclesSnapshot = await getDocs(vehiclesCollection);
        
        if (vehiclesSnapshot.empty) {
            console.warn('No se encontraron vehículos.');
            cachedVehicles = [];
        } else {
            cachedVehicles = vehiclesSnapshot.docs.map(doc => doc.data() as Vehicle);
            localStorage.setItem('cachedVehicles', JSON.stringify(cachedVehicles));
        }
        console.log('Vehículos obtenidos del servidor')
        console.log(cachedVehicles)
        return cachedVehicles;
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        return [];
    }
}
