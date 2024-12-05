import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse , faChildren } from '@fortawesome/free-solid-svg-icons';

function PntSidebar() {
  return (
    <div>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide bg-[#051f3e] fixed text-white ">
      <ul>
        {/* Dashboard Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
          <NavLink to="/parentsDashboard" 
          className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-3 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>
      </li>

      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
      <NavLink
        to={'/parentsDashboard/childDetail'}
          className={({ isActive }) =>
            `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
          <div className='flex items-center justify-start gap-1'>
            <FontAwesomeIcon  icon={faChildren} className=" mr-2 text-[#ffae01]" />
            Students
          </div>
        </NavLink>
      </li>
      </ul>
      </nav>
      </div>
  )
}

export default PntSidebar