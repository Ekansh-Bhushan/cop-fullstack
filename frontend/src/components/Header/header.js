import React from 'react';
import { useState } from 'react';
// import './global.css';
// import './profile-screen.css';
import groupImage from '../../assets/Logo.png';
import userimage from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

import './header.css'

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <>

<div className="nav">
      <img src={groupImage} alt="Group logo" />
      <NavLink exact to="/Dashboard" className='h1' activeClassName="active">
        DASHBOARD
      </NavLink>
      <NavLink exact to="/DutyTask" className='h1' activeClassName="active">
        DUTY CHART
      </NavLink>
      <NavLink exact to="/StaffManagement" className='h1' activeClassName="active">
        ADD/REMOVE STAFF
      </NavLink>
      <NavLink exact to="/StaffMembers" className='h1' activeClassName="active">
        STAFF MEMBERS
      </NavLink>
      <img src={userimage} alt="User icon" className="user-icon" />
    </div>

      </>
  )
}

export default Header;