import { db, collection, getDocs } from './firebase';

export const fetchMenuItems = async () => {
    const menuSnapshot = await getDocs(collection(db, 'fs_food_items','fs_food_items1'));
    return menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchHotels = async () => {
    const hotelsSnapshot = await getDocs(collection(db, 'fs_hotels'));
    return hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchAllItems = async () => {
    try {
        const itemsCollection = collection(db, 'fs_food_items');
        const itemsSnapshot = await getDocs(itemsCollection);
        return itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching all items:', error);
        throw error;
    }
};