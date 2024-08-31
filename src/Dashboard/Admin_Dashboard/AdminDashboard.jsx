import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import Sidebar from '../../Reusable_components/Sidebar';

const AdminDashboard = () => {
  return (
    <Layout>
     <div className='flex'>
       {/* Sidebar */}
       <div className=" w-1/3 text-white flex flex-col sm:w-1/5 min-h-screen">
        <Sidebar/>
      </div>

      {/* Main content */}
      <div className="">
        <Outlet />
      </div>
     </div>
    </Layout>
  );
};

export default AdminDashboard;

