import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../Reusable_components/Table'; 
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Labels from '../../../Reusable_components/Labels';
import BASE_URL from '../../../conf/conf';

const StdsAttendance = () => {
  const { classItem } = useLocation().state;
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [uniqueDates, setUniqueDates] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default: Current Month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default: Current Year

  // Fetch attendance statuses
  const fetchAttendanceStatuses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`, {
        headers: { "Content-Type": "application/json" },
      });

      const statuses = response.data.data.reduce((map, { id, attendanceStatus }) => {
        map[id] = attendanceStatus;
        return map;
      }, {});

      setStatusMap(statuses);
    } catch (error) {
      console.error('Error fetching attendance statuses:', error);
    }
  };

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getAttendanceList`, {
        headers: { "Content-Type": "application/json" },
      });

      const filteredAttendance = response.data.data.filter(
        (entry) => entry.className === classItem.id
      );

      const newAttendanceMap = {};
      filteredAttendance.forEach(({ attendanceDate, attendanceStatusList }) => {
        const dateObj = new Date(attendanceDate);
        const formattedDate = dateObj.toLocaleDateString();

        // Map attendance data to the corresponding student and date
        if (dateObj.getMonth() + 1 === selectedMonth && dateObj.getFullYear() === selectedYear) {
          attendanceStatusList.forEach(({ studentId, attendanceStatusId }) => {
            if (!newAttendanceMap[studentId]) {
              newAttendanceMap[studentId] = {};
            }
            newAttendanceMap[studentId][formattedDate] = attendanceStatusId;
          });
        }
      });

      setAttendanceMap(newAttendanceMap);
      setUniqueDates(getAllDatesOfMonth(selectedYear, selectedMonth));
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Fetch student data
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const filteredStudents = response.data.data.filter(
        (user) => user.role === 3 && user.className?.includes(classItem.id)
      );
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Generate all dates for the selected month
  const getAllDatesOfMonth = (year, month) => {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };

  // Fetch data whenever the selected month or year changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchAttendanceStatuses();
      await fetchAttendanceData();
    };

    fetchData();
  }, [classItem, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchStudents();
  }, [classItem]);

  // Format attendance status
  const formatAttendance = (status) => {
    switch (status) {
      case 'Present':
        return <span className="text-green-400 font-bold">P</span>;
      case 'Absent':
        return <span className="text-red-400 font-bold">A</span>;
      case 'Half Day':
        return <span className="text-yellow-400 font-bold">HD</span>;
      case 'Medical':
        return <span className="text-blue-400 font-bold">M</span>;
      default:
        return '-';
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Define table columns
  const columns = [
    {
      name: 'Student Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      cellStyle: {
        position: 'sticky',
        left: 0,
        zIndex: 2,
        backgroundColor: 'white',
        width: '150px',
      },
    },
    ...uniqueDates.map((date) => {
      const day = new Date(date).getDate(); // Extract day from the date
      return {
        name: day.toString(), // Display the day (1, 2, 3, etc.)
        selector: (row) =>
          formatAttendance(statusMap[attendanceMap[row.id]?.[date]] || '-'),
        width: '60px',
      };
    }),
  ];

  return (
    <div className="h-full mb-10">
      <div className="flex flex-col mb-6">
        <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">{`Attendance: ${classItem.name} - ${classItem.section}`}</h1>
        <p className="mt-2">
          <NavLink to="/admin">Dashboard</NavLink> /{' '}
          <NavLink to="/admin/classSelect"> Classes </NavLink> /{' '}
          <span className="text-[#ffae01] font-semibold">Attendance</span>
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 2 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <Labels />
      </div>
      
        <Table
          columns={columns}
          data={students}
          searchOptions={[{ label: 'Student Name', value: 'name' }]}
        />
    </div>
  );
};

export default StdsAttendance;
