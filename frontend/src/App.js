


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import StaffManagement from './components/StaffManagement.js';
import StaffMembers from './components/StaffMembers.js';
import Final from './components/Login/login.js';
import DutyTask from './components/DutyTask.js';
import LoginScreen from './components/Login/LoginScreen.js';
import ProfileScreen from './components/profileScreen.js'; // Correct casing
import Profiles from './components/P.js'; // Correct casing
import Dashboard from './components/Dashboard.js';

function App() {
  
  // Sample police data to pass to the Profile component
  const police = {
    name: "John Doe",
    role: "Sergeant",
    post: "Downtown",
    dob: "1980-01-01",
    under: "Central Station"
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Final />} />
        <Route path="/StaffManagement" element={<StaffManagement />} />
        <Route path="/StaffMembers" element={<StaffMembers />} />
        <Route path="/DutyTask" element={<DutyTask />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/Profiles" element={<Profiles/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
