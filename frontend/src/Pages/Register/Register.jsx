import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../assets/register.png';
import axios from 'axios'

const Register = () => {
    const [formData, setFormData] = useState({
        role: 'user',
        adminPasskey: '',
        name: '',
        dob: '',
        adhar: '',
        voterId: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // await axios.post('http://localhost:3000/api/log-registration', {
            //     userId: data._id,
            //     dateTime: new Date().toISOString(),
            //     location: 'Your Location' // Replace with actual location data if available
            // });

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data._id);

            // Navigate based on user role
            if (formData.role === 'admin') {
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                navigate('/users'); // Redirect to user dashboard
            }
        } catch (error) {
            setError(error.message || 'Registration failed');
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleInputChange} required>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    {formData.role === 'admin' && (
                        <div className="form-group">
                            <label htmlFor="adminPasskey">Admin Pass Key</label>
                            <input
                                type="password"
                                id="adminPasskey"
                                name="adminPasskey"
                                value={formData.adminPasskey}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adhar">Adhar Card Number</label>
                        <input
                            type="text"
                            id="adhar"
                            name="adhar"
                            value={formData.adhar}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="voterId">Voter ID Card Number</label>
                        <input
                            type="text"
                            id="voterId"
                            name="voterId"
                            value={formData.voterId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Id</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Register</button>
                </form>
                <p>Already registered? <span onClick={() => navigate('/login')} className="login-link">Login here</span>.</p>
            </div>
            <div className="register-image">
                <img src={logo} alt="Register" />
            </div>
        </div>
    );
};

export default Register;
