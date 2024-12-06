import React , { useState} from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import TchSidebar from '../../Reusable_components/Sidebars/TchSidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function TeacherDashboard() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Layout>
     <div className="relative flex gap-5 2xl:gap-5 2xl:m-0 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-3/4  transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out xl:static xl:transform-none xl:w-1/6`}
        >
          <TchSidebar />
        </div>

        {/* Toggle Button */}
        <button
          className={`xl:hidden absolute top-0 z-50 p-2 text-gray-950 ${isSidebarOpen ? "left-40 text-white" : 'top-6 left-4'}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars}  />
        </button>

        {/* Main Content */}
        <div className="w-full xl:mr-10 p-4 xl:p-0">
          <HeaderBar />
          <Outlet />
        </div>

        {/* Overlay for small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </Layout>
  )
}

export default TeacherDashboard