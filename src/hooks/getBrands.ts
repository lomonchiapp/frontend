import {getDocs, collection} from 'firebase/firestore';
import {database} from '../firebase';
import {Brand} from '@/types';

export const getBrands = async (): Promise<Brand[]> => {
    try {
        const brandsCollection = collection(database, 'brands');
        const brandsSnapshot = await getDocs(brandsCollection);
        
        if (brandsSnapshot.empty) {
            console.warn('No se encontraron marcas.');
            return [];
        }

        return brandsSnapshot.docs.map(doc => doc.data() as Brand);
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
        return [];
    }
}