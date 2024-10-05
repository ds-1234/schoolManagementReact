import React, { useEffect, useState } from 'react';
import {useLocation, useParams } from 'react-router-dom'; // Use useParams for cleaner access
import axios from 'axios'; 
import TimetableGrid from './TimetableGrid';
import AddBtn from '../../../Reusable_components/AddBtn';
import AddTimeTable from './AddTimeTable';
import { NavLink } from 'react-router-dom';

const TimetablePage = () => {
  const { classItem } = useLocation().state;
  const {className , section} = useParams()
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/timeTable/getTimeTable`);

        setTimetableData(response.data.data); 
        console.log(response.data.data);
        console.log(classItem);
        
        
      } catch (error) {
        // setError(error.message || 'Something went wrong'); 
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [classItem]); 

  const handleAddClick = () => {
    openAddPopup()
  }

  if (loading) {
    return <div>Loading...</div>; 
  }

  // if (error) {
  //   return <div>Error: {error}</div>; 
  // }

  return (
    <div className='flex flex-col justify-start pl-0'>
        <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
        <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <NavLink to='/admin/home'> Home  </NavLink>/ <NavLink to='/admin/classes'>Classes /</NavLink>  <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>

    
      <AddBtn onAddClick={handleAddClick} />
      <AddTimeTable isOpen={isAddPopupOpen} onClose={closeAddPopup} classItem={classItem}/>
     <div>
        <h2 className="text-lg mb-4 text-black font-semibold mt-5">
          Time Table for {className} - {section}
        </h2>
        <TimetableGrid classID={classItem.id} />
    </div> 
    </div>
  );
};

export default TimetablePage;

