import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modules from '../Reusable_components/Modules';
import active from '../assets/check.png';
import pending from '../assets/clock.png';
import role from '../assets/Icons/user-gear.png';
import school from '../assets/school.png';
import subject from '../assets/assessment.png';
import classImg from '../assets/class.png';
import bag from '../assets/suitcase.png';
import network from '../assets/network.png';
import event from '../assets/calendar.png';
import attendance from '../assets/attendance.png';
import library from '../assets/bookstore.png'
import books from '../assets/books.png'
import form from '../assets/form.png'
import pendingForm from '../assets/document.png'
import promotion from '../assets/kindergarten.png'
import examType from '../assets/test.png'
import score from '../assets/score.png'
import rankings from '../assets/rankings.png'
import spending from '../assets/spending.png'
import salary from '../assets/salary.png'
import invoice from '../assets/invoice.png'
import transaction from '../assets/transaction.png'

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

    const libraryModule = [
        {label: 'Library' , icon: library, path: '/admin/books'},
        {label: 'Book Issue' , icon: books, path: '/admin/bookissue'}
    ]

    const studentModule = [
        {label: 'Admission Form' , icon: form, path: '/admin/AdmissionForm'},
        {label: 'Pending Admission Form' , icon: pendingForm, path: '/admin/pendingAdmissionForm'},
        {label: 'Student Promotion' , icon: promotion , path: '/admin/studentPromotion'}
    ]

    const examModule = [
        {label: 'Exam Type' , icon: examType, path: '/admin/Examinations'},
        {label: 'Exam Schedule' , icon: event, path: '/admin/Examschedule'},
        {label: 'Grade' , icon: score , path: '/admin/Grade'},
        {label: 'Exam Attendance' , icon: attendance , path: '/admin/Examattendance'},
        {label: 'Exam Results' , icon: rankings , path: '/admin/ExamTypeTiles'},
    ]

    const accountsModule = [
        {label: 'Expenses' , icon: spending, path: '/admin/Expenses'},
        {label: 'Expense Category' , icon: examType, path: '/admin/ExpenseCategory'},
        {label: 'Income' , icon: salary , path: '/admin/income'},
        {label: 'Invoices' , icon: invoice , path: '/admin/Invoices'},
        {label: 'Invoice View' , icon: form, path: '/admin/Invoiceview'},
        {label: 'Transactions' , icon: transaction, path: '/admin/Transactions'}
    ]

    useEffect(() => {
        if (moduleSelected === 'user') {
            setModule({ label: 'User', list: userModule });
        } else if (moduleSelected === 'conf') {
            setModule({ label: 'Configuration', list: confModule });
        } else if (moduleSelected === 'students') {
            setModule({ label: 'Students', list: studentModule });
        } else if (moduleSelected === 'library') {
            setModule({ label: 'Library', list: libraryModule });
        } else if (moduleSelected === 'exam') {
            setModule({ label: 'Examinations', list: examModule });
        }else if (moduleSelected === 'accounts') {
            setModule({ label: 'Accounts', list: accountsModule });
        }else {
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
