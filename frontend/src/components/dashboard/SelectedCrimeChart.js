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
        label: "Selected Crime Data",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [1150, 800, 700, 500, 800, 600, 400, 500, 300, 1000, 400, 600],
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
          <select>
            <option value="Bawana">Bawana</option>
            <option value="Shahbad">Shahbad Dairy</option>
            <option value="Jahangirpuri">Jahangirpuri</option>
            <option value="Rohini 17">Rohini 17</option>
            <option value="DTU">DTU</option>
          </select>
        </label>
        <label>
          <h3>Select Crime</h3>
          <select>
            <option value="theft">Theft</option>
            <option value="theft">Theft</option>
            <option value="theft">Theft</option>
            <option value="theft">Theft</option>
            <option value="All">ALL Crime</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default SelectedCrimeBarChart;
