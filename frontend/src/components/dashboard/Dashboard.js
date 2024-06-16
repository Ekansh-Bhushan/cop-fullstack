import React from "react";
import CrimeChart from "./CrimeChart";
import "./dashboard.css";
import SelectedCrimeBarChart from "./SelectedCrimeChart";
import Headers from "../Header/header";
function Dashboard(props) {
  const [selectedStation, setSelectedStation] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
    <Headers/>
    <div className="dashboard">
      <div className="dashboard-left">
        <div className="dashboard-left-userinfo">
          <h2>Number of users: 327</h2>
          <h2>Active: 89</h2>
        </div>
        <div className="dashboard-left-filter">
          <h2>ADD/REMOVE STAFF</h2>
          <h3>POLICE STATION SELECTED</h3>
          <select value={selectedStation} onChange={handleStationChange}>
            <option value="area1">Area 1</option>
            <option value="area2">Area 2</option>
            <option value="area3">Area 3</option>
            <option value="area4">Area 4</option>
          </select>
          <button>Select</button>
        </div>
        <div className="dash-board-dutychart">
          <h2>DUTY CHART</h2>
          <h4>Tap To View</h4>
        </div>
        <div className="dashboard-left-crime-upload">
          <h2>Crime Data</h2>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
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
