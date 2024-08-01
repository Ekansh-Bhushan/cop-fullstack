import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import groupImage from '../../assets/Logo.png';
import userimage from '../../assets/user.png';
import dropmenu from '../../assets/threeLines.png';
import './landingHeader.css';

function LandingHeader() {
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
        <img src={groupImage} className='main-logo' alt="Group logo" onClick={() => navigate('/')} />
      <div className="nav1">
        <NavLink exact to="/" className="text" activeClassName="active">
            HOME
        </NavLink>
        <a href="/#aboutUs" className="text" activeClassName="active">
            ABOUT US
        </a>
        <a href="/#contact" className="text" activeClassName="active">
            CONTACT US
        </a>
        <a href="/#faqs" className="text" activeClassName="active">
            FAQs
        </a>
        <a href="/#team" className="text" activeClassName="active">
            DEVELOPMENT TEAM
        </a>
      </div>
      <NavLink exact to="/login" className="login" activeClassName="active">
        LOG IN
      </NavLink>
      
      {/* {showNav && (<img src={groupImage} alt="Group logo" onClick={() => navigate('/')} />)} */}
      <img src={dropmenu} alt="Menu icon" className="menu-icon" onClick={toggleNav} />
      {showNav && (
        <div className="nav-dropdown">
          <a href="/#aboutUs" className="h1" activeClassName="active">
            ABOUT US
          </a>
          <a href="/#contact" className="h1" activeClassName="active">
            CONTACT US
          </a>
          <a href="/#faqs" className="h1" activeClassName="active">
            FAQs
          </a>
          <a href="/#team" className="h1" activeClassName="active">
            DEVELOPMENT TEAM
          </a>

        </div>
      )}
    </div>
  );
}

export default LandingHeader;
