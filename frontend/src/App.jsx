import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home'; // Assuming you have a Home component
import Dashboard from './Pages/Dashboard/Dashboard';
import Votes from './Pages/Votes/Votes';
import EditProfile from './Pages/EditProfile/EditProfile';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import Candidates from './Pages/Candidates/Candidates';
import Voter from './Pages/Voters/Voter'
import UpcomingElections from './Pages/Upcoming-Elections/UpcomingElections';

const App = () => {
  const [isNav, setIsNav] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // Show Navbar only on the home page
    if (location.pathname === '/') {
      setIsNav(true);
    } else {
      setIsNav(false);
    }
  }, [location]);

  const user = {
    name: 'John Doe',
    dob: '01-01-1990',
    email: 'john.doe@example.com',
    adhar: '1234-5678-9012',
    voterId: 'ABCD1234'
  };


  return (
    <div>
      {isNav && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="/users" element={<Dashboard user={user}/>}/>
        <Route path="/users/vote/:electionId" element={<Votes />} />
        <Route path="/users/edit-profile" element={<EditProfile />} />


        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/candidates" element={<Candidates/>} />
        <Route path="/admin/votes" element={<Voter/>} />
        <Route path="/admin/upcoming-elections" element={<UpcomingElections/>}/>
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
