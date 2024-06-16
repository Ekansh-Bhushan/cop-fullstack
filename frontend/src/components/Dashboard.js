import React from 'react'
import './Dashboard.css';
import groupImage from './Group.png'; // Import the image
import userimage from './user.svg'; // Import the image


export default function Dashboard() {


  return (
    <div>
       <div className="nav">
      <img src={groupImage} alt="Group logo" /> {/* Use the imported variable */}
      <h1 className='h1'>DASHBOARD</h1>
      <h1 className='h1'>DUTY CHART</h1>
      <h1 className='h1'>ADD/REMOVE STAFF</h1>
      <h1 className='h1'>STAFF MEMBERS</h1>
      <img src={userimage} alt="User icon" />
    </div>
    <div className='container'>
        <div className='leftwalbox'>
<div className='box1' ></div>
<div className='box2'></div>
<div className='box3'></div>
<div className='box4'></div>
</div>
<div className='rwalabox'>
<div className='r1'></div>
<div className='r1'></div>
</div>

    </div>
    </div>
  )
}
