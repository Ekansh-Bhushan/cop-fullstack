import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import StaffManagement from "./components/addremovestaff/StaffManagement.js";
import StaffMembers from "./components/staff/StaffMembers.js";
import Final from "./components/Login/login.js";
import DutyTask from "./components/dutychart/DutyTask.js";
// import LoginScreen from './components/Login/LoginScreen.js';
import ProfileScreen from "./components/P.js"; // Correct casing
import Dashboard from "./components/dashboard/Dashboard.js";
import Header from "./components/Header/header.js";
import Crime from "./components/crimes/crime.js";
// import Profiles from './components/P.js'; // Correct casing

function App() {
  // Sample police data to pass to the Profile component
  const police = {
    name: "John Doe",
    role: "Sergeant",
    post: "Downtown",
    dob: "1980-01-01",
    under: "Central Station",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Final />} />
        <Route path="/StaffManagement" element={<StaffManagement />} />
        <Route path="/StaffMembers" element={<StaffMembers />} />
        <Route path="/DutyTask" element={<DutyTask />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<ProfileScreen/>} /> {/* Pass police as a prop */}
        <Route path="/homepage" element={<Dashboard/>} /> {/* Pass police as a prop */}
        <Route path="/crimeEntry" element={<Crime/>} /> {/* Pass police as a prop */}
      </Routes>
    </Router>
  );
}

export default App;
