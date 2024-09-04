import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBook, faUser, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {

    // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#021933] text-white w-64">
      <nav className="p-5">
        <ul>
          {/* Dashboard Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="#" className="flex justify-between items-center">
              <div className='flex gap-1 justify-center items-center'>
                <FontAwesomeIcon icon={faHouse} className="mr-3" />
                Dashboard
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="mr-3" onClick={toggleDropdown} />
            </NavLink>
            {isDropdownOpen && (
                <ul className="text-sm font-normal pl-6 bg-[#051f3e] pb-5 mt-2">
                <li className="pt-5">
                  <NavLink to="/admin">
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Admin
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink to="/studentDashboard">
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Students
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink to="/parentsDashboard">
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Parents
                  </NavLink>
                </li>
                <li className="pt-5">
                  <NavLink to="/teacherDashboard">
                    <FontAwesomeIcon icon={faAngleRight} className="mr-3" />
                    Teachers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

            {/* User Section */}
            <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="/admin/user" className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              User
            </NavLink>
          </li>

          {/* School Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="/admin/school" className="flex items-center">
              <FontAwesomeIcon icon={faSchool} className="mr-3" />
              School
            </NavLink>
          </li>

          {/* Subject Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="/admin/subject" className="flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-3" />
              Subject
            </NavLink>
          </li>

          {/* Books Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to="/admin/books" className="flex items-center">
              <FontAwesomeIcon icon={faBookOpen} className="mr-3" />
              Books
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
