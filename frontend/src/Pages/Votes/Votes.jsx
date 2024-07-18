import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Votes.css';
import logo from '../../assets/logoc.png';
import VoteNavbar from '../../components/VoteNavbar/VoteNavbar'
import { fetchCandidates } from '../../../utils/candidatesapi';
import {useParams } from 'react-router-dom';

const VotePage = () => {
    const [hasVoted, setHasVoted] = useState(false);
    const [votedAt, setVotedAt] = useState(null);
    const [totalCandidates,setTotalCandidates]=useState([]);
    const { electionId } =useParams();
    // console.log(electionId);

    useEffect(() => {
        const lastVotedAt = localStorage.getItem('votedAt');
        if (lastVotedAt) {
            const lastVotedDate = new Date(lastVotedAt);
            const currentDate = new Date();
            const diffInDays = (currentDate - lastVotedDate) / (1000);
            if (diffInDays <7) {
                setHasVoted(true);
                setVotedAt(lastVotedAt);
            } else {
                localStorage.removeItem('votedAt');
            }
        }
    }, []);

    useEffect(() => {
        const getCandidatesData = async () => {
            try {
                const token = localStorage.getItem('token');
                const totalCandidates = await fetchCandidates(token);
                console.log(totalCandidates);
                setTotalCandidates(totalCandidates);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        getCandidatesData();
    }, []);

    // const handleVote = (candidateId) => {
    //     if (!hasVoted) {
    //         localStorage.setItem('votedAt', new Date().toISOString());
    //         setHasVoted(true);
    //         setVotedAt(new Date().toISOString());
    //         alert(`You have voted for candidate ${candidateId}`);
    //         // Handle the actual voting logic here (e.g., send data to server)
    //     } else {
    //         alert('You have already voted. You can vote again after 7 days.');
    //     }
    // };

    const handleVote = async (candidateId) => {
        if (!hasVoted) {
            try {
                const token=localStorage.getItem('token');
                const response = await axios.post('http://localhost:3000/api/votes',{
                    candidateId: candidateId,
                    userId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
                    electionId:electionId,
                    votedAt: new Date().toISOString()
                },{
                    headers: {
                        'x-auth-token': token
                    }
                });
    
                if (response.status === 201) {
                    localStorage.setItem('votedAt', new Date().toISOString());
                    setHasVoted(true);
                    setVotedAt(new Date().toISOString());
                    totalCandidates.forEach(can=>{
                        if(candidateId===can._id){
                            alert(`You have voted for candidate ${can.name}`);
                            return ;
                        }
                    })
                } else {
                    alert('There was an issue with your vote. Please try again.');
                }
            } catch (error) {
                console.error('Error voting:', error);
                alert('There was an error with your vote. Please try again.');
            }
        } else {
            alert('You have already voted. You can vote again after 7 days.');
        }
    };

    return (
        <>
        <VoteNavbar/>
        <div className="vote-page">
            <h1>Vote for Your Candidate</h1>
            <div className="candidates-list">
                {totalCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                        <img src={logo} alt={candidate.name} className="candidate-image" />
                        <div className="candidate-details">
                            <h3>{candidate.name}</h3>
                            <p>Party: {candidate.partyName}</p>
                            <img src={logo} alt={`${candidate.partyName} Symbol`} className="party-symbol" />
                        </div>
                        <button className="vote-button" onClick={() => handleVote(candidate._id)} disabled={hasVoted}>
                            {hasVoted ? 'Already Voted' : 'Vote'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default VotePage;
