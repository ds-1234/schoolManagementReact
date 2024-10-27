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

  // Fetch students based on classItem
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const filteredStds = response.data.data.filter(user => user.role === 3);
      const filteredStudents = filteredStds.filter((std) => std.className[0] === classItem.id);
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch attendance data
  const fetchAttendance = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/attendance/getAttendanceList`,
        headers: { "Content-Type": "application/json" }
      });

      const filterClass = response.data.data.filter(data => data.className === classItem.id);

      // Create a new map for attendance data
      const newAttendanceMap = {};
      const dateSet = new Set();

      filterClass.forEach((data) => {
        const attendanceStatus = data.attendenceStatus
          .replace(/(\d+)=/g, '"$1":')  // Format string as a valid JSON
          .replace(/([a-zA-Z]+)/g, '"$1"'); 

        const attendanceObject = JSON.parse(attendanceStatus);
        const formattedDate = new Date(data.attendanceDate).toLocaleDateString();

        dateSet.add(formattedDate);  // Collect unique dates

        // Map student attendance by date
        Object.keys(attendanceObject).forEach(studentId => {
          if (!newAttendanceMap[studentId]) {
            newAttendanceMap[studentId] = {};
          }
          newAttendanceMap[studentId][formattedDate] = attendanceObject[studentId];
        });
      });
 
      setAttendanceMap(newAttendanceMap);
      setUniqueDates([...dateSet]);

      console.log(newAttendanceMap);
      console.log(uniqueDates);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, [classItem]);

  const formatAttendance = (status) => {
    switch (status) {
      case 'present':
        return <span className="text-green-400 font-bold">P</span>;
      case 'absent':
        return <span className="text-red-400 font-bold">A</span>;
      case 'halfDay':
        return <span className="text-yellow-400 font-bold">HD</span>;
      case 'medical':
        return <span className="text-blue-400 font-bold">M</span>;
      default:
        return '-';
    }
  };

  const sortedUniqueDates = [...uniqueDates].sort((a, b) => new Date(b) - new Date(a));
  // Columns for react-table
  const columns = [
    {
        name: 'SR.No',
        selector: (row, idx) => idx + 1,
        sortable: false,
      },
      {
        name: 'Roll No',
        selector: (row) => "",
        sortable: false,
      },
      {
        name: 'Student Name',
        selector: (row) => row.firstName + ' ' + row.lastName,
        sortable: true,
      },
    // Dynamically add date columns
    ...sortedUniqueDates.map(date => ({
      name: date,
      selector: row => {
        const studentId = row.id.toString();
        return formatAttendance(attendanceMap[studentId]?.[date] || '-'); 
      }
    })),
  ];

  return (
    <div className='h-full mb-10'>
      <div className="flex flex-col mb-6">
        <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>{`Attendance: ${classItem.name} - ${classItem.section}`}</h1>
        <p className='mt-2'>Dashboard /<NavLink to='/admin'> Admin </NavLink>/ <NavLink to='/admin/classSelect'> Classes </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance</span> </p>
      </div>
      
      <Labels/>
      <div className="overflow-x-auto">  {/* Enable horizontal scrolling */}
        <Table
          columns={columns}  
          data={students}    
          searchOptions={[{ label: 'Student Name', value: 'name' }]}  // Optional search options
        />
      </div>
    </div>
  );
};

export default StdsAttendance;
