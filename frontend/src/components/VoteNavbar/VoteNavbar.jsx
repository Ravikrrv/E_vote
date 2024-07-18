import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VoteNavbar.css';
import logo from '../../assets/logoc.png'; // Replace with your logo
import axios from 'axios';

const VoteNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        
        const token = localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        axios.post('http://localhost:3000/api/auth/logout', { userId }, {
            headers: {
                Authorization: `x-auth-token ${token}`
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('votedAt');
        navigate('/');
    };

    const handleDashboard=()=>{
        navigate('/users');
    };

    return (
        <nav className="vote-navbar">
            <div className="navbar-left">
                <img src={logo} alt="Organization Logo" className="navbar-logo" />
                <h1>Organizing Community</h1>
            </div>
            <div className="navbar-right">
                <Link to="/users" className="Dashboard-button">Dashboard</Link>
                <Link to="/users/edit-profile" className="navbar-link">Edit Profile</Link>
                <Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link>
            </div>
        </nav>
    );
};

export default VoteNavbar;