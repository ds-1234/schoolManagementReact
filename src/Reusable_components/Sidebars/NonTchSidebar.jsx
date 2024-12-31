import React , {useState}from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faCalendarDay, faBookOpen,faChildren,faFileLines, faClipboardUser , faAngleRight , faAngleDown } from '@fortawesome/free-solid-svg-icons';

function NonTchSidebar() {
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
          <NavLink to="/NonTeachingDashboard" className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>
      </li>
      {/* HRM Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/NonTeachingDashboard/NonTchViewPaySlip"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => toggleDropdown('hrm')} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                HRM
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('hrm')} className="mr-3" onClick={() => toggleDropdown('hrm')} />
            </NavLink>
            {openDropdown=='hrm' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/NonTeachingDashboard/NonTchViewPaySlip"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    View PaySlip
                  </NavLink>
                </li>
              </ul>
            )}
      </li>
      </ul>
      </nav>
      </div>
  )
}

export default NonTchSidebar