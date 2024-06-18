import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import groupImage from '../../assets/Logo.png';
import userimage from '../../assets/user.png';
import dropmenu from '../../assets/threeLines.png';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    localStorage.removeItem('token'); // Remove token from localStorage
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="nav">
      <img src={groupImage} alt="Group logo" onClick={() => navigate('/homepage')} />
      <NavLink exact to="/homepage" className="h1" activeClassName="active">
        DASHBOARD
      </NavLink>
      <NavLink exact to="/DutyTask" className="h1" activeClassName="active">
        DUTY CHART
      </NavLink>
      <NavLink exact to="/StaffManagement" className="h1" activeClassName="active">
        ADD/REMOVE STAFF
      </NavLink>
      <NavLink exact to="/StaffMembers" className="h1" activeClassName="active">
        STAFF MEMBERS
      </NavLink>
      <div className="user-icon-container">
        <img
          src={userimage}
          alt="User icon"
          className="user-icon"
          onClick={toggleMenu}
        />
      </div>

      {showMenu && (
        <div className="dropdown-menu">
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <img src={dropmenu} alt="Menu icon" className="menu-icon" onClick={toggleNav} />
      {showNav && (
        <div className="nav-dropdown">
          <NavLink exact to="/Dashboard" className="h1" activeClassName="active">
            DASHBOARD
          </NavLink>
          <NavLink exact to="/DutyTask" className="h1" activeClassName="active">
            DUTY CHART
          </NavLink>
          <NavLink exact to="/StaffManagement" className="h1" activeClassName="active">
            ADD/REMOVE STAFF
          </NavLink>
          <NavLink exact to="/StaffMembers" className="h1" activeClassName="active">
            STAFF MEMBERS
          </NavLink>
          <a href="/" onClick={handleLogout} className="h1">
            LOGOUT
          </a>

        </div>
      )}
    </div>
  );
}

export default Header;
