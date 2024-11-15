import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
// import Logout from '../../Reusable_components/Logout';
import PntSidebar from '../../Reusable_components/Sidebars/PntSidebar';
import HeaderBar from '../../Reusable_components/HeaderBar';

function ParentsDashboard() {
  return (
    <Layout>
     <div className='flex flex-col md:flex-row md:gap-5 md:m-0 overflow-hidden'>
       {/* Sidebar */}
       <div className=" w-full md:w-1/5 text-white flex flex-col h-full ">
       <PntSidebar/>
      </div>

      {/* Main content */}
      <div className='w-full md:mr-10'>
        <HeaderBar/>
        <Outlet />
      </div>
     </div>
    </Layout>
  )
}

export default ParentsDashboard