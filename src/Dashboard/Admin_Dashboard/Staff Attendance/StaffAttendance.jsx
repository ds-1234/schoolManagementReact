import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import BASE_URL from '../../../conf/conf';
import Table from '../../../Reusable_components/Table';
import Labels from '../../../Reusable_components/Labels';

function StaffAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default: Current Month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());   // Default: Current Year

  // Update `dates` based on the selected month and year
  useEffect(() => {
    const newDates = eachDayOfInterval({
      start: startOfMonth(new Date(selectedYear, selectedMonth - 1)),
      end: endOfMonth(new Date(selectedYear, selectedMonth - 1)),
    }).map((date) => format(date, 'yyyy-MM-dd'));
    setDates(newDates);
  }, [selectedMonth, selectedYear]);

  // Fetch attendance data
  const fetchAttendanceData = () => {
    axios
      .get(`${BASE_URL}/attendance/getStaffAttendance`)
      .then((response) => {
        setAttendanceData(response.data.data || []);
      })
      .catch((error) => console.error('Error fetching attendance data:', error));
  };

  // Fetch staff data
  const fetchStaffData = () => {
    axios
      .get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        setStaff(response.data.data.filter((staff) => staff.role !== 3 && staff.role !== 5));
      })
      .catch((error) => console.error('Error fetching staff data:', error));
  };

  useEffect(() => {
    fetchAttendanceData();
    fetchStaffData();
  }, []);

  // Map staff ID to staff name
  const getStaffNameById = (userId) => {
    const staffMember = staff.find((staff) => staff.id === userId);
    return staffMember ? staffMember.firstName : 'Unknown Staff';
  };

  // Transform attendance data
  const transformedData = staff.map((staffMember) => {
    const attendanceForStaff = attendanceData.filter(
      (record) => 
        record.userTableId === staffMember.id && 
        dates.includes(record.attendanceDate) // Filter by selected dates
    );

    const attendanceMap = {};
    attendanceForStaff.forEach((record) => {
      attendanceMap[record.attendanceDate] = (() => {
        switch (record.attendanceStatus) {
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
      })();
    });

    // Fill missing dates with empty values
    const attendanceRow = dates.map((date) => attendanceMap[date] || '-');
    return {
      staffName: staffMember.firstName + ' ' + staffMember.lastName,
      attendanceRow,
    };
  });

  // Define columns dynamically
  const columns = [
    {
      name: 'Staff Name',
      selector: (row) => row.staffName,
      sortable: true,
      width: '150px',
    },
    ...dates.map((date) => {
      const day = new Date(date).getDate();
      return {
        name: day.toString(),
        selector: (_, idx) => idx,
        cell: (row) => row.attendanceRow[dates.indexOf(date)],
        width: '60px',
      };
    }),
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="h-full mb-10">
      <div className="flex flex-col mb-6">
        <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Staff Attendance</h1>
        <p className="mt-2">
          <NavLink to="/admin"> Dashboard </NavLink> /
          <span className="text-[#ffae01] font-semibold"> Staff Attendance</span>
        </p>
      </div>

      {/* Month and Year Selectors */}
      <div className="flex items-center gap-4 mb-6 mt-6">
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
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <Labels />
      </div>

      <Table columns={columns} data={transformedData} />
    </div>
  );
}

export default StaffAttendance;
