import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import StaffManagement from './components/StaffManagement.js';
import Final from './components/Login/login.js'
import DutyTask from './components/DutyTask.js';
import LoginScreen from './components/Login/LoginScreen.js';
import ProfileScreen from './components/profileScreen.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Final />} />
        <Route path="/StaffManagement" element={<StaffManagement />} />
        <Route path="/DutyTask" element={<DutyTask />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/profileScreen" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
