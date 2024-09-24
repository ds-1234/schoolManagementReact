import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import HeaderBar from '../../Reusable_components/HeaderBar';
import GstSidebar from '../../Reusable_components/Sidebars/GstSidebar';

const GuestDashboard = () => {
  return (
    <Layout>
     <div className='flex gap-10'>
       {/* Sidebar */}
       <div className=" w-1/3 text-white flex flex-col sm:w-1/5 h-full ">
        <GstSidebar/>
      </div>

      {/* Main content */} 
      <div className="w-full mr-10">
        <HeaderBar/>
        <Outlet />
      </div>
     </div>
    </Layout>
  );
};

export default GuestDashboard;