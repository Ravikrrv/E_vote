import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import axios from 'axios';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        voterId: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if new passwords match
        if (formData.newPassword !== formData.confirmNewPassword) {
            setIsPasswordValid(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect to login if token is not available
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Correctly formatted token
                },
            };

            const response = await axios.put('http://localhost:3000/api/user/edit-profile', formData, config);

            console.log('Profile updated:', response.data);
            navigate('/users'); // Redirect to dashboard page after successful update
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    navigate('/'); // Redirect to login page if unauthorized
                } else {
                    setError(error.response.data.message || 'An error occurred. Please try again.');
                }
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="voterId">Voter ID Card Number</label>
                    <input type="text" id="voterId" name="voterId" value={formData.voterId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input type="password" id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} required />
                </div>
                {!isPasswordValid && <p className="error-message">Passwords do not match. Please try again.</p>}
                {error && <p className="error-message">{error}</p>}
                <button className="edit-profile-button" type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
