import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import the attendance icon

function Attendance() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

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

  return (
    <div className="py-2">
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition ml-8 xl:ml-0"
        onClick={handleAtt}
      >
        <FontAwesomeIcon icon={faClock} className="md:mr-2" /> {/* Attendance icon */}
        <p className='hidden md:block'>Punch In</p>
      </button>
    </div>
  );
}

export default Attendance;
