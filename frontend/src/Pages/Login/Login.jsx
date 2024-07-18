import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/login.png';
import axios from 'axios';

const Login = () => {
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [adminPasskey, setAdminPassKey] = useState('');
    const [email, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [adhar, setAdhar] = useState('');
    const [voterId, setVoterId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role, adminPasskey, email, password, adhar, voterId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

               
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data._id);
        //     const userId = localStorage.getItem('userId');
        // if (!userId) {
        //     throw new Error('User ID not found in localStorage');
        // }

        //     await axios.post('http://localhost:3000/api/log-registration', {
        //         userId,
        //         dateTime: new Date().toISOString(),
        //         location: 'Your Location' // Replace with actual location data if available
        //     });

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/users');
            }
        } catch (error) {
            setError(error.message);
            console.error('Login error:', error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    {role === 'admin' && (
                        <div className="form-group">
                            <label htmlFor="adminPassKey">Admin Pass Key</label>
                            <input
                                type="password"
                                id="adminPassKey"
                                name="adminPasskey"
                                value={adminPasskey}
                                onChange={(e) => setAdminPassKey(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email Id</label>
                        <input
                            type="email"
                            id="emailId"
                            name="email"
                            value={email}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adhar">Adhar Card Number</label>
                        <input
                            type="text"
                            id="adhar"
                            name="adhar"
                            value={adhar}
                            onChange={(e) => setAdhar(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="voterId">Voter ID Card Number</label>
                        <input
                            type="text"
                            id="voterId"
                            name="voterId"
                            value={voterId}
                            onChange={(e) => setVoterId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
            </div>
            <div className="login-image">
                <img src={logo} alt="Login" />
            </div>
        </div>
    );
};

export default Login;
