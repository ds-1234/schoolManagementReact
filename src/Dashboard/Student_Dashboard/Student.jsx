import React from 'react';
import Profile from './StdDashboardComponents/Profile'; // Import the Profile component
import Attendance from './StdDashboardComponents/Attendance'; // Import the Attendance component
import TodaysClasses from './StdDashboardComponents/TodaysClasses'; // Import the TodaysClasses component
import DashboardCards from './StdDashboardComponents/DashboardCards'; // Import the DashboardCards component
import Schedules from './StdDashboardComponents/Schedules'; // Import the Schedules component
import HomeWorks from './StdDashboardComponents/HomeWorks'; // Import the HomeWorks component
import ClassFaculties from './StdDashboardComponents/ClassFaculties'; // Import the ClassFaculties component
import LeaveStatus from './StdDashboardComponents/LeaveStatus'; // Import the LeaveStatus component
import ExamResult from './StdDashboardComponents/ExamResult';
import FeesReminder from './StdDashboardComponents/FeesReminder';
import NoticeBoard from './StdDashboardComponents/NoticeBoard';
import Syllabus from './StdDashboardComponents/Syllabus';

function Student() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

  // Sample attendance data, replace with real data as needed
  const totalDays = 28;
  const presentDays = 25;
  const absentDays = 2;
  const halfDays = 0;

  return (
    <div className="flex flex-col mt-20 space-y-10 px-5">
      {/* Top Section: Profile */}
      <div className="flex">
        {/* Profile Component in the Left Corner */}
        <div className="w-1/3">
          <Profile 
            name={`${user.firstName} ${user.lastName}`}
            className="10th Grade" 
            rollNo="25" 
          />
        </div>
        
        {/* Attendance Component in the Right Side */}
        <div className="w-2/3 ml-6">
          <Attendance 
            totalDays={totalDays} 
            presentDays={presentDays} 
            absentDays={absentDays} 
            halfDays={halfDays} 
          />
        </div>
      </div>

      {/* Bottom Section: TodaysClasses */}
      <div className="flex flex-col mt-6">
        <TodaysClasses />
      </div>

      {/* Section with 4 Dashboard Cards */}
      <DashboardCards className="mb-5 pb-5" />
      
      {/* Middle Section: Schedule */}
      <div className="flex flex-col mt-6">
        <Schedules />
      </div>

      {/* HomeWorks Section */}
      <div className="flex flex-col mt-6">
        <HomeWorks
         />
      </div>

      {/* Section: Class Faculties */}
      <div className="flex flex-col mt-6">
        <ClassFaculties />
      </div>

      {/* Section: Leave Status */}
      {/* <div className="flex flex-col mt-6">
        <LeaveStatus />
      </div>
      <div className="flex flex-col mt-6">
        <ExamResult />
      </div> */}

      <div className="flex">
        {/* Profile Component in the Left Corner */}
        <div className="w-1/2">
        <LeaveStatus />

        </div>
        
        {/* Attendance Component in the Right Side */}
        <div className="w-1/2 ml-6">
        <ExamResult />
        </div>

    </div>
        <div className="flex flex-col mt-6">
        <FeesReminder/>
      </div> 
        <div className="flex flex-col mt-6">
        <NoticeBoard/>
      </div> 
        <div className="flex flex-col mt-6">
        <Syllabus/>
      </div> 
    </div>
  );
}

export default Student;
