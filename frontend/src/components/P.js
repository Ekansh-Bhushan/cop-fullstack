import React from 'react';
import './P.css';
export default function P({ police }) {
  return (
    <>
      <div className="nav">
        <img src={groupImage} alt="Group logo" />
        <h1 className="h1">DASHBOARD</h1>
        <h1 className="h1">DUTY CHART</h1>
        <h1 className="h1">ADD/REMOVE STAFF</h1>
        <h1 className="h1">STAFF MEMBERS</h1>
        <img src={userImage} alt="User icon" />
      </div>

      {/* Left profile */}
      <div className="leftbox">
        <h1 className="profile">PROFILE</h1>
        <img src={userImage} alt="/" className="user" />
        <br />
        <br />
        <br />
        <br />
        <h1 className="profilerole">NAME: {police.name}</h1>
        <h1 className="profilerole">ROLE: {police.role}</h1>
        <h1 className="profilerole">POST: {police.post}</h1>
        <h1 className="profilerole">DOB: {police.dob}</h1>
        <h1 className="profilerole">PS UNDER: {police.under}</h1>
      </div>

      {/* Right box */}
      <div className="rightbox">
        <img src={groupImage2} alt="/" className="images" />
      </div>
    </>
  );
}
