import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import TchSidebar from '../../Reusable_components/Sidebars/TchSidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';

function TeacherDashboard() {
  return (
    <Layout>
     <div className='flex flex-col md:flex-row md:gap-10 md:m-0 overflow-hidden'>
       {/* Sidebar */}
       <div className=" w-full md:w-1/5 text-white flex flex-col h-full ">
        <TchSidebar/>
      </div>

      {/* Main content */} 
      <div className="w-full md:mr-10 ">
        <HeaderBar/>
        <Outlet />
      </div>
     </div>
    </Layout>
  )
}

export default TeacherDashboard