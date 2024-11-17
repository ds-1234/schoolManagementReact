import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom'; // Use useParams for cleaner access
import axios from 'axios'; 
import AddBtn from '../../../../Reusable_components/AddBtn';
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../../conf/conf';
import AddExamSchedule from './AddExamSchedule';

const ExamSchedule = () => {

  const [loading, setLoading] = useState(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);



  const handleAddClick = () => {
    openAddPopup()
  }



  // if (error) {
  //   return <div>Error: {error}</div>; 
  // }

  return (
    <div className='flex flex-col justify-start pl-0'>
        <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Exam Schedule</h1>
        <p className='pl-0 mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/<NavLink to = '/admin/Examinations'> Examinations </NavLink>/ <span className='text-[#ffae01] font-semibold'>Exam Schedule</span> </p>

    
      <AddBtn onAddClick={handleAddClick} />
      <AddExamSchedule isOpen={isAddPopupOpen} onClose={closeAddPopup} />
     {/* <div>
        <h2 className="text-lg mb-4 text-black font-semibold mt-5">
          Time Table for {classItem.name} - {classItem.section}
        </h2>
        <TimetableGrid timetableData={timetableData}/>
    </div>  */}
    </div>
  );
};

export default ExamSchedule;

