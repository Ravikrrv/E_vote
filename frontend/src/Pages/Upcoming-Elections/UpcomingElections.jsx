import React, { useState, useEffect } from 'react';
import './UpcomingElections.css';
import { fetchElections, addElection, deleteElection } from '../../../utils/electionsapi';

const AdminElections = () => {
    const [elections, setElections] = useState([]);
    const [newElection, setNewElection] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        const getElections = async () => {
            try {
                // Obtain the token from your authentication state or context
                const token = localStorage.getItem('token'); // Example: Fetch token from localStorage

                const fetchedElections = await fetchElections(token);
            setElections(fetchedElections);
            } catch (error) {
                console.error('Error fetching Elections:', error);
            }
        };

        getElections();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewElection({ ...newElection, [name]: value });
    };

    const handleAddElection = async () => {
        try{
        const token = localStorage.getItem('token');
        const addedElection = await addElection(newElection,token);
        if (addedElection) {
            setElections([addedElection, ...elections]);
            setNewElection({ name: '', description: '' });
        }
    }catch (error) {
        console.error('Error adding Election:', error);
    }
    };

    const handleDeleteElection = async (id) => {
        try{
        const token = localStorage.getItem('token');
        console.log(`Deleting election with ID: ${id}`); // Debug log
        const result = await deleteElection(id,token);
        console.log('Delete result:', result); // Debug log
        if (result && result.message === 'Election deleted successfully') {
            setElections((prevElections) => prevElections.filter((election) => election._id !== id));
            console.log('Updated elections:', elections); // Debug log
        } else {
            console.error('Failed to delete election'); // Debug log
        }
    }
    catch (error) {
        console.error('Error deleting Election:', error);
    }
    };

    return (
        <div className="admin-elections-container">
            <h2 className="upcoming-elections">Upcoming Elections</h2>
            <div className="elections-list">
                {elections.map((election) => (
                    <div key={election._id} className="election-card">
                        <h3>{election.name}</h3>
                        <p>{election.description}</p>
                        <button className="upcoming-button" onClick={() => handleDeleteElection(election._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <h2 className="manage-elections">Manage Elections</h2>
            <div className="election-form">
                <input
                    type="text"
                    name="name"
                    value={newElection.name}
                    onChange={handleChange}
                    placeholder="Election Name"
                    required
                />
                <textarea
                    name="description"
                    value={newElection.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                ></textarea>
                <button className="upcoming-election-button" onClick={handleAddElection}>Add Election</button>
            </div>
        </div>
    );
};

export default AdminElections;
