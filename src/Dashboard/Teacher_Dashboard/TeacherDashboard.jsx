import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import Sidebar from '../../Reusable_components/Sidebar';
import Logout from '../../Reusable_components/Logout';

function TeacherDashboard() {
  return (
    <Layout>
    <div className='flex gap-10'>
      {/* Sidebar */}
      <div className=" w-1/3 text-white flex flex-col sm:w-1/5 ">
       <Sidebar/>
     </div>

     {/* Main content */}
     <div className='w-full mr-10'>
      <Logout/>
       <Outlet />
     </div>
    </div>
   </Layout>
  )
}

export default TeacherDashboard