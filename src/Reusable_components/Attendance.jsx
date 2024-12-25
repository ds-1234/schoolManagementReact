import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import the attendance icon
import axios from 'axios';
import BASE_URL from '../conf/conf';


function Attendance() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [canPunchIn, setCanPunchIn] = useState(true);
  const userId = user.id;
  const [loginTime, setLoginTime] = useState('');



  const formatTime = (time) => {
    const date = new Date(time);  // Parse the timestamp string
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  

  function getFormattedIndianTime() {
    // Get the current time in Indian Standard Time (IST)
    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const indianTime = new Date(now.getTime() + offset);

    // Format the time as required
    const formattedTime = indianTime.toISOString().replace('Z', '');
    return formattedTime;
  }



  const handleAtt = async () => {
    if (user && user.id) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Format latitude and longitude to 4 decimal points
          const latitude = position.coords.latitude.toFixed(4);
          const longitude = position.coords.longitude.toFixed(4);
          const currentDateTime = getFormattedIndianTime();

          try {
            const response = await fetch(
              `${BASE_URL}/attendance/saveStaffAttendance`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userTableId: user.id,
                  logindateTime: currentDateTime,
                  latitude: latitude,
                  longitude: longitude,
                }),
              }
            );

            if (response.ok) {
              console.log('Attendance saved successfully');
              setCanPunchIn(false)
              const formattedSaveTime = formatTime(response.data.logindateTime);
              setLoginTime(formattedSaveTime);


            } else {
              console.error('Error saving attendance');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location.');
        }
      );
    }
  };


  useEffect(() => {
    const checkAttendanceForToday = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendance`);
        if (response.data.success) {
          const attendanceData = response.data.data;

          // Get today's date in IST (Indian Standard Time)
          const now = new Date();
          const indianTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
          const todayDate = indianTime.toISOString().split("T")[0]; // Format as YYYY-MM-DD

          // Check if any record exists for the current user and today's date
          const hasPunchedInToday = attendanceData.some(
            (record) => record.userTableId === userId && record.attendanceDate === todayDate
          );
          const req = attendanceData.filter(
            (record) => record.userTableId === userId && record.attendanceDate === todayDate
          );
          
          console.log(req,'req')
          setCanPunchIn(!hasPunchedInToday); 
          const formattedGetTime = formatTime(req[0].logindateTime); // Access the first record's logindateTime
          setLoginTime(formattedGetTime);
          console.log(formattedGetTime,'formattedGetTime')
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    checkAttendanceForToday();
  }, [userId,canPunchIn]);

  return (
    <div className="py-2">
      {canPunchIn ? (
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition ml-8 xl:ml-0"
        onClick={handleAtt}
      >
        <FontAwesomeIcon icon={faClock} className="md:mr-2" /> {/* Attendance icon */}
        <p className='hidden md:block'>Punch In</p>
      </button>
      ):(
        <button
        className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-blue-600 transition ml-8 xl:ml-0"
      >
        <p>Login: {loginTime}</p>
      </button>
      )}
    </div>
  );
}

export default Attendance;
