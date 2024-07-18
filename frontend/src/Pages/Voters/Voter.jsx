import React, { useState, useEffect } from 'react';
import './Voter.css';
import logo from '../../assets/logoc.png'
import { fetchVoters } from '../../../utils/votersapi';

const Votes = () => {
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        const getVoters = async () => {
            try{
            const token = localStorage.getItem('token');
            const fetchedVoters = await fetchVoters(token);
            setVoters(fetchedVoters);
            }
            catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        getVoters();
    }, []);

    return (
        <div className="votes-container">
            <h2>Registered Voters</h2>
            <div className="voters-list">
                {voters.map((voter, index) => (
                    <div key={index} className="voter-card">
                        <img src={logo} alt={`${voter.name}'s profile`} className="voter-image" />
                        <div className="voter-details">
                            <h3>{voter.name}</h3>
                            <p><strong>Email:</strong> {voter.email}</p>
                            <p><strong>DOB:</strong> {voter.dob}</p>
                            <p><strong>Voter ID:</strong> {voter.voterId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Votes;
