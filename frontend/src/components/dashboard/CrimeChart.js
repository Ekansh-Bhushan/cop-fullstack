import React, { useState } from "react";
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

const BarChart = () => {
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
        label: "TOTAL NUMBER OF CRIMES",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [1500, 800, 400, 900, 1240, 1480, 1100, 500, 300, 1000, 400, 600],
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

  const [selectedYear, setSelectedYear] = useState("2021");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="crimechart">
      <Bar data={data} options={options} />
      <div className="crimechart-right">
        <label>
          <h3>Select Year</h3>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default BarChart;
