import axios from 'axios';

const API_BASE_URL = 'https://ecub-baackend.vercel.app';

export const sendMessage = async (message) => {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });
    return response.json();
};

export const getPopularItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/popular-items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular items:', error);
        throw error;
    }
};

export const getPersonalizedRecommendations = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/api/personalized-recommendations`, {
        params: { query }
    });
    return response.data;
};

export const fetchPopularItems = async () => {
    const response = await fetch(`${API_BASE_URL}/api/popular-items`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular items');
    }
    return response.json();
};