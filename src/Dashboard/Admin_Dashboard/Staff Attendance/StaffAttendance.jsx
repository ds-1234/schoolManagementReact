import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import StaffAttendanceTable '../../../Reusable_components/StaffAttendanceTable';
import BASE_URL from '../../../conf/conf';
import { parseISO, format, subDays, startOfYear } from 'date-fns';
import StaffAttendanceTable from '../../../Reusable_components/StaffAttendanceTable';
// import { parseISO, format } from 'date-fns';

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

  // Helper function to extract only the date part (yyyy-MM-dd) from ISO string

  // Helper function to extract date from a datetime string
  const getDateFromDateTime = (dateTime) => {
    const dateObj = parseISO(dateTime); // Parses the ISO string
    return format(dateObj, 'yyyy-MM-dd'); // Formats it to 'yyyy-MM-dd'
  };
  // Function to filter data by date range or predefined options
  const filterByDate = (filterValue, startDate = null, endDate = null) => {
    const now = new Date();
    let filteredData;
  
    switch (filterValue) {
      case 'Today':
        filteredData = filterData.filter((item) => {
          const itemDate = getDateFromDateTime(item.logindateTime);
          return itemDate === format(now, 'yyyy-MM-dd');
        });
        break;
  
      case 'Yesterday':
        const yesterday = subDays(now, 1);
        filteredData = filterData.filter((item) => {
          const itemDate = getDateFromDateTime(item.logindateTime);
          return itemDate === format(yesterday, 'yyyy-MM-dd');
        });
        break;
  
      case 'Last 7 Days':
        const last7Days = subDays(now, 7);
        filteredData = filterData.filter((item) => {
          const itemDate = new Date(getDateFromDateTime(item.logindateTime));
          return itemDate >= last7Days && itemDate <= now;
        });
        break;
  
      case 'Last 30 Days':
        const last30Days = subDays(now, 30);
        filteredData = filterData.filter((item) => {
          const itemDate = new Date(getDateFromDateTime(item.logindateTime));
          return itemDate >= last30Days && itemDate <= now;
        });
        break;
  
      case 'This Year':
        const startOfYearDate = startOfYear(now);
        filteredData = filterData.filter((item) => {
          const itemDate = new Date(getDateFromDateTime(item.logindateTime));
          return itemDate >= startOfYearDate && itemDate <= now;
        });
        break;
  
      case 'Custom Range':
        if (startDate && endDate) {
          filteredData = filterData.filter((item) => {
            const itemDate = new Date(getDateFromDateTime(item.logindateTime));
            return itemDate >= startDate && itemDate <= endDate;
          });
        } else {
          filteredData = filterData;
        }
        break;
  
      default:
        filteredData = filterData;
        break;
    }
  
    setAttendanceData(filteredData);
  };
  // Handle dropdown change
  const handleDateFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setDateFilter(selectedFilter);

    // Apply filter directly
    if (selectedFilter !== 'Custom Range') {
      filterByDate(selectedFilter);
    }
  };

  // Handle start date change for custom range
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value ? new Date(e.target.value) : null;
    setStartDate(selectedStartDate);
  
    if (dateFilter === 'Custom Range' && selectedStartDate && endDate) {
      filterByDate('Custom Range', selectedStartDate, endDate);
    }
  };
  
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value ? new Date(e.target.value) : null;
    setEndDate(selectedEndDate);
  
    if (dateFilter === 'Custom Range' && startDate && selectedEndDate) {
      filterByDate('Custom Range', startDate, selectedEndDate);
    }
  };
  

  // Apply the default filter on component mount
  useEffect(() => {
    filterByDate('Today'); // Apply "Today" filter initially
  }, [filterData]);
  

  // Map staff ID to staff name
  const getStaffNameById = (userId) => {
    const staffMember = staff.find((staff) => staff.id === userId);
    return staffMember ? staffMember.firstName : 'Unknown Staff';
  };

  // StaffAttendanceTablecolumns with updated fields (User StaffAttendanceTableID and Attendance Status)
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
        padding: '5px',
        fontWeight: row.attendanceStatus === status ? 'bold' : 'normal',
        display: 'inline-flex',
        alignItems: 'center', // Vertically align the text
      }}
    >
      {/* Blue disc with a white smaller disc */}
      {row.attendanceStatus === status && (
        <span
          style={{
            width: '12px', // Size of the blue disc
            height: '12px', // Size of the blue disc
            borderRadius: '50%', // Circular shape
            backgroundColor: 'blue', // Blue color for the outer disc
            display: 'flex',
            alignItems: 'center', // Center the smaller disc inside
            justifyContent: 'center', // Center the smaller disc inside
            marginRight: '8px', // Space between the blue disc and status text
          }}
        >
          <span
            style={{
              width: '6px', // Size of the white smaller disc
              height: '6px', // Size of the white smaller disc
              borderRadius: '50%', // Circular shape
              backgroundColor: 'white', // White color for the inner disc
            }}
          ></span>
        </span>
      )}
      {status}
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
        <NavLink to="/admin"> Dashboard  </NavLink>/
        <span className="text-[#ffae01] font-semibold"> Staff Attendance</span>
      </p>
        {console.log(attendanceData,'attendanceData')}

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
          <div className="flex mt-2 space-x-2">
            <input
              type="date"
              onChange={handleStartDateChange}
              className="p-2"
            />
            <input
              type="date"
              onChange={handleEndDateChange}
              className="p-2"
            />
          </div>
        )}
      </div>

      {/* Attendance StaffAttendanceTable*/}
      <StaffAttendanceTable columns={columns} data={attendanceData} />
    </div>
  );
}

export default StaffAttendance;
