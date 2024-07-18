import React from 'react';
import './Card.css'; // Import CSS for styling (create this file)

const Card = ({ title, description, icon }) => {
    return (
        <div className="feature-card">
            {/* <div className="icon">
                <img src={icon} alt="Feature Icon" />
            </div> */}
            <div className="content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Card;
