import axios from 'axios';

const API_URL = 'http://localhost:3000/api/candidates';

const fetchAuthToken = () => {
    // Example: Fetch token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return token;
};

// Fetch all candidates
export const fetchCandidates = async (token) => {
    const token1 = fetchAuthToken();
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-auth-token': token1
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

// Add a new candidate
export const addCandidate = async (newCandidate, token) => {
    const token2 = fetchAuthToken();
    try {
        const response = await axios.post(API_URL, newCandidate, {
            headers: {
                'x-auth-token': token2
            }
        });
        return response.data.candidate;
    } catch (error) {
        console.error('Error adding candidate:', error);
        throw error;
    }
};

// Delete a candidate
export const deleteCandidate = async (id, token) => {
    const token3 = fetchAuthToken();
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'x-auth-token': token3
            }
        });
        return { message: 'Candidate deleted' };
    } catch (error) {
        console.error('Error deleting candidate:', error);
        throw error;
    }
};
