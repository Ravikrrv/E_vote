import React, { useState, useEffect } from 'react';
import './Candidates.css';
import { fetchCandidates, addCandidate, deleteCandidate } from '../../../utils/candidatesapi';
import logo from '../../assets/logoc.png';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState({
        name: '',
        profilePicture: '',
        partyName: '',
        partyLogo: ''
    });

    useEffect(() => {
        const getCandidatesData = async () => {
            try {
                // Obtain the token from your authentication state or context
                const token = localStorage.getItem('token'); // Example: Fetch token from localStorage

                const fetchedCandidates = await fetchCandidates(token);
                setCandidates(fetchedCandidates);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        getCandidatesData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewCandidate({ ...newCandidate, [name]: reader.result });
        };
        reader.readAsDataURL(files[0]);
    };

    const handleAddCandidate = async () => {
        try {
            const token = localStorage.getItem('token'); // Example: Fetch token from localStorage

            const addedCandidate = await addCandidate(newCandidate, token);
            if (addedCandidate) {
                setCandidates([...candidates, addedCandidate]);
                setNewCandidate({ name: '', profilePicture: '', partyName: '', partySymbol: '' });
            }
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    const handleDeleteCandidate = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Example: Fetch token from localStorage

            const result = await deleteCandidate(id, token);
            if (result && result.message === 'Candidate deleted') {
                setCandidates(candidates.filter((candidate) => candidate._id !== id));
            }
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };

    return (
        <div>
            <div className="candidate-list">
                {candidates.map((candidate) => (
                    <div key={candidate._id} className="candidate-card">
                        <img src={logo} alt={candidate.name} />
                        <h3>{candidate.name}</h3>
                        <p className="party-name">Party: {candidate.partyName}</p>
                        <img src={logo} alt={candidate.partyName} />
                        <button className="candidate-button" onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <h2 className="manage-candidates">Manage Candidates</h2>
            <div className="candidate-form">
                <input
                    type="text"
                    name="name"
                    value={newCandidate.name}
                    onChange={handleChange}
                    placeholder="Candidate Name"
                    required
                />
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="text"
                    name="partyName"
                    value={newCandidate.partyName}
                    onChange={handleChange}
                    placeholder="Party Name"
                    required
                />
                <input
                    type="file"
                    name="partySymbol"
                    onChange={handleFileChange}
                    required
                />
                <button onClick={handleAddCandidate}>Add Candidate</button>
            </div>
        </div>
    );
};

export default Candidates;
