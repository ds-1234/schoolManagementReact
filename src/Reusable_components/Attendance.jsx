import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import the attendance icon
import axios from 'axios';

function Attendance() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [canPunchIn, setCanPunchIn] = useState(true);
  const userId = user.id;

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
              'http://localhost:8080/attendance/saveStaffAttendance',
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
        const response = await axios.get("http://localhost:8080/attendance/getStaffAttendance");
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

          setCanPunchIn(!hasPunchedInToday); // Disable "Punch In" if a record exists
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    checkAttendanceForToday();
  }, [userId]);

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
           <p>punched</p>
      )}
    </div>
  );
}

export default Attendance;
