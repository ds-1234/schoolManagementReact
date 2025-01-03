import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherTTGrid from '../../Admin_Dashboard/TimeTable/Teacher/TeacherTTGrid';
import BASE_URL from '../../../conf/conf';
import { NavLink, useNavigate } from 'react-router-dom';

const Timetable = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/timeTable/getTimeTable`);
        console.log(response.data.data);
        
        // Filter timetable for specific teacher based on teacherId
        const filteredTimetable = response.data.data.filter(
          (timetable) => timetable.userId == user.id
        );
        console.log(filteredTimetable);
        setTimetableData(filteredTimetable);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='h-full mb-10'>
    
          <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Time Table</h1>
          <p className='mt-2'><NavLink to = '/teacherDashboard'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Time table</span> </p>
         

      <div>
        <h2 className="text-lg mb-4 text-black font-semibold mt-5">
          Timetable for Teacher :
        </h2>

        {/* Pass the timetable data to TeacherTTGrid */}
        {timetableData && timetableData.length > 0 ? (
          <TeacherTTGrid timetableData={timetableData} />
        ) : (
          <div className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center">
          <p className=" text-md text-black">There are no records to display</p>
        </div>
              )}
      </div>
    </div>
  );
};

export default Timetable;