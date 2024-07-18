// import React, { useEffect, useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';
// import logo from '../../assets/logoc.png';
// import { Chart as Chartjs } from 'chart.js/auto';
// import { Bar, Doughnut } from 'react-chartjs-2';

// const Admin = () => {
//     const navigate = useNavigate();
//     const [totalCandidates, setTotalCandidates] = useState(0);
//     const [totalVoters, setTotalVoters] = useState(0);
//     const [selectedElection, setSelectedElection] = useState('');
//     const [electionData, setElectionData] = useState([]);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//     useEffect(() => {
//         // Fetch total number of candidates and voters
//         // Replace these with actual API calls
//         setTotalCandidates(10); // Example: Fetch total candidates
//         setTotalVoters(100); // Example: Fetch total voters

//         // Fetch election data
//         // Replace with actual API call
//         setElectionData([
//             { id: 'election1', name: 'Election 1' },
//             { id: 'election2', name: 'Election 2' },
//             { id: 'election3', name: 'Election 3' },
//         ]);
//     }, []);

//     useEffect(() => {
//         if (selectedElection) {
//             // Fetch election data based on the selected election
//             // Replace this with an actual API call
//             const fetchData = async () => {
//                 // Simulating an API call with static data
//                 let data;
//                 if (selectedElection === 'election1') {
//                     data = { labels: ["Party A", "Party B", "Party C"], votes: [40, 20, 30] };
//                 } else if (selectedElection === 'election2') {
//                     data = { labels: ["Party A", "Party B", "Party C"], votes: [25, 35, 40] };
//                 } else if (selectedElection === 'election3') {
//                     data = { labels: ["Party A", "Party B", "Party C"], votes: [30, 40, 20] };
//                 }
//                 setChartData({
//                     labels: data.labels,
//                     datasets: [{
//                         label: 'Votes',
//                         data: data.votes,
//                         backgroundColor: [
//                             "rgba(112, 146, 129, 0.5)",
//                             "rgba(88, 113, 129, 0.3)",
//                             "rgba(88, 128, 136, 0.9)",
//                         ],
//                     }]
//                 });
//             };

//             fetchData();
//         }
//     }, [selectedElection]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/');
//     };

//     const handleElectionChange = (e) => {
//         setSelectedElection(e.target.value);
//     };

//     return (
//         <div className="admin-dashboard">
//             <div className="sidebar">
//                 <div className="sidebar-logo">
//                     <img src={logo} alt="Logo" />
//                     <h1>Admin Panel</h1>
//                 </div>
//                 <ul className="sidebar-links">
//                     <li><Link to="votes">Voters</Link></li>
//                     <li><Link to="candidates">Candidates</Link></li>
//                     <li><Link to="upcoming-elections">Upcoming Elections</Link></li>
//                     <li><button onClick={handleLogout}>Logout</button></li>
//                 </ul>
//             </div>
//             <div className="main-content">
//                 <div className="stats-container">
//                     <div className="stats-card">
//                         <h2>Total Candidates</h2>
//                         <p>{totalCandidates}</p>
//                     </div>
//                     <div className="stats-card">
//                         <h2>Total Voters</h2>
//                         <p>{totalVoters}</p>
//                     </div>
//                 </div>
//                 <div className="election-selection">
//                     <label htmlFor="election">Select Election:</label>
//                     <select id="election" value={selectedElection} onChange={handleElectionChange}>
//                         <option value="">Select</option>
//                         {electionData.map(election => (
//                             <option key={election.id} value={election.id}>{election.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="content">
//                     <Outlet />
//                     <div className="chart-container">
//                         <div className="chart-box">
//                             <Bar
//                                 data={chartData}
//                             />
//                         </div>
//                         <div className="chart-box">
//                             <Doughnut
//                                 data={chartData}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admin;














import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import logo from '../../assets/logoc.png';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchVoters } from '../../../utils/votersapi';
import { fetchCandidates } from '../../../utils/candidatesapi';
import { fetchElections } from '../../../utils/electionsapi';
import { fetchVotes } from '../../../utils/votesapi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Admin = () => {
    const navigate = useNavigate();
    const [totalCandidates, setTotalCandidates] = useState(0);
    const [totalVoters, setTotalVoters] = useState(0);
    const [selectedElection, setSelectedElection] = useState('');
    const [electionData, setElectionData] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    // Fetch total voters on component mount
    useEffect(() => {
        const token=localStorage.getItem('token');
     if(!token){
        navigate('/');
        return ;
     }

        const getVoters = async () => {
            try {
                const token = localStorage.getItem('token');
                const totalVoters = await fetchVoters(token);
                setTotalVoters(totalVoters.length);
            } catch (error) {
                console.error('Error fetching voters:', error);
            }
        };

        getVoters();
    }, []);

    // Fetch total candidates on component mount
    useEffect(() => {
        const token=localStorage.getItem('token');
     if(!token){
        navigate('/');
        return ;
     }

        const getCandidatesData = async () => {
            try {
                const token = localStorage.getItem('token');
                const fetchedCandidates = await fetchCandidates(token);
                setTotalCandidates(fetchedCandidates.length);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        getCandidatesData();
    }, []);

    // Fetch elections on component mount
    useEffect(() => {
        const token=localStorage.getItem('token');
     if(!token){
        navigate('/');
        return ;
     }

        const getElections = async () => {
            try {
                const token = localStorage.getItem('token');
                const electionData = await fetchElections(token);
                //console.log(electionData);
                setElectionData(electionData);
            } catch (error) {
                console.error('Error fetching Elections:', error);
            }
        };

        getElections();
    }, []);

    const handleElectionChange = (e) => {
        //console.log(e.target.value);
        setSelectedElection(e.target.value);
    };

    // Fetch votes for the selected election
    useEffect(() => {
        const token=localStorage.getItem('token');
     if(!token){
        navigate('/');
        return ;
     }
     

        const fetchVotesForElection = async () => {
            if (!selectedElection) return;
        
            const token = localStorage.getItem('token');
            
            try {
                const votes = await fetchVotes(token);
                console.log(votes);
        
                const extractIdValue = (jsonString) => {
                    let idValue = null;
                    if (jsonString) {
                        try {
                            const obj = JSON.parse(jsonString);
                            idValue = obj._id;
                        } catch (error) {
                            console.error("Invalid JSON string:", error);
                        }
                    }
                    return idValue;
                };

                const candidateVoteCounts = {};


                votes.forEach(vote => {
                    const electionId = extractIdValue(JSON.stringify(vote.electionId));
                    const candidateIdStr = JSON.stringify(vote.candidateId);
                    const candidateIdObj = JSON.parse(candidateIdStr);
                    const candidateId = candidateIdObj._id;
        
                    if (electionId === selectedElection) {
                        if (candidateVoteCounts[candidateId]) {
                            candidateVoteCounts[candidateId] += 1;
                        } else {
                            candidateVoteCounts[candidateId] = 1;
                        }
                    }
                });
        
                //console.log(candidateVoteCounts);

                const candidateIds = Object.keys(candidateVoteCounts);
        const voteCounts = Object.values(candidateVoteCounts);

        // Prepare labels for the chart
        const labels = candidateIds.map(id => {
            const candidate = votes.find(vote => {
                const candidateIdObj = JSON.parse(JSON.stringify(vote.candidateId));
                return candidateIdObj._id === id;
            });
            return candidate ? candidate.candidateId.partyName : 'Unknown';
        });

        const data = voteCounts;

        console.log(labels);
        console.log(data);

        setChartData({
            labels: labels.map((label)=>label),
            datasets: [{
                label: 'Votes',
                data: data,
                backgroundColor: [
                    "rgba(112, 146, 129, 0.5)",
                    "rgba(88, 113, 129, 0.3)",
                    "rgba(88, 128, 136, 0.9)",
                    // Add more colors as needed
                ],
            }]
        });


            } catch (error) {
                console.error('Error fetching Votes:', error);
            }
        };
        fetchVotesForElection();
    }, [selectedElection]);

    // Handle logout
    const handleLogout = () => {
        const token = localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        axios.post('http://localhost:3000/api/auth/logout', { userId }, {
            headers: {
                Authorization: `x-auth-token ${token}`
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    };
    

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" />
                    <h1>Admin Panel</h1>
                </div>
                <ul className="sidebar-links">
                    <li><Link to="votes">Voters</Link></li>
                    <li><Link to="candidates">Candidates</Link></li>
                    <li><Link to="upcoming-elections">Upcoming Elections</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="stats-container">
                    <div className="stats-card">
                        <h2>Total Candidates</h2>
                        <p>{totalCandidates}</p>
                    </div>
                    <div className="stats-card">
                        <h2>Total Voters</h2>
                        <p>{totalVoters}</p>
                    </div>
                </div>
                <div className="election-selection">
                    <label htmlFor="election">Select Election:</label>
                    <select id="election" value={selectedElection} onChange={handleElectionChange}>
                        <option value="">Select</option>
                        {electionData.map(election => (
                            <option key={election._id} value={election._id}>{election.name}</option>
                        ))}
                    </select>
                </div>
                <div className="content">
                    <Outlet />
                    <div className="chart-container">
                        <div className="chart-box">
                            <Bar
                                data={chartData}
                            />
                        </div>
                        <div className="chart-box">
                            <Doughnut
                                data={chartData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;





