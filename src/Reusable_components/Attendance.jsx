import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button'
import { useState } from 'react';

function Attendance() {
    const navigate = useNavigate() 
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
      
      console.log(getFormattedIndianTime(),'formated time');
      const handleAtt = async () => {
    if (user && user.id) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // Format latitude and longitude to 4 decimal points
                const latitude = position.coords.latitude.toFixed(4);
                const longitude = position.coords.longitude.toFixed(4);
                const currentDateTime = getFormattedIndianTime();
                

                try {
                    const response = await fetch('http://localhost:8080/attendance/saveStaffAttendance', {
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
                    });

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
      <Button label="Attendance" onClick={handleAtt} />
    </div>
  )
}

export default Attendance