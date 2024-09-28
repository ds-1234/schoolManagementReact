import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../Reusable_components/Button';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(''); // State to store selected teacher
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teachers data from API
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getUserList', {
          headers: { 'Content-Type': 'application/json' },
        });
        const filteredTeachers = response.data.data.filter(user => user.role.name === 'Teacher');
        setTeachers(filteredTeachers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load teachers.');
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedTeacher(e.target.value); 
  };

  const handleNavigate = () => {
    console.log(selectedTeacher);
    
      if(selectedTeacher){
        navigate(`/teacherDashboard/timetable/${selectedTeacher}`); 
      }
    
  };

  if (loading) {
    return <div>Loading teachers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Time Table</h1>
      <p className='mt-2'>
        Dashboard / 
        <span className='text-[#ffae01] font-semibold'>Teachers</span>
      </p>
      <div className='mt-10'>
        <label 
          htmlFor="teacher" 
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Select Teacher
        </label>
        <select
          id="teacher"
          value={selectedTeacher}
          onChange={handleSelectChange}
          className="block w-1/2 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className='hidden'>Select a Teacher</option>
          {teachers.map((tch) => (
            <option key={tch.id} value={tch.id}>{tch.firstName}</option>
          ))}
        </select>
        <Button onClick={handleNavigate} label='Go to TimeTable' className='mt-10'/>
      </div>
      </div>
  );
};

export default Teachers;
