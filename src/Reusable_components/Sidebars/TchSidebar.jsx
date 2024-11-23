import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faCalendarDay, faBookOpen,faChildren,faFileLines, faClipboardUser } from '@fortawesome/free-solid-svg-icons';

function TchSidebar() {
  return (
    <div className='bg-[#051f3e] fixed h-full '>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide">
      <ul>
        {/* Dashboard Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
          <NavLink to="/teacherDashboard" className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>
      </li>
      {/* Profile Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/teacherDashboard/profile"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faClipboardUser} className="mr-3 text-[#ffae01]" />
            Profile
          
        </NavLink>
      </li>
      {/* Attendance Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/teacherDashboard/classSelect"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faClipboardUser} className="mr-3 text-[#ffae01]" />
            Attendance
          
        </NavLink>
      </li>
      {/* Time Table Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/teacherDashboard/timetable"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faCalendarDay} className="mr-4 text-[#ffae01]" />
            Time Table
          
        </NavLink>
      </li>

      {/* HomeWork Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/teacherDashboard/homework"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Home work
          
        </NavLink>
      </li>
      {/* Holidays Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/teacherDashboard/teaholidays"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Holidays
          
        </NavLink>
      </li>
                        {/* Sports section */}
    <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherDashboard/teasports"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faChildren} className="mr-2 text-[#ffae01]" />
                Sports
            </NavLink>
          </li>
                              {/* Notice Board Section */}
                              <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/teanotice"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Notice
              
            </NavLink>
          </li>
                             {/* Events Section */}
                             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/TeaEvent"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Event
              
            </NavLink>
          </li>
                             {/* Events Section */}
                             {/* <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/TeaEvent"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Event
              
            </NavLink>
          </li> */}
                             {/* tchBookIssue Section */}
                             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/tchBookIssue"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Book Issue
              
            </NavLink>
          </li>
                             {/* tchExamResult Section */}
                             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/tchExamResult"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Exam Result
              
            </NavLink>
          </li>
                             {/* StaffAttendance Section */}
                             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/AllStaffAttendance"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Staff Attendance
              
            </NavLink>
          </li>
      </ul>
      </nav>
      </div>
  )
}

export default TchSidebar