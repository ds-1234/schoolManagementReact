import React, { useEffect, useState } from 'react';
import {useLocation, useParams } from 'react-router-dom'; // Use useParams for cleaner access
import axios from 'axios'; 
import TimetableGrid from '../../Admin_Dashboard/TimeTable/TimetableGrid';
import { NavLink } from 'react-router-dom';

const StdTimetable = () => {
  const { classItem } = useLocation().state;
  const {className , section} = useParams()
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/timeTable/getTimeTable`);

        setTimetableData(response.data.data); 
        console.log(response.data.data);
        console.log(classItem);
        
        
      } catch (error) {
        setError(error.message || 'Something went wrong'); 
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [classItem]); 


  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
        <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
        <p className='mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <NavLink to='/studentDashboard/timetable'>Classes /</NavLink>  <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>

     <div>
        <h2 className="text-lg mb-4 text-black font-semibold mt-5">
          Time Table for {className} - {section}
        </h2>
        <TimetableGrid selectedClass={className} selectedSection={section} />
    </div> 
    </div>
  );
};

export default StdTimetable;