import {getDocs, collection} from 'firebase/firestore';
import {database} from '../firebase';
import {Category} from '@/types/types';

export const getCategories = async (): Promise<Category[]> => {
    try {
        const categoriesCollection = collection(database, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        return categoriesSnapshot.docs.map(doc => doc.data() as Category);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
}