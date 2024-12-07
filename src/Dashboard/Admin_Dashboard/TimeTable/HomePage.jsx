import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentTT from '../../../assets/studying.png';
import teacherTT from '../../../assets/time.png';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
    <p className='mt-2'><NavLink to = '/admin'>Dashboard </NavLink>/  <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>
    <div className='flex items-center justify-center mt-24 mb-5 gap-5'>
      {/* Class Time Table Tile */}
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => navigate('/admin/classes')}>
        <img src={studentTT} alt="Class Time Table" className="w-full object-cover px-4 py-4" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">Class Time Table</h3>
        </div>
      </div>

      {/* Teacher Time Table Tile */}
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => navigate('/admin/teachers')}>
        <img src={teacherTT} alt="Teacher Time Table" className="w-full py-4 px-4 object-cover" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">Teacher Time Table</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
