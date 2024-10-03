import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const sendMessage = async (message) => {
    const response = await axios.post(`${API_BASE_URL}/chat`, { message });
    return {
        message: response.data.message,
        recommendations: response.data.recommendations || []
    };
};

export const getPopularItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/popular-items`);
    return response.data;
};

export const getPersonalizedRecommendations = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/personalized-recommendations`, {
        params: { query }
    });
    return response.data;
};

export const fetchPopularItems = async () => {
    const response = await fetch(`${API_BASE_URL}/popular-items`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular items');
    }
    return response.json();
};