import React from 'react';
import './global.css';
import './profile-screen.css';
import logo from '../assets/policeLogo.png'
import user from '../assets/user.png'


function Header() {
  return (
    <>
    <section className="map1"></section>
      <button className="vuesaxlinearuser">
        <img className="user-icon" alt="" src={user} />
      </button>
      <img className="group-icon2" alt="" src={logo} />
      <button className="dashboard1">DASHBOARD</button>
      <button className="duty-chart2">DUTY CHART</button>
      <img className="profile-screen-child" alt="" src="./public/line-11@2x.png" />
      <button className="add-remove-staff2">ADD/ REMOVE STAFF</button>
      <button className="staff-members1">STAFF MEMBERS</button>
      </>
  )
}

export default Header
