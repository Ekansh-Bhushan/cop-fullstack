import React from 'react';
import './Profile.css';
export default function Profile(police) {
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
      <h1 className='profile'>PROFILE </h1>
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
