import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
  const [selectedCrime, setSelectedCrime] = useState("Burglary");
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
          `http://localhost:4000/crime-data/by/${selectedArea}/${selectedCrime}`
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
            <option value="SAMAYPUR BADLI">SAMAYPUR BADLI</option>
            <option value="NARELA">NARELA</option>
            <option value="BAWANA">BAWANA</option>
            <option value="SHAHBAD DAIRY">SHAHBAD DAIRY</option>
            <option value="BHALSWA DAIRY">BHALSWA DAIRY</option>
            <option value="NARELA INDUSTRIAL AREA">
              NARELA INDUSTRIAL AREA
            </option>
            <option value="SWARUP NAGAR">SWARUP NAGAR</option>
            <option value="SWARUP NAGAR">ALIPUR</option>
          </select>
        </label>
        <label>
          <h3>Select Crime</h3>
          <select value={selectedCrime} onChange={handleCrimeChange}>
            <option value="Burglary">Burglary</option>
            <option value="House Theft">House Theft</option>
            <option value="M V Theft">MV Theft</option>
            <option value="Snatching">Snatching</option>
            <option value="Robbery">Robbery</option>
            <option value="All">ALL Crime</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SelectedCrimeBarChart;
