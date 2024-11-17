import React, { useEffect, useState } from 'react';
import Calendar from '../../../Reusable_components/Calendar';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Labels from '../../../Reusable_components/Labels';
import BASE_URL from '../../../conf/conf';

function Attendance() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [attendanceMap, setAttendanceMap] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${BASE_URL}/attendance/getAttendanceList`,
        headers: {
          "Content-Type": "application/json"
        }
      });

      const filterClass = response.data.data.filter(data => data.className === user.className[0]);
      console.log(filterClass);

      const newAttendanceMap = {};

      filterClass.forEach((data) => {
        // Convert attendenceStatus from string format to JSON format
        const attendanceStatus = data.attendenceStatus
          .replace(/(\d+)=/g, '"$1":')  
          .replace(/([a-zA-Z]+)/g, '"$1"'); 

        // Parse the attendanceStatus string to an object
        const attendanceObject = JSON.parse(attendanceStatus);
        const formattedDate = new Date(data.attendanceDate).toLocaleDateString()
        
        // Check if the current user ID exists in the attendanceStatus
        if (attendanceObject[user.id]) {
          newAttendanceMap[formattedDate] = attendanceObject[user.id];
        }
      });

      // Update the attendanceMap state
      setAttendanceMap(newAttendanceMap);
      console.log(newAttendanceMap);

    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  return (
    <div>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Attendance</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance</span> </p> 

       <div className="flex items-center justify-around bg-white p-2 rounded-xl w-1/3 absolute right-5 top-32">
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full mt-1 bg-green-400"></span>
        <span className="ml-2">- Present</span>
      </div>
      <div className="flex items-center">
      <span className="w-2 h-2 rounded-full mt-1 bg-red-400"></span>
        <span className="ml-2">- Absent</span>
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full mt-1 bg-yellow-400"></span>
        <span className="ml-2">- Half Day</span>
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full mt-1 bg-blue-400"></span>
        <span className="ml-2">- Medical</span>
      </div>
      <div className="flex items-center">
        <span className="w-2 h-2 rounded-full mt-1 bg-orange-400"></span>
        <span className="ml-2">- Holiday</span>
      </div>
    </div>
      <div className='w-1/2 ml-64 bg-white mt-10 rounded-xl'>
      <Calendar attendanceMap={attendanceMap} />
      </div>
    </div>

  );
}

export default Attendance;

