import axios from 'axios';

const API_URL = 'http://localhost:3000/api/votes';

const fetchAuthToken = () => {
    // Example: Fetch token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return token;
};

const fetchVotes = async (token) => {
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

const addVotes = async (votes,token) => {
    const token2 = fetchAuthToken();
    try {
        const response = await axios.post(API_URL, votes, {
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

export { fetchVotes, addVotes };