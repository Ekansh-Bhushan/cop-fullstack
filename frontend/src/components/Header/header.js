import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import groupImage from "../../assets/Logo.png";
import userimage from "../../assets/user.png";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    localStorage.removeItem("token"); // Remove token from localStorage
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="nav">
      <img
        src={groupImage}
        alt="Group logo"
        onClick={() => navigate("/homepage")}
      />
      <NavLink exact to="/homepage" className="h1" activeClassName="active">
        DASHBOARD
      </NavLink>
      <NavLink exact to="/DutyTask" className="h1" activeClassName="active">
        DUTY CHART
      </NavLink>
      <NavLink
        exact
        to="/StaffManagement"
        className="h1"
        activeClassName="active"
      >
        ADD/REMOVE STAFF
      </NavLink>
      <NavLink exact to="/StaffMembers" className="h1" activeClassName="active">
        STAFF MEMBERS
      </NavLink>
      <div className="user-icon-container">
        <img
          src={userimage}
          alt="User icon"
          className="user-icon"
          onClick={toggleMenu}
        />
      </div>

      {showMenu && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Header;
