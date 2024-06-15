import React from 'react';
import './global.css';
import './profile-screen.css';
import groupImage from '../assets/Logo.png';
import userimage from '../assets/user.png';
import './P.css';


function Header() {
  return (
    <>
      <div className="nav">
      <img src={groupImage} alt="Group logo" /> {/* Use the imported variable */}
      <h1 className='h1'>DASHBOARD</h1>
      <h1 className='h1'>DUTY CHART</h1>
      <h1 className='h1'>ADD/REMOVE STAFF</h1>
      <h1 className='h1'>STAFF MEMBERS</h1>
      <img src={userimage} alt="User icon" />
    </div>
      </>
  )
}

export default Header
