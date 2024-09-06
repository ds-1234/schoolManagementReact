import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBook, faUser, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#051f3e] text-white w-64">
      <nav className="p-5">
        <ul>
          {/* Dashboard Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="#" className="flex justify-between items-center hover:bg-[#063256] p-2 hover:rounded-xl">
              <div className="flex gap-1 justify-center items-center">
                <FontAwesomeIcon icon={faHouse} className="mr-3" />
                Dashboard
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={toggleDropdown} />
            </NavLink>
            {isDropdownOpen && (
              <ul className="text-sm font-normal pl-6 bg-[#021933] pb-5 mt-2">
                <li className="pt-5">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Admin
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink
                    to="/studentDashboard"
                    className={({ isActive }) =>
                      `flex items-center hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Students
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink
                    to="/parentsDashboard"
                    className={({ isActive }) =>
                      `flex items-center hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Parents
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink
                    to="/teacherDashboard"
                    className={({ isActive }) =>
                      `flex items-center hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Teachers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* User Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256]  hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              User
            </NavLink>
          </li>

          {/* School Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/school"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faSchool} className="mr-3" />
              School
            </NavLink>
          </li>

          {/* Subject Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/subject"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faBook} className="mr-3" />
              Subject
            </NavLink>
          </li>

          {/* Books Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/books"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-3" />
              Books
            </NavLink>
          </li>

          {/* Class Class */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/class"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-3" />
              Grade
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

