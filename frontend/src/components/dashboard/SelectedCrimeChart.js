import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { API_URL } from "../config/config";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const SelectedCrimeBarChart = () => {
  const [selectedArea, setSelectedArea] = useState("BAWANA");
  const [selectedCrime, setSelectedCrime] = useState("BURGLARY");
  const [crimeData, setCrimeData] = useState([]);

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleCrimeChange = (event) => {
    setSelectedCrime(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/crime-data/by/${selectedArea}/${selectedCrime}`
        );
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    fetchData();
  }, [selectedCrime, selectedArea]);

  const data = {
    labels: [
      "JAN",
      "FEB",
      "MARCH",
      "APRIL",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "SELECTED CRIME DATA",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: crimeData,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="crimechart">
      <Bar data={data} options={options} />
      <div className="crimechart-right">
        <label>
          <h3>Select Area</h3>
          <select value={selectedArea} onChange={handleAreaChange}>
            <option value="ALIPUR">ALIPUR</option>
            <option value="BAWANA">BAWANA</option>
            <option value="BHALSWA DAIRY">BHALSWA DAIRY</option>
            <option value="NARELA">NARELA</option>
            <option value="NARELA INDUSTRIAL AREA">
              NARELA INDUSTRIAL AREA
            </option>
            <option value="SAMAYPUR BADLI">SAMAYPUR BADLI</option>
            <option value="SHAHBAD DAIRY">SHAHBAD DAIRY</option>
            <option value="SWAROOP NAGAR">SWAROOP NAGAR</option>
            <option value="ALL">ALL AREAS</option>
          </select>
        </label>
        <label>
          <h3>Select Crime</h3>
          <select value={selectedCrime} onChange={handleCrimeChange}>
            <option value="BURGLARY">BURGLARY</option>
            <option value="HOUSE THEFT">HOUSE THEFT</option>
            <option value="MV THEFT">MV THEFT</option>
            <option value="ROBBERY">ROBBERY</option>
            <option value="SNATCHING">SNATCHING</option>
            <option value="ALL">ALL CRIMES</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SelectedCrimeBarChart;
