import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { API_URL } from "../config/config";
import PolarAreaChart from "./PolarAreaChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
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
  LineElement,
  PointElement,
  LineController
);

const LineChart = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/crime-data/by-year/${selectedYear}`
        );
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  let width, height, gradient;
  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, "green");
      gradient.addColorStop(0.5, "yellow");
      gradient.addColorStop(1, "red");
    }
    return gradient;
  };

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
        data: crimeData,
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea);
        },
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        fill: true, // To fill the area under the line
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
    <div className="chart-main">
      <div className="crimechart-line">
        <Line data={data} options={options} />
        <div className="crimechart-right-line">
          <label>
            <h3>Select Year</h3>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </label>
        </div>
      </div>
      <PolarAreaChart dataset={crimeData} />
    </div>
  );
};

export default LineChart;
