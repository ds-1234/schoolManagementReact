import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title);

const ChartCard = ({ title, amount, color, chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full min-w-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <p className={`text-2xl font-bold ${color}`}>{amount}</p>
        </div>
        <div
          className={`p-3 rounded-lg ${
            color === "text-blue-500" ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          <FontAwesomeIcon
            icon={faIndianRupeeSign}
            className={`${color === "text-blue-500" ? "text-blue-500" : "text-red-500"}`}
          />
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartCard ;