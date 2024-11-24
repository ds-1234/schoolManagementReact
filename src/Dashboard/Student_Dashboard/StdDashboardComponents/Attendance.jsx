import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function Attendance({ totalDays, presentDays, absentDays, halfDays }) {
  // Data for Pie chart
  const pieChartData = {
    labels: ['Present', 'Absent', 'Half Day'],
    datasets: [
      {
        data: [presentDays, absentDays, halfDays],
        backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'], // Colors for each category
        hoverBackgroundColor: ['#45a049', '#e53935', '#fbc02d'], // Hover colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 w-[700px] bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        {/* Date Filter */}
        <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md py-2 px-4">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
          <option>Custom Range</option>
        </select>
      </div>

      {/* Attendance Details */}
      <div className="border-t-2 border-dotted border-gray-300 pt-4 mb-6">
        <p className="text-lg font-medium">No of Total Working Days: <span className="font-bold">{totalDays} Days</span></p>
        <div className="grid grid-cols-4 text-center mt-4">
          <div>
            <p className="font-medium text-gray-700">Present</p>
            <p className="text-xl font-bold">{presentDays}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Absent</p>
            <p className="text-xl font-bold">{absentDays}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Half Day</p>
            <p className="text-xl font-bold">{halfDays}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <Pie data={pieChartData} />
      </div>
    </div>
  );
}

export default Attendance;
