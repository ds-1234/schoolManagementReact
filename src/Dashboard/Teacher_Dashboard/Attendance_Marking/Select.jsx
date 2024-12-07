import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentImg from '../../../assets/students.png'
import teacherImg from '../../../assets/teachers.png'
import { NavLink } from 'react-router-dom';

const SelectTile = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Attendance</h1>
    <p className='mt-2'><NavLink to = '/teacherDashboard'> Dashboard </NavLink>/  <span className='text-[#ffae01] font-semibold'>Attendance</span> </p>
    <div className='flex items-center justify-center mt-24 mb-5 gap-10'>
      {/* Students Tile */}
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105 p-8"
        onClick={() => navigate('/teacherDashboard/classSelect')}>
        <img src={studentImg} alt="Students" className="w-full object-cover px-4 py-4" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">Students</h3>
        </div>
      </div>

      {/* Teachers Tile */}
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105 p-8"
        onClick={() => navigate('/teacherDashboard/StaffAttendance')}>
        <img src={teacherImg} alt="Teachers" className="w-full py-4 px-4 object-cover" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">Self</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SelectTile ;