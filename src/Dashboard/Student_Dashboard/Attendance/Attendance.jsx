import React, { useEffect, useState } from 'react';
import Calendar from '../../../Reusable_components/Calendar';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
// import Labels from '../../../Reusable_components/Labels';
import BASE_URL from '../../../conf/conf';

function Attendance() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [attendanceMap, setAttendanceMap] = useState({});
  const [statusMap, setStatusMap] = useState({});

  // Fetch attendance statuses
  const fetchAttendanceStatuses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Transform the response into a usable status map
      const statuses = response.data.data.reduce((map, { id, attendanceStatus }) => {
        map[id] = attendanceStatus;
        return map;
      }, {});

      setStatusMap(statuses);
      console.log('Status Map:', statuses);
    } catch (error) {
      console.error('Error fetching attendance statuses:', error);
      throw error; // Ensure fetchAttendanceData doesn't execute if this fails
    }
  };

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/getAttendanceList`, {
        headers: { 'Content-Type': 'application/json' },
      });

      const filteredAttendance = response.data.data.filter(
        (entry) => entry.className === user.className[0]
      );

      const newAttendanceMap = {};
      filteredAttendance.forEach(({ attendanceDate, attendanceStatusList }) => {
        const formattedDate = new Date(attendanceDate).toLocaleDateString();

        attendanceStatusList.forEach(({ studentId, attendanceStatusId }) => {
          if (studentId === user.id) {
            newAttendanceMap[formattedDate] = attendanceStatusId;
          }
        });
      });

      setAttendanceMap(newAttendanceMap);
      console.log('Attendance Map:', newAttendanceMap);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Fetch both APIs in sequence
  useEffect(() => {
    const fetchData = async () => {
        await fetchAttendanceStatuses();
        await fetchAttendanceData();
    };

    fetchData() ;
  }, [user.id]);

  return (
    <div>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Attendance</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance</span> </p> 


      <div className="flex items-center justify-around bg-white p-2 rounded-xl w-1/3 absolute right-5 top-32">
        {Object.entries(statusMap).map(([id, status]) => (
          <div key={id} className="flex items-center">
            <span className={`w-2 h-2 rounded-full mt-1 bg-${getColorForStatus(status)}`}></span>
            <span className="ml-2">- {status}</span>
          </div>
        ))}
      </div>

      <div className='w-1/2 ml-64 bg-white mt-10 rounded-xl'>
      <Calendar attendanceMap={attendanceMap} />
      </div>
    </div>

  );
}

// Helper function to determine colors for attendance statuses
const getColorForStatus = (status) => {
  const colorMap = {
    Present: 'green-400',
    Absent: 'red-400',
    'Half Day': 'yellow-400',
    Medical: 'blue-400',
    Holiday: 'orange-400',
  };
  return colorMap[status];
};

export default Attendance;

