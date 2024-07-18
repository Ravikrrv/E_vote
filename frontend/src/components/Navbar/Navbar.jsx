import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleNavigation('/')}>YourLogo</div>
      <ul className="nav-links">
        <li><a onClick={() => handleNavigation('/')}>Home</a></li>
        <li><a onClick={() => handleNavigation('/register')}>Register</a></li>
        <li><a onClick={() => handleNavigation('/login')}>Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
