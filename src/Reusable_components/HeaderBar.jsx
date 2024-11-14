import React, { useEffect, useState } from 'react';
import Logout from './Logout';
import Attendance from './Attendance';

const HeaderBar = () => {
    const [att, setAtt] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

useEffect(() => {
    if(user.role == 4){
        setAtt(true)
    }
  }, [user.role]);
    return (
        <>
        <header className="flex items-center w-full justify-end border-b border-gray-300">
            {/* <div className='flex items-center w-full justify-end  border-b border-gray-300'> */}
            <Logout/>

            {att?<Attendance/>:''}
            
        </header>
        </>
    );
};

export default HeaderBar;
