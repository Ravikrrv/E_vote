// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/elections';

const fetchAuthToken = () => {
    // Example: Fetch token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return token;
};

const fetchElections = async (token) => {
    const token1 = fetchAuthToken();
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-auth-token': token1
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error fetching elections:', error);
        return [];
    }
};

const addElection = async (election,token) => {
    const token2 = fetchAuthToken();
    try {
        // const response = await fetch('http://localhost:3000/api/elections', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(election)
        // });
        const response = await axios.post(API_URL, election, {
            headers: {
                'x-auth-token': token2
            }
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error adding election:', error);
        return null;
    }
};

const deleteElection = async (id,token) => {
    const token3 = fetchAuthToken();
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'x-auth-token': token3
            }
        });
        const info = await response.data;
        return info;
    } catch (error) {
        console.error('Error deleting election:', error);
        return null;
    }
};

export { fetchElections, addElection, deleteElection };
