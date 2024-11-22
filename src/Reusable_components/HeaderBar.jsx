import React, { useEffect, useState } from 'react';
import Logout from './Logout';
import Attendance from './Attendance';
import BASE_URL from '../conf/conf';
import axios from 'axios';

const HeaderBar = () => {
    const [att, setAtt] = useState(false);
    const [roleName , setRoleName] = useState('') ;

    const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

    useEffect(() => {
        if (user.role != 3|| user.role!=5) {
            setAtt(true);
        }
    }, [user.role]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/role/getRole/${user.role}`);
                setRoleName(res?.data?.data?.name || ''); 
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRoles();
    }, [user.role])

    return (
            <header className="flex items-center w-full justify-between border-b border-gray-300">
            {/* Move Attendance to the start */}
            {att ? <Attendance /> : '_'}
            
            <div className='flex flex-col text-black items-end'>
                <p><strong>{user.firstName} {user.lastName}</strong> </p>
                <p>as <strong>{roleName}</strong> </p>
            </div>

            <Logout />
            </header>
    );
};

export default HeaderBar;
