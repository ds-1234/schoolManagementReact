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

  // Fetch attendance statuses
  const fetchAttendanceStatuses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`, {
        headers: { "Content-Type": "application/json" },
      });

      // Transform the response into a usable status map
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

      const dateSet = new Set() 
      const newAttendanceMap = {};
      filteredAttendance.forEach(({ attendanceDate, attendanceStatusList }) => {
        const formattedDate = new Date(attendanceDate).toLocaleDateString();

        dateSet.add(formattedDate); 

        attendanceStatusList.forEach(({ studentId, attendanceStatusId }) => {
          if (!newAttendanceMap[studentId]) {
            newAttendanceMap[studentId] = {};
          }
          newAttendanceMap[studentId][formattedDate] = attendanceStatusId ;
        });
      });

      setAttendanceMap(newAttendanceMap);
      setUniqueDates([...dateSet]);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAttendanceStatuses(); 
      await fetchAttendanceData()
    };

    fetchData();
  }, [classItem]);

  // Fetch students based on classItem
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const filteredStds = response.data.data.filter(user => user.role === 3);
      const filteredStudents = filteredStds.filter((std) => std.className?.includes(classItem.id));
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  useEffect(() => {
    fetchStudents();
  }, [classItem]);

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

  const sortedUniqueDates = [...uniqueDates].sort((a, b) => new Date(b) - new Date(a));
  // Columns for react-table
  const columns = [
    {
        name: 'SR.No',
        selector: (row, idx) => idx + 1,
        sortable: false,
        style: { position: 'sticky', left: '0px', zIndex: 2, backgroundColor: 'white' }
      },
      {
        name: 'Roll No',
        selector: (row) => row.rollNumber,
        sortable: false,
       style: { position: 'sticky', left: '50px', zIndex: 2, backgroundColor: 'white' }
      },
      {
        name: 'Student Name',
        selector: (row) => row.firstName + ' ' + row.lastName,
        sortable: true,
        style: { position: 'sticky', left: '100px', zIndex: 2, backgroundColor: 'white' } , 
        width: '180px'
      },
    // Dynamically add date columns
    ...sortedUniqueDates.map(date => ({
      name: date,
      selector: row => {
        return formatAttendance(statusMap[attendanceMap[row.id]?.[date]] || '-'); 
      },
      width: '120px'
    })),
  ];

  return (
    <div className='h-full mb-10'>
      <div className="flex flex-col mb-6">
        <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>{`Attendance: ${classItem.name} - ${classItem.section}`}</h1>
        <p className='mt-2'><NavLink to='/admin'>Dashboard </NavLink>/ <NavLink to='/admin/classSelect'> Classes </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance</span> </p>
      </div>
      
      <Labels/>
      <div className="overflow-x-auto max-w-7xl"> 
        <Table
          columns={columns}  
          data={students}    
          searchOptions={[{ label: 'Student Name', value: 'name' }]} 
        />
      </div>
    </div>
  );
};

export default StdsAttendance;
