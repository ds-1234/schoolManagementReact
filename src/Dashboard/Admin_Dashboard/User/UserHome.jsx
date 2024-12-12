import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modules from '../../../Reusable_components/Modules';
import active from '../../../assets/check.png';
import pending from '../../../assets/clock.png';
import role from '../../../assets/Icons/user-gear.png';
import school from '../../../assets/school.png';
import subject from '../../../assets/assessment.png';
import classImg from '../../../assets/class.png';
import bag from '../../../assets/suitcase.png';
import network from '../../../assets/network.png';
import event from '../../../assets/calendar.png';
import attendance from '../../../assets/attendance.png';

function UserHome({ moduleSelected }) {
    const [module, setModule] = useState({ label: '', list: [] });

    const userModule = [
        { label: 'Active Users', icon: active, path: '/admin/activeUser' },
        { label: 'Pending Users', icon: pending, path: '/admin/pendingUser' },
    ];

    const confModule = [
        { label: 'Role', icon: role, path: '/admin/role' },
        { label: 'School', icon: school, path: '/admin/school' },
        { label: 'Subject', icon: subject, path: '/admin/subject' },
        { label: 'Grade', icon: classImg, path: '/admin/class' },
        { label: 'Designation', icon: bag, path: '/admin/designation' },
        { label: 'Department', icon: network, path: '/admin/department' },
        { label: 'Event Category', icon: event, path: '/admin/eventcategory' },
        { label: 'Attendance Status', icon: attendance, path: '/admin/StaffAttendanceStatus' },
    ];

    useEffect(() => {
        if (moduleSelected === 'user') {
            setModule({ label: 'User', list: userModule });
        } else if (moduleSelected === 'conf') {
            setModule({ label: 'Configuration', list: confModule });
        } else {
            setModule({ label: 'Unknown Module', list: [] }); // Default handling
        }
    }, [moduleSelected]);

    return (
        <div className="flex flex-col justify-start pl-0">
            <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">
                {module?.label || 'Loading...'}
            </h1>
            <p className="mt-2">
                <NavLink to="/admin">Dashboard </NavLink>/ 
                <span className="text-[#ffae01] font-semibold">{module?.label || ''}</span>
            </p>
            {module?.list?.length > 0 ? (
                <Modules modules={module.list} />
            ) : (
                <p>No modules available.</p>
            )}
        </div>
    );
}

export default UserHome;
