// import React from 'react';
// import './Dashboard.css'; // Importing the CSS file
// import { useNavigate } from 'react-router-dom';
// import userIcon from '../../assets/logoc.png'; // Replace with your user icon
// import VoteNavbar from '../../components/VoteNavbar/VoteNavbar';

// const UserDetailsPage = ({ user }) => {
//     const navigate = useNavigate();

//     const handleVoteClick = (electionId) => {
//         navigate(`/users/vote/${electionId}`);
//     };

//     const upcomingElections = [
//         { id: 1, name: 'Presidential Election' },
//         { id: 2, name: 'Senate Election' },
//         { id: 3, name: 'Local Council Election' },
//         // Add more elections as needed
//     ];

//   return (
//     <>
//     <VoteNavbar/>
//     <div className="user-details-page">
//       <div className="user-details-container">
//         <div className="user-details-card">
//           <img src={userIcon} alt="User Icon" className="user-icon" />
//           <h2>User Details</h2>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Date of Birth:</strong> {user.dob}</p>
//           <p><strong>Email ID:</strong> {user.email}</p>
//           <p><strong>Adhar Card Number:</strong> {user.adhar}</p>
//           <p><strong>Voter ID Card Number:</strong> {user.voterId}</p>
//         </div>
//         <div className="info-section">
//           <div className="rights-description">
//             <h2>Fundamental Rights to Vote</h2>
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu non. Vitae et leo duis ut diam quam nulla. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Sed vulputate mi sit amet mauris commodo quis imperdiet. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Vitae proin sagittis nisl rhoncus mattis. Vel pharetra vel turpis nunc eget lorem dolor. Habitasse platea dictumst vestibulum rhoncus est. Nibh cras pulvinar mattis nunc sed blandit libero. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ultricies mi quis hendrerit dolor magna eget est lorem. Posuere morbi leo urna molestie at elementum. At consectetur lorem donec massa sapien. Egestas integer eget aliquet nibh praesent tristique magna sit. Mattis enim ut tellus elementum sagittis. Laoreet id donec ultrices tincidunt. Sed vulputate odio ut enim blandit volutpat. Dignissim enim sit amet venenatis urna. Augue neque gravida in fermentum et. Sit amet aliquam id diam maecenas. Ornare arcu odio ut sem nulla. Elementum facilisis leo vel fringilla. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. In hac habitasse platea dictumst vestibulum rhoncus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Nunc mi ipsum faucibus vitae aliquet nec. Vitae tempus quam pellentesque nec nam. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Vestibulum lorem sed risus ultricies tristique. Pellentesque id nibh tortor id aliquet lectus proin nibh. Hendrerit dolor magna eget est lorem ipsum. Eros donec ac odio tempor orci dapibus ultrices in iaculis. Curabitur gravida arcu ac tortor dignissim. Cras semper auctor neque vitae tempus quam. Pellentesque habitant morbi tristique senectus et netus. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Eget gravida cum sociis natoque penatibus et magnis dis. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Ac orci phasellus egestas tellus rutrum tellus. Mauris sit amet massa vitae tortor. Ornare lectus sit amet est placerat in. Purus viverra accumsan in nisl nisi. Bibendum at varius vel pharetra vel. Mi eget mauris pharetra et ultrices neque. Quis hendrerit dolor magna eget est. Odio euismod lacinia at quis risus sed.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="upcoming-elections">
//                 <h2>Upcoming Elections</h2>
//                 {upcomingElections.map((election) => (
//                     <div key={election.id} className="election-card">
//                         <h3>{election.name}</h3>
//                         <button onClick={() => handleVoteClick(election.id)}>Vote</button>
//                     </div>
//                 ))}
//         </div>
//     </div>
//     </>
//   );
// };

// const ElectionCard = ({ election }) => {
//   const handleVoteClick = () => {
//     // Handle vote click, redirect to the voting page
//     console.log(`Voting in ${election}`);
//     // Add redirection logic here
//   };

//   return (
//     <div className="election-card">
//       <h3>{election}</h3>
//       <button onClick={handleVoteClick}>Vote</button>
//     </div>
//   );
// };

// export default UserDetailsPage;






// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css'; // Importing the CSS file
// import userIcon from '../../assets/logoc.png'; // Replace with your user icon
// import VoteNavbar from '../../components/VoteNavbar/VoteNavbar';
// import axios from 'axios'; // Add axios for making API calls

// const UserDetailsPage = ({ user }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/');
//             return;
//         }

//         const fetchUserDetails = async () => {
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 };

//                 const response = await axios.get('/api/users/details', config);
//                 // Handle the response, set user details in state if needed
//             } catch (error) {
//                 console.error(error);
//                 if (error.response.status === 401 || error.response.status === 403) {
//                     navigate('/');
//                 }
//             }
//         };

//         fetchUserDetails();
//     }, [navigate]);

//     const handleVoteClick = (electionId) => {
//         navigate(`/users/vote/${electionId}`);
//     };

//     const upcomingElections = [
//         { id: 1, name: 'Presidential Election' },
//         { id: 2, name: 'Senate Election' },
//         { id: 3, name: 'Local Council Election' },
//         // Add more elections as needed
//     ];

//     return (
//         <>
//             <VoteNavbar />
//             <div className="user-details-page">
//                 <div className="user-details-container">
//                     <div className="user-details-card">
//                         <img src={userIcon} alt="User Icon" className="user-icon" />
//                         <h2>User Details</h2>
//                         <p><strong>Name:</strong> {user.name}</p>
//                         <p><strong>Date of Birth:</strong> {user.dob}</p>
//                         <p><strong>Email ID:</strong> {user.email}</p>
//                         <p><strong>Adhar Card Number:</strong> {user.adhar}</p>
//                         <p><strong>Voter ID Card Number:</strong> {user.voterId}</p>
//                     </div>
//                     <div className="info-section">
//                         <div className="rights-description">
//                             <h2>Fundamental Rights to Vote</h2>
//                             <p>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu non. Vitae et leo duis ut diam quam nulla. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Sed vulputate mi sit amet mauris commodo quis imperdiet. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Vitae proin sagittis nisl rhoncus mattis. Vel pharetra vel turpis nunc eget lorem dolor. Habitasse platea dictumst vestibulum rhoncus est. Nibh cras pulvinar mattis nunc sed blandit libero. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ultricies mi quis hendrerit dolor magna eget est lorem. Posuere morbi leo urna molestie at elementum. At consectetur lorem donec massa sapien. Egestas integer eget aliquet nibh praesent tristique magna sit. Mattis enim ut tellus elementum sagittis. Laoreet id donec ultrices tincidunt. Sed vulputate odio ut enim blandit volutpat. Dignissim enim sit amet venenatis urna. Augue neque gravida in fermentum et. Sit amet aliquam id diam maecenas. Ornare arcu odio ut sem nulla. Elementum facilisis leo vel fringilla. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. In hac habitasse platea dictumst vestibulum rhoncus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Nunc mi ipsum faucibus vitae aliquet nec. Vitae tempus quam pellentesque nec nam. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Vestibulum lorem sed risus ultricies tristique. Pellentesque id nibh tortor id aliquet lectus proin nibh. Hendrerit dolor magna eget est lorem ipsum. Eros donec ac odio tempor orci dapibus ultrices in iaculis. Curabitur gravida arcu ac tortor dignissim. Cras semper auctor neque vitae tempus quam. Pellentesque habitant morbi tristique senectus et netus. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Eget gravida cum sociis natoque penatibus et magnis dis. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Ac orci phasellus egestas tellus rutrum tellus. Mauris sit amet massa vitae tortor. Ornare lectus sit amet est placerat in. Purus viverra accumsan in nisl nisi. Bibendum at varius vel pharetra vel. Mi eget mauris pharetra et ultrices neque. Quis hendrerit dolor magna eget est. Odio euismod lacinia at quis risus sed.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="upcoming-elections">
//                     <h2>Upcoming Elections</h2>
//                     {upcomingElections.map((election) => (
//                         <div key={election.id} className="election-card">
//                             <h3>{election.name}</h3>
//                             <button onClick={() => handleVoteClick(election.id)}>Vote</button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// const ElectionCard = ({ election }) => {
//     const handleVoteClick = () => {
//         // Handle vote click, redirect to the voting page
//         console.log(`Voting in ${election}`);
//         // Add redirection logic here
//     };

//     return (
//         <div className="election-card">
//             <h3>{election}</h3>
//             <button onClick={handleVoteClick}>Vote</button>
//         </div>
//     );
// };

// export default UserDetailsPage;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importing the CSS file
import userIcon from '../../assets/logoc.png'; // Replace with your user icon
import VoteNavbar from '../../components/VoteNavbar/VoteNavbar';
import axios from 'axios'; // Add axios for making API calls
import { fetchElections } from '../../../utils/electionsapi';
import { fetchVoters } from '../../../utils/votersapi';

const UserDetailsPage = () => {


     const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [upcomingElections, setUpcomingElections] = useState([]);


    useEffect(() => {

        const token=localStorage.getItem('token');
     if(!token){
        navigate('/');
        return ;
     }

        const getVoters = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId=localStorage.getItem('userId');
                const totalVoters = await fetchVoters(token);
                // console.log(totalVoters);
                
                totalVoters.forEach(element => {
                    if(element._id===userId)
                    {
                        //console.log(element);
                        setUser(element);
                        return ;
                    }
                });
                
            } catch (error) {
                console.error('Error fetching voters:', error);
            }
        };

        getVoters();
    }, []);
      
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
                setUpcomingElections(electionData);
            } catch (error) {
                console.error('Error fetching Elections:', error);
            }
        };

        getElections();
    }, []);

    const handleVoteClick = (electionId) => {
        navigate(`/users/vote/${electionId}`);
    };

    function extractDate(datetimeString) {
        const date = new Date(datetimeString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    

    return (
        <>
            <VoteNavbar />
            <div className="user-details-page">
                <div className="user-details-container">
                    <div className="user-details-card">
                        <img src={userIcon} alt="User Icon" className="user-icon" />
                        <h2>User Details</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Date of Birth:</strong> {extractDate(user.dob)}</p>
                        <p><strong>Email ID:</strong> {user.email}</p>
                        <p><strong>Adhar Card Number:</strong> {user.adhar}</p>
                        <p><strong>Voter ID Card Number:</strong> {user.voterId}</p>
                    </div>
                    <div className="info-section">
                        <div className="rights-description">
                            <h2>Fundamental Rights to Vote</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu non. Vitae et leo duis ut diam quam nulla. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Sed vulputate mi sit amet mauris commodo quis imperdiet. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Vitae proin sagittis nisl rhoncus mattis. Vel pharetra vel turpis nunc eget lorem dolor. Habitasse platea dictumst vestibulum rhoncus est. Nibh cras pulvinar mattis nunc sed blandit libero. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ultricies mi quis hendrerit dolor magna eget est lorem. Posuere morbi leo urna molestie at elementum. At consectetur lorem donec massa sapien. Egestas integer eget aliquet nibh praesent tristique magna sit. Mattis enim ut tellus elementum sagittis. Laoreet id donec ultrices tincidunt. Sed vulputate odio ut enim blandit volutpat. Dignissim enim sit amet venenatis urna. Augue neque gravida in fermentum et. Sit amet aliquam id diam maecenas. Ornare arcu odio ut sem nulla. Elementum facilisis leo vel fringilla. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. In hac habitasse platea dictumst vestibulum rhoncus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Nunc mi ipsum faucibus vitae aliquet nec. Vitae tempus quam pellentesque nec nam. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Vestibulum lorem sed risus ultricies tristique. Pellentesque id nibh tortor id aliquet lectus proin nibh. Hendrerit dolor magna eget est lorem ipsum. Eros donec ac odio tempor orci dapibus ultrices in iaculis. Curabitur gravida arcu ac tortor dignissim. Cras semper auctor neque vitae tempus quam. Pellentesque habitant morbi tristique senectus et netus. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Eget gravida cum sociis natoque penatibus et magnis dis. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Ac orci phasellus egestas tellus rutrum tellus. Mauris sit amet massa vitae tortor. Ornare lectus sit amet est placerat in. Purus viverra accumsan in nisl nisi. Bibendum at varius vel pharetra vel. Mi eget mauris pharetra et ultrices neque. Quis hendrerit dolor magna eget est. Odio euismod lacinia at quis risus sed.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="upcoming-elections">
                    <h2>Upcoming Elections</h2>
                    {upcomingElections.map((election) => (
                        <div key={election.id} className="election-card">
                            <h3>{election.name}</h3>
                            <button onClick={() => handleVoteClick(election._id)}>Vote</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserDetailsPage;



