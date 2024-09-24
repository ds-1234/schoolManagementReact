import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import Logout from '../../Reusable_components/Logout';
import PntSidebar from '../../Reusable_components/Sidebars/PntSidebar';

function ParentsDashboard() {
  return (
    <Layout>
     <div className='flex gap-10'>
       {/* Sidebar */}
       <div className=" w-1/3 text-white flex flex-col sm:w-1/5 ">
       <PntSidebar/>
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

export default ParentsDashboard