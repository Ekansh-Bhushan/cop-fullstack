import React from 'react';
import './P.css';
import groupImage from './Group.png'; // Import the image
import userimage from './user.svg'; // Import the image
import groupimage2 from './group2.png'; // Import the image
import Header from './Header/header';



export default function P(police) {
  
  return (
    <>
    < Header />

    <div className='profile-body'>
    <div className='leftbox'>
      <div className='profileName'><h1 className='profile'>PROFILE </h1></div>
      <img src={userimage} alt="/" className='user'/>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className='profilerole'>NAME:  {police.name}</h1>
      <h1 className='profilerole'>PHONE NUMBER  {police.mobileNumber}</h1>
      <h1 className='profilerole'>ROLE: {police.role}</h1>
      <h1 className='profilerole'>POST:{police.post} </h1>
      <h1 className='profilerole'>DOB:{police.dob} </h1>
      <h1 className='profilerole'>PS UNDER:{police.areas}</h1>
    </div>
    <div className='rightbox'>
        <img src={groupimage2} alt="/" className='images'/>
    </div>
    </div>
    </>
  );
}
