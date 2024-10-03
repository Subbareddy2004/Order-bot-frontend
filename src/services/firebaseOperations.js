import { db, collection, getDocs } from './firebase';

export const fetchMenuItems = async () => {
    const menuSnapshot = await getDocs(collection(db, 'fs_food_items'));
    return menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchHotels = async () => {
    const hotelsSnapshot = await getDocs(collection(db, 'fs_hotels'));
    return hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};