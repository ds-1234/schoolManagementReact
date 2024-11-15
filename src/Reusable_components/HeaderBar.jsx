import React, { useEffect, useState } from 'react';
import Logout from './Logout';
import Attendance from './Attendance';

const HeaderBar = () => {
    const [att, setAtt] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data

    useEffect(() => {
        if (user.role != 3|| user.role!=5) {
            setAtt(true);
        }
    }, [user.role]);

    return (
        <header className="flex items-center w-full justify-between border-b border-gray-300">
            {/* Move Attendance to the start */}
            {att ? <Attendance /> : '_'}

            <Logout />
        </header>
    );
};

export default HeaderBar;
