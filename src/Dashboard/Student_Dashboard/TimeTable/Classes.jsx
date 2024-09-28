import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classroom from '../../../assets/class.png';
import { NavLink } from 'react-router-dom';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch class data from API
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/class/getClassList');
        console.log(response.data.data);
        
        setClasses(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch class data');
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleClassClick = (classItem) => {
    navigate(`/studentDashboard/timetable/${classItem.name}/${classItem.section}`, {
      state: { classItem } 
    });
  };

  if (loading) {
    return <div>Loading classes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
    <p className='mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Classes</span> </p>
    <div className='mt-10'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Classes</h2>
      <div className="grid grid-cols-4 gap-5 pb-2 mx-20">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-lg font-semibold hover:bg-gray-400 hover:shadow-xl hover:text-white transition-transform transform hover:scale-105 cursor-pointer w-60 flex flex-col justify-center items-center"
            onClick={() => handleClassClick(classItem)}
          >
            <img src={classroom} alt="Class" className="w-28 h-28 px-4 py-4" />
            {classItem.name} - {classItem.section}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Classes;