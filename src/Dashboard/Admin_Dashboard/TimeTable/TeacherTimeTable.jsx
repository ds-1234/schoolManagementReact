import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import TeacherTTGrid from './TeacherTTGrid';

const TimetablePage = () => {
  const { teacherId } = useParams(); // Get teacherId from the route
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/timeTable/getTimeTable`);
        console.log(response.data.data);
        
        // Filter timetable for specific teacher based on teacherId
        const filteredTimetable = response.data.data.filter(
          (timetable) => timetable.teacherName?.id == parseInt(teacherId) 
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
  }, [teacherId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Teacher Timetable</h1>
      <p className='mt-2'>
        Dashboard / <NavLink to='/admin'>Admin</NavLink> / <NavLink to='/admin/home'>Home</NavLink> /
        <span className='text-[#ffae01] font-semibold'>Teacher Timetable</span>
      </p>

      <div>
        <h2 className="text-lg mb-4 text-black font-semibold mt-5">
          Timetable for Teacher ID: {teacherId}
        </h2>

        {/* Pass the timetable data to TeacherTTGrid */}
        {timetableData && timetableData.length > 0 ? (
          <TeacherTTGrid timetableData={timetableData} />
        ) : (
          <div>No timetable available for this teacher.</div>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;

