import React from 'react';
import './Home.css'; // Importing Home.css for general page styling
import logo from '../../assets/logoc.png';
import Card from '../../components/Card/Card'
import Member from '../../components/Members/Member'
import Footer from '../../components/Footer/Footer'
const Home = () => {

    const organizingMembers = [
        {
            department: 'IT Department',
            member: 'John Doe',
            image: logo,
        },
        {
            department: 'HR Department',
            member: 'Emily Brown',
            image: logo,
        },
        {
            department: 'Finance Department',
            member: 'David Lee',
            image: logo,
        },
    ];

    return (
        <div className="home-container">
            {/* Image with description */}
            <div className="community-info-section">
                <img src={logo} alt="Organizing Community" className="community-image" />
                <div className="community-description">
                    <h2>Welcome to Our Community</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Venenatis urna cursus eget nunc scelerisque. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Egestas sed tempus urna et pharetra pharetra massa massa. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Ac tincidunt vitae semper quis lectus nulla at. Dignissim sodales ut eu sem. A pellentesque sit amet porttitor. Feugiat vivamus at augue eget arcu dictum varius duis at. Felis imperdiet proin fermentum leo vel orci. Eget aliquet nibh praesent tristique magna sit. Amet volutpat consequat mauris nunc congue. Arcu dui vivamus arcu felis bibendum. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Pulvinar neque laoreet suspendisse interdum consectetur libero. At augue eget arcu dictum varius duis. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Donec et odio pellentesque diam. Aliquet enim tortor at auctor urna nunc id cursus metus. Non consectetur a erat nam at lectus urna duis. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Dis parturient montes nascetur ridiculus mus mauris vitae. At lectus urna duis convallis. Amet cursus sit amet dictum sit amet justo. Justo eget magna fermentum iaculis eu non diam phasellus. Bibendum est ultricies integer quis auctor elit sed. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Pharetra pharetra massa massa ultricies mi. Ut venenatis tellus in metus vulputate eu. Pellentesque elit eget gravida cum sociis natoque penatibus et. Feugiat pretium nibh ipsum consequat. Nullam ac tortor vitae purus faucibus ornare. Scelerisque varius morbi enim nunc faucibus a. Pellentesque sit amet porttitor eget. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Quisque sagittis purus sit amet volutpat consequat. Magna eget est lorem ipsum dolor sit. Sed elementum tempus egestas sed sed risus pretium quam vulputate. In egestas erat imperdiet sed euismod nisi porta lorem. Amet massa vitae tortor condimentum lacinia quis vel eros. Etiam non quam lacus suspendisse. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis enim ut tellus elementum. Vestibulum sed arcu non odio euismod lacinia at quis risus. Lobortis elementum nibh tellus molestie nunc non. Semper viverra nam libero justo laoreet sit amet. Id aliquet risus feugiat in.
                    </p>
                </div>
            </div>

            {/* Other content of your home page */}
            
            {/* Footer section */}
            <div className="feature-header">Features we Offer</div>
            <div className="feature-cards">
                <Card
                    title="Secure Voting"
                    description="Encrypted and secure voting process to ensure data integrity."
                    //icon={logo}
                />
                <Card
                    title="User-Friendly Interface"
                    description="Intuitive interface for easy navigation and voting experience."
                    //icon={logo}
                />
                <Card
                    title="Real-Time Results"
                    description="Instantaneous tabulation and display of voting results."
                    //icon={logo}
                />
            </div>
            <div className="Header-members">MEMBERS</div>
            <div className="organizing-members">
                {organizingMembers.map((memberData, index) => (
                    <Member
                        key={index}
                        department={memberData.department}
                        member={memberData.member}
                        image={memberData.image}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
