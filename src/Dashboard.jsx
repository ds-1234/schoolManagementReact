import React from 'react'
import { useLocation } from 'react-router-dom'

function Dashboard() {
    const location = useLocation() ;
    const data = location.state ;
  return (
    <div className='bg-[rgba(136,169,240,1)] h-screen text-center pt-20'>
        {
            data ? <h1 className='text-2xl text-semibold'>User Name : {data.firstName || data.username}</h1> 
            : 
            <h1 className='text-2xl text-semibold'>No Data is found</h1>
        }
    </div>
  )
}

export default Dashboard