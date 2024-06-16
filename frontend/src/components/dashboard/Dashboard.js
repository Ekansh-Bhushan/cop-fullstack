import React, { useEffect, useState } from "react";
import CrimeChart from "./CrimeChart";
import "./dashboard.css";
import SelectedCrimeBarChart from "./SelectedCrimeChart";
import Headers from "../Header/header";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    // Fetch total number of users from the backend
    fetch("http://localhost:4000/api/total-users")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.total);
        setActiveUsers(data.active);
      })
      .catch((error) => console.error("Error fetching total users:", error));
  }, []);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Headers />
      <div className="dashboard">
        <div className="dashboard-left">
          <div className="dashboard-left-userinfo">
            <h2>Number of users: {totalUsers}</h2>
            <h2>Active: {activeUsers}</h2>
          </div>
          <div className="dashboard-left-filter">
            <h2>ADD/REMOVE STAFF</h2>
            <h3>POLICE STATION SELECTED</h3>
            <select value={selectedStation} onChange={handleStationChange}>
              {areaNames.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <button onClick={() => navigate("/StaffManagement")}>Select</button>
          </div>
          <div
            className="dash-board-dutychart"
            onClick={() => navigate("/DutyTask")}
          >
            <h2>DUTY CHART</h2>
            <h4>Add Duty Timing fro Constable</h4>
          </div>
          <div className="dashboard-left-crime-upload">
            <h2>Crime Data</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
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
