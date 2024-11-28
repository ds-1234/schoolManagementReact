import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import Sidebar from '../../Reusable_components/Sidebars/Sidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';

const AdminDashboard = () => {
  return (
    <Layout>
     <div className='flex flex-col md:flex-row md:gap-5 md:m-0 overflow-hidden'>
       {/* Sidebar */}
       <div className=" w-full md:w-1/6 text-white flex flex-col h-full ">
        <Sidebar/>
      </div>

      {/* Main content */} 
      <div className="w-full md:mr-10 ">
        <HeaderBar/>
        <Outlet />
      </div>
     </div>
    </Layout>
  );
};

export default AdminDashboard;

