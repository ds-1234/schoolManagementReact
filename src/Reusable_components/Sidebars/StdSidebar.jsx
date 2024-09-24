import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function StdSidebar() {
  return (
    <div className='bg-[#051f3e]'>
    <nav className="p-5">
      <ul>
        {/* Dashboard Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
          <NavLink to="/studentDashboard" className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-3 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>

      </li>
      </ul>
      </nav>
      </div>
  )
}

export default StdSidebar