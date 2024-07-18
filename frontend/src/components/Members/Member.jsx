import React from 'react';
import './Member.css'; // Import CSS for styling (create this file)

const Member = ({ department, member, image }) => {
    return (
        <div className="organizing-member-card">
            <img src={image} alt={member} className="member-image" />
            <h3>{department}</h3>
            <p>{member}</p>
        </div>
    );
};

export default Member;
