import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBook } from '@fortawesome/free-solid-svg-icons'; 

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[rgba(136,169,240,1)]">
      {/* Sidebar */}
      <div className=" w-1/5 bg-gray-200 text-blue-500 flex flex-col">
        <div className="p-6 text-3xl font-bold border-b border-gray-300">
          Admin Dashboard
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li className="mb-4 text-xl font-semibold">
              <NavLink 
                to="/admin/school" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-black hover:text-blue-300'}
              >
                 <FontAwesomeIcon icon={faSchool} className="mr-3" />
                School
              </NavLink>
            </li>
            <li className="mb-4 text-xl font-semibold">
              <NavLink 
                to="/admin/subject" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-semibold' : 'text-black hover:text-blue-300'}
              >
                <FontAwesomeIcon icon={faBook} className="mr-3" />
                Subject
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

