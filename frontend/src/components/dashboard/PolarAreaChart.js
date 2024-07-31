import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

const getColors = () => [
  "rgba(255, 99, 132, 0.5)",
  "rgba(255, 159, 64, 0.5)",
  "rgba(255, 205, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(54, 162, 235, 0.5)",
];

const monthLabels = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const PolarAreaChart = ({ dataset }) => {
  const [chartData, setChartData] = useState({
    labels: monthLabels,
    datasets: [
      {
        label: "TOTAL NUMBER OF CRIMES",
        data: dataset,
        backgroundColor: getColors(),
      },
    ],
  });

  useEffect(() => {
    if (dataset) {
      setChartData({
        labels: monthLabels,
        datasets: [
          {
            label: "TOTAL NUMBER OF CRIMES",
            data: dataset,
            backgroundColor: getColors(),
          },
        ],
      });
    }
  }, [dataset]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "TOTAL NUMBER OF CRIMES",
      },
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div className="chart-polar">
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarAreaChart;
