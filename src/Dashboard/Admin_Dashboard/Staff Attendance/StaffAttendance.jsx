import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Table from '../../../Reusable_components/Table';
import BASE_URL from '../../../conf/conf';
import { parseISO, format, subDays, startOfYear } from 'date-fns';

function StaffAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStatusData, setAttendanceStatusData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [highlightedStatuses, setHighlightedStatuses] = useState(new Set());
  const [dateFilter, setDateFilter] = useState('Today'); // Default filter
  const [startDate, setStartDate] = useState(null); // Custom range start date
  const [endDate, setEndDate] = useState(null); // Custom range end date

  // Fetch attendance status data from /attendance/getStaffAttendanceStatus
  const fetchAttendanceStatusData = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/attendance/getStaffAttendanceStatus`, // Fetch attendance statuses
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Attendance Status Data:', response.data);
        const statuses = response.data.data.map(item => item.attendanceStatus); // Extract all attendance statuses
        setAttendanceStatusData(statuses); // Set the attendance status data
      })
      .catch((error) => {
        console.error('Error fetching attendance status data:', error);
      });
  };

  // Fetch attendance data from /attendance/getStaffAttendance
  const fetchAttendanceData = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/attendance/getStaffAttendance`, // Fetch staff attendance data
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Attendance Data:', response.data);
        setAttendanceData(response.data.data); // Set attendance data
        setFilterData(response.data.data); // Initialize filter data
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });
  };

  // Fetch staff from the API
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      if (response.data && response.data.success) {
        setStaff(response.data.data);  // Store staff data
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceStatusData(); // Fetch attendance statuses
    fetchAttendanceData(); // Fetch staff attendance data
    fetchUser(); // Fetch staff data
  }, []);

  // Filter by date logic
  const filterByDate = () => {
    let filteredData;
    const now = new Date();
    console.log(now,'now')

    // Helper function to extract the date part from a full date (ignores time)
    const getDateFromDateTime = (dateTime) => {
      if (!dateTime) return null;
      return format(parseISO(dateTime), 'yyyy-MM-dd'); // Extract date part (yyyy-MM-dd)
    };

    switch (dateFilter) {
      case 'Today':
        filteredData = filterData.filter((item) => {
          const itemDate = getDateFromDateTime(item.loginDateTime);
          return itemDate === format(now, 'yyyy-MM-dd'); // Compare only the date part
        });
        break;

      case 'Yesterday':
        const yesterday = subDays(now, 1);
        filteredData = filterData.filter((item) => {
          const itemDate = getDateFromDateTime(item.loginDateTime);
          return itemDate === format(yesterday, 'yyyy-MM-dd');
        });
        break;

      case 'Last 7 Days':
        const last7Days = subDays(now, 7);
        filteredData = filterData.filter((item) => {
          const itemDate = parseISO(item.loginDateTime);
          return itemDate >= last7Days; // Compare full date (including time)
        });
        break;

      case 'Last 30 Days':
        const last30Days = subDays(now, 30);
        filteredData = filterData.filter((item) => {
          const itemDate = parseISO(item.loginDateTime);
          return itemDate >= last30Days; // Compare full date (including time)
        });
        break;

      case 'This Year':
        const startOfYearDate = startOfYear(now);
        filteredData = filterData.filter((item) => {
          const itemDate = parseISO(item.loginDateTime);
          return itemDate >= startOfYearDate; // Compare full date (including time)
        });
        break;

      case 'Custom Range':
        if (startDate && endDate) {
          filteredData = filterData.filter((item) => {
            const itemDate = parseISO(item.loginDateTime);
            return itemDate >= startDate && itemDate <= endDate; // Filter by custom range
          });
        } else {
          filteredData = filterData; // Return all if no custom range is selected
        }
        break;

      default:
        filteredData = filterData;
        break;
    }

    setAttendanceData(filteredData); // Update the data with filtered results
  };

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value); // Update the date filter
    filterByDate(); // Reapply the filter when the date filter changes
  };

  // Handle start date change for custom range
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value ? parseISO(e.target.value) : null;
    setStartDate(selectedStartDate);
    filterByDate();
  };

  // Handle end date change for custom range
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value ? parseISO(e.target.value) : null;
    setEndDate(selectedEndDate);
    filterByDate();
  };

  // Map staff ID to staff name
  const getStaffNameById = (userId) => {
    const staffMember = staff.find((staff) => staff.id === userId);
    return staffMember ? staffMember.firstName : 'Unknown Staff';
  };

  // Table columns with updated fields (User Table ID and Attendance Status)
  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Staff Name',
      selector: (row) => getStaffNameById(row.userTableId), // Use the helper function to get staff name
      sortable: true,
      wrap: true,
    },
    {
      name: 'Attendance Status',
      selector: (row) => row.attendanceStatus,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div>
          {/* Display all attendance statuses in a line */}
          {attendanceStatusData.map((status, idx) => (
            <span
              key={idx}
              style={{
                marginRight: '10px',
                backgroundColor: row.attendanceStatus === status ? '#FFEB3B' : 'transparent', // Highlight matching status
                padding: '5px',
                borderRadius: '4px',
                fontWeight: row.attendanceStatus === status ? 'bold' : 'normal',
              }}
            >
              {status} {/* Ensure we're rendering a string here */}
            </span>
          ))}
        </div>
      ),
      width: '500px',
    },
  ];

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Staff Attendance</h1>
      <p className="mt-2">
        Dashboard /<NavLink to="/admin"> Admin </NavLink>/{' '}
        <span className="text-[#ffae01] font-semibold">Staff Attendance</span>
      </p>

      {/* Filter Section */}
      <div className="mb-4">
        <select value={dateFilter} onChange={handleDateFilterChange} className="p-2">
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="This Year">This Year</option>
          <option value="Custom Range">Custom Range</option>
        </select>

        {dateFilter === 'Custom Range' && (
          <div className="flex space-x-4 mt-2">
            <input
              type="date"
              onChange={handleStartDateChange}
              className="p-2"
              placeholder="Start Date"
            />
            <input
              type="date"
              onChange={handleEndDateChange}
              className="p-2"
              placeholder="End Date"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <Table data={attendanceData} columns={columns} />
    </div>
  );
}

export default StaffAttendance;
