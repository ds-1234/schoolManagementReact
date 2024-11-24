import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExamResult() {
  const [selectedQuarter, setSelectedQuarter] = useState('1st Quarter'); // Default to 1st Quarter

  // Dropdown change handler
  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
  };

  // Generate random marks between 0 and 100
  const generateRandomMarks = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 101));
  };

  // Bar chart data
  const data = {
    labels: ['Mat', 'Phy', 'Che', 'Eng', 'Sci'], // Subjects
    datasets: [
      {
        label: `${selectedQuarter} - Marks`, // Title of the graph
        data: generateRandomMarks(), // Random data for marks
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'], // Different colors for each bar
        borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'], // Same colors for the border
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Marks in Various Subjects',
      },
    },
  };

  return (
    <div className=''>
    <div className="flex justify-between items-center mb-6">
      {/* Left side: Title */}
      <div className="w-1/3">
        <h2 className="text-2xl font-bold">Exam Result</h2>
      </div>

      {/* Right side: Dropdown for selecting Quarter */}
      <div className="w-2/3 flex items-center space-x-4">
        <select
          value={selectedQuarter}
          onChange={handleQuarterChange}
          className="p-2 border rounded-md"
        >
          <option value="1st Quarter">1st Quarter</option>
          <option value="2nd Quarter">2nd Quarter</option>
          <option value="3rd Quarter">3rd Quarter</option>
          <option value="4th Quarter">4th Quarter</option>
        </select>
      </div>
      </div>

      {/* Bar Graph */}
      <div className="mt-10">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ExamResult;
