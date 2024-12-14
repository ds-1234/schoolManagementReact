import React , {useState , useEffect} from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import Sidebar from '../../Reusable_components/Sidebars/Sidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes , faArrowUp } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
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
    <div className="relative flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-3/4  transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out xl:static xl:transform-none xl:w-1/6`}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen}/>
        </div>

        {/* Toggle Button */}
        <button
          className={`xl:hidden absolute top-0 z-50 p-2 text-gray-950 ${isSidebarOpen ? "left-40 text-white" : 'top-6 left-4'}`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars}  />
        </button>

        {/* Main Content */}
        <div className="w-full xl:w-5/6 xl:mr-10 p-4 xl:p-0">
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
};

export default AdminDashboard;

