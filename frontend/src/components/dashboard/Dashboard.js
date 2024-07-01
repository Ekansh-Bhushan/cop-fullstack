import React, { useEffect, useState } from "react";
import CrimeChart from "./CrimeChart";
import "./dashboard.css";
import SelectedCrimeBarChart from "./SelectedCrimeChart";
import Headers from "../Header/header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../config/config';

const areaNames = [
  "Bawana",
  "Shahbad Dairy",
  "Narela",
  "Narela Industrial Area",
  "Alipur",
  "Samaypur Badli",
  "Swaroop Nagar",
  "Bhalswa Dairy",
];

function Dashboard(props) {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check for the authentication token
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    if (!token) {
      toast.error("Please login first!");
      navigate("/"); // Redirect to login if token is not present
      return;
    }
    setUserName(storedUserName);

    // Fetch total number of users from the backend
    fetch(`${API_URL}/api/total-users`)
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.total);
        setActiveUsers(data.active);
      })
      .catch((error) => console.error("Error fetching total users:", error));
  }, [navigate]);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Headers />
      <ToastContainer />
      <div className="dashboard">
        <div className="dashboard-left">
          <h2>
            Hi {userName},<br /> Welcome to COP
          </h2>
          <div className="dashboard-left-userinfo">
            <h2>Number of users: {totalUsers}</h2>
            <h2>Active: {activeUsers}</h2>
          </div>
          <div className="dashboard-left-filter" onClick={() => navigate("/StaffManagement")}>
            <h2>ADD/REMOVE STAFF</h2>
            <h3>Add Constable in the Police Station</h3>
            {/* <select value={selectedStation} onChange={handleStationChange}>
              {areaNames.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select> */}
            {/* <button onClick={() => navigate("/StaffManagement")}>Select</button> */}
          </div>
          <div
            className="dash-board-dutychart"
            onClick={() => navigate("/DutyTask")}
          >
            <h2>DUTY CHART</h2>
            <h4>Add Duty Timing for Constable</h4>
          </div>
          <div
            className="dashboard-left-crime-upload"
            onClick={() => navigate("/crimeEntry")}
          >
            <h2>Crime Data</h2>
            <h4>Click here to enter the crime data in the database</h4>
            {/* <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            /> */}
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-right-top">
            <CrimeChart />
          </div>
          <div className="dashboard-right-bottom">
            <SelectedCrimeBarChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
