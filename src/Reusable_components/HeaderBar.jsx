import React from 'react';
import Logout from './Logout';

const HeaderBar = () => {
    return (
        <header className="flex items-center w-full justify-end  border-b border-gray-300">
            <Logout/>
        </header>
    );
};

export default HeaderBar;
