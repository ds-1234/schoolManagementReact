import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBook, faUser, faBookOpen, faPenRuler, faBookAtlas, faChildren } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isDashboardDropdown, setIsDashBoardDropdown] = useState(false);
  const [isStdDropdown , setIsStdDropdown] = useState(false) ;

  const toggleDropdown = () => {
    setIsDashBoardDropdown(!isDashboardDropdown);
  };

  const toggleStdDropdown = () => {
    setIsStdDropdown(!isStdDropdown);
  };

  return (
    <div className="h-full bg-[#051f3e] text-white w-64">
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
            {isDashboardDropdown && (
              <ul className="text-sm font-normal  flex items-center justify-center gap-1 flex-col bg-[#021933] py-2">
                <li >
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-16 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Admin
                  </NavLink>
                </li>
                <li >
                  <NavLink
                    to="/studentDashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-16  ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}/>
                    Students
                  </NavLink>
                </li>
                <li >
                  <NavLink
                    to="/parentsDashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-16  ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Parents
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/teacherDashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-16 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
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
              <FontAwesomeIcon icon={faBookAtlas} className="mr-3" />
              Library
            </NavLink>
          </li>

          {/* Class Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/class"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <FontAwesomeIcon icon={faPenRuler} className="mr-3" />
              Grade
            </NavLink>
          </li>

          {/* Student Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faChildren} className="mr-3" />
                Students
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={toggleStdDropdown} />
            </NavLink>
            {isStdDropdown && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/AllStudents"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    All Students
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/AdmissionForm"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Admission Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/studentDetails"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Student Details 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/studentPromotion"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Student Promotion 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

