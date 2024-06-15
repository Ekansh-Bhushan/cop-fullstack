import React from 'react';
import './P.css';
import groupImage from './Group.png'; // Import the image
import userimage from './user.svg'; // Import the image
import groupimage2 from './group2.png'; // Import the image


export default function P(police) {
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

{/*left profile  */}
    <div className='leftbox'>
      <div className='profileName'><h1 className='profile'>PROFILE </h1></div>
      <img src={userimage} alt="/" className='user'/>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className='profilerole'>NAME:  {police.name}</h1>
      <h1 className='profilerole'>ROLE: {police.role}</h1>
      <h1 className='profilerole'>POST:{police.post} </h1>
      <h1 className='profilerole'>DOB:{police.dob} </h1>
      <h1 className='profilerole'>PS UNDER:{police.under}</h1>
    </div>
    <div className='rightbox'>
        <img src={groupimage2} alt="/" className='images'/>
    </div>
    </>
  );
}
