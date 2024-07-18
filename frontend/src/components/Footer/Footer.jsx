import React, { useState } from 'react';
import './Footer.css'; // Importing CSS for styling
import logo from '../../assets/logoc.png'; // Replace with your logo
import axios from 'axios'; // Import axios for HTTP requests

const Footer = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/message/send', formData);
            console.log(response.data);
            // Handle success (e.g., show a success message, clear form, etc.)
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={logo} alt="Organizing Community Logo" className="footer-logo" />
                    <div className="community-info">
                        <h3>Organizing Community</h3>
                        <p>Empowering secure and transparent voting processes.</p>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="query-form">
                        <h3>Send Us a Query</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group2">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group2">
                                <label htmlFor="email">Email ID</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group2">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button className="footer-button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
