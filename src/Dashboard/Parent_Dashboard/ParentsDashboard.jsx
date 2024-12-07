import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import PntSidebar from '../../Reusable_components/Sidebars/PntSidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes , faArrowUp } from '@fortawesome/free-solid-svg-icons';

function ParentsDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="relative flex lg:m-0 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-3/4 max-w-xl transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:w-1/6`}
        >
          <PntSidebar />
        </div>

        {/* Toggle Button */}
        <button
          className="lg:hidden fixed top-4 left-36 z-50 p-2 text-gray-950"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars}  />
        </button>

        {/* Main Content */}
        <div className="w-full lg:mr-10 p-4 lg:p-0">
          <HeaderBar />
          <Outlet />
        </div>

        {/* Overlay for small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

         {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          className="fixed bottom-5 right-5 z-50 p-3 w-12 h-12 font-bold rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      </div>
    </Layout>
  );
}

export default ParentsDashboard;
