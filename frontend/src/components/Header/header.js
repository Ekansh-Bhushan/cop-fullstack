import React from 'react';
import groupImage from '../../assets/Logo.png';
import userimage from '../../assets/user.png';
import './header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <img src={groupImage} alt="Group logo" />
      <h1 
        className='h1'
        onClick={() => navigate('/homepage')}
      >
        DASHBOARD
      </h1>
      <h1 
        className='h1'
        onClick={() => navigate('/DutyTask')}
      >
        DUTY CHART
      </h1>
      <h1 
        className='h1'
        onClick={() => navigate('/StaffManagement')}
      >
        ADD/REMOVE STAFF
      </h1>
      <h1 
        className='h1'
        onClick={() => navigate('/staffMembers')}
      >
        STAFF MEMBERS
      </h1>
      <img src={userimage} 
       onClick={() => navigate('/Profile')} alt="User icon" />
    </div>
  );
}

export default Header;
