import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faCalendarDay , faBookOpen,faChildren ,faFileLines , faClipboardUser} from '@fortawesome/free-solid-svg-icons';

function StdSidebar() {
  return (
    <div className='bg-[#051f3e] fixed h-screen '>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide">
      <ul>
        {/* Dashboard Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
          <NavLink to="/studentDashboard" className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>
      </li>
      {/* Attendance Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/attendance"
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
              to="/studentDashboard/timetable"
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
          to="/studentDashboard/homework"
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
          to="/studentDashboard/holidays"
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
              to="/studentDashboard/stdsports"
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
          to="/studentDashboard/stdnotice"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
            Notice
          
        </NavLink>
      </li>
      </ul>
      </nav>
      </div>
  )
}

export default StdSidebar