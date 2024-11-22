import React from 'react';
import Profile from './StdDashboardComponents/Profile'; // Import the Profile component
import Attendance from './StdDashboardComponents/Attendance'; // Import the Attendance component

function Student() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

  // Sample attendance data, replace with real data as needed
  const totalDays = 28;
  const presentDays = 25;
  const absentDays = 2;
  const halfDays = 0;

  return (
    <div className="flex mt-20">
      {/* Profile Component in the Left Corner */}
      <div className="ml-5 w-1/3">
        <Profile 
          name={`${user.firstName} ${user.lastName}`}
          className="10th Grade" 
          rollNo="25" 
        />
      </div>

      {/* Attendance Component in the Right Side */}
      <div className="ml-6 w-2/3">
        <Attendance 
          totalDays={totalDays} 
          presentDays={presentDays} 
          absentDays={absentDays} 
          halfDays={halfDays} 
        />
      </div>
    </div>
  );
}

export default Student;
