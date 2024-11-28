import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import BASE_URL from '../../../conf/conf'; // Adjust the path to your config file
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registering Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

function Attendance({ user }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ Present: 0, Absent: 0, HalfDay: 0, Medical: 0 });
  const [selectedFilter, setSelectedFilter] = useState('Today'); // Default filter is today

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getAttendanceList`);
      const data = response.data.data;

      // Filter data by user class and matching user id with attendanceStatus
      const filteredByClassAndUser = data.filter((attendance) => {
        const studentIdInStatus = Object.keys(JSON.parse(attendance.attendenceStatus))[0];
        return attendance.className === user.className[0] && parseInt(studentIdInStatus) === user.id;
      });

      // Set the filtered data
      setFilteredData(filteredByClassAndUser);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Process attendance status and count occurrences
  const processAttendanceStatus = () => {
    const statusCounts = { Present: 0, Absent: 0, HalfDay: 0, Medical: 0 };
    filteredData.forEach((attendance) => {
      const status = JSON.parse(attendance.attendenceStatus)[user.id]; // Get status for the user
      if (status) {
        if (status.toLowerCase().includes('absent')) statusCounts.Absent += 1;
        else if (status.toLowerCase().includes('present')) statusCounts.Present += 1;
        else if (status.toLowerCase().includes('halfday')) statusCounts.HalfDay += 1;
        else if (status.toLowerCase().includes('medical')) statusCounts.Medical += 1;
      }
    });
    setStatusCounts(statusCounts);
  };

  // Filter attendance data based on date
  const filterByDate = (selectedDate) => {
    const filteredByDate = filteredData.filter((attendance) => {
      const attendanceDate = new Date(attendance.attendanceDate);
      const selectedDateObj = new Date(selectedDate);
      return attendanceDate.toDateString() === selectedDateObj.toDateString();
    });
    setFilteredData(filteredByDate);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    if (e.target.value === 'Today') {
      filterByDate(new Date());
    } else if (e.target.value === 'Yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filterByDate(yesterday);
    } else if (e.target.value === 'This Week') {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
      filterByDate(startOfWeek);
    } else if (e.target.value === 'This Month') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1); // Start of the month
      filterByDate(startOfMonth);
    } else if (e.target.value === 'This Year') {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1); // Start of the year
      filterByDate(startOfYear);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [user]); // Re-fetch data when user changes

  useEffect(() => {
    processAttendanceStatus();
  }, [filteredData]); // Reprocess attendance counts when filteredData changes

  // Data for Pie chart
  const pieChartData = {
    labels: ['Present', 'Absent', 'Half Day', 'Medical Leave'],
    datasets: [
      {
        data: [statusCounts.Present, statusCounts.Absent, statusCounts.HalfDay, statusCounts.Medical],
        backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B', '#9E9E9E'], // Colors for each category
        hoverBackgroundColor: ['#45a049', '#e53935', '#fbc02d', '#757575'], // Hover colors
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
        <select
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md py-2 px-4"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
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
        <p className="text-lg font-medium">No of Total Working Days: <span className="font-bold">{filteredData.length} Days</span></p>
        <div className="grid grid-cols-4 text-center mt-4">
          <div>
            <p className="font-medium text-gray-700">Present</p>
            <p className="text-xl font-bold">{statusCounts.Present}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Absent</p>
            <p className="text-xl font-bold">{statusCounts.Absent}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Half Day</p>
            <p className="text-xl font-bold">{statusCounts.HalfDay}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Medical Leave</p>
            <p className="text-xl font-bold">{statusCounts.Medical}</p>
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
