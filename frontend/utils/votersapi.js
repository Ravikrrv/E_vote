// src/api.js
import axios from 'axios';
const API_URL = 'http://localhost:3000/api/auth/users';
const fetchAuthToken = () => {
    // Example: Fetch token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return token;
};

const fetchVoters = async (token) => {
    const token1=fetchAuthToken();
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-auth-token': token1
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error fetching voters:', error);
        return [];
    }
};



export { fetchVoters };
