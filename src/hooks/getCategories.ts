import {getDocs, collection} from 'firebase/firestore';
import {database} from '../firebase';
import {VehicleCategory} from '@/types/interfaces/vehicle';

export const getCategories = async (): Promise<VehicleCategory[]> => {
    try {
        const categoriesCollection = collection(database, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        return categoriesSnapshot.docs.map(doc => doc.data() as VehicleCategory);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
}