import React from 'react';
import './global.css';
import './profile-screen.css';
import groupImage from '../assets/Logo.png';
import userimage from '../assets/user.png';

function Header() {
  const navStyle = {
    display: 'flex',
    
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    marginTop: '5px' ,
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '1000',
    left: '0',
    

  };

  const imgStyle = {
    width: '50px',
    height: 'auto'
  };

  const textStyle = {
    fontSize: '30px',
    margin: '0 10px',
    fontWeight: 'normal'
  };

  const firstTextStyle = {
    ...textStyle,
    marginLeft: '20px'
  };

  const lastTextStyle = {
    ...textStyle,
    marginRight: '20px'
  };

  return (
    <div style={navStyle}>
      <img src={groupImage} alt="Group logo" style={imgStyle} />
      <h1 style={firstTextStyle}>DASHBOARD</h1>
      <h1 style={textStyle}>DUTY CHART</h1>
      <h1 style={textStyle}>ADD/REMOVE STAFF</h1>
      <h1 style={lastTextStyle}>STAFF MEMBERS</h1>
      <img src={userimage} alt="User icon" style={imgStyle} />
    </div>
  );
}

export default Header;
