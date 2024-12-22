import React , {useState}from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faCalendarDay, faBookOpen,faChildren,faFileLines, faClipboardUser , faAngleRight , faAngleDown } from '@fortawesome/free-solid-svg-icons';

function TchSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(prevDropdown => prevDropdown === dropdown ? null : dropdown);
  };

  const renderAngleIcon = (dropdown) => {
    return openDropdown === dropdown ? faAngleDown : faAngleRight;
  };

  return (
    <div>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide bg-[#051f3e] fixed text-white">
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
          to="/teacherDashboard/select"
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

       {/* Leaves Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherDashboard/leaves"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => toggleDropdown('leave')} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Leave
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('leave')} className="mr-3" onClick={() => toggleDropdown('leave')} />
            </NavLink>
            {openDropdown=='leave' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/teacherDashboard/leaves"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    List of Leaves
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/teacherDashboard/leaveRequest"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Approve Request
                  </NavLink>
                </li>
              </ul>
            )}
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
                             {/* <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/tchExamResult"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Exam Result
              
            </NavLink>
          </li> */}

          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/tchExamResult"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => toggleDropdown('exam')} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Examinations
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('exam')} className="mr-3" onClick={() => toggleDropdown('exam')} />
            </NavLink>
            {openDropdown=='exam' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/teacherDashboard/tchExamResult"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Result
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/teacherDashboard/tchExamSchedule"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Schedule
                  </NavLink>
                </li>
              </ul>
            )}
      </li>

      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/teacherdashboard/TchViewPaySlip"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => toggleDropdown('hrm')} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                HRM
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('exam')} className="mr-3" onClick={() => toggleDropdown('hrm')} />
            </NavLink>
            {openDropdown=='hrm' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/teacherDashboard/TchViewPaySlip"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    View PaySlip
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to="/teacherDashboard/tchExamSchedule"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Schedule
                  </NavLink>
                </li> */}
              </ul>
            )}
      </li>




      </ul>
      </nav>
      </div>
  )
}

export default TchSidebar