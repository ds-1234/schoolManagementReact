import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentImg from '../../../assets/students.png'
import teacherImg from '../../../assets/teachers.png'
import { NavLink } from 'react-router-dom';
import Tile from '../../../Reusable_components/Tile';

const Select = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-start'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Attendance</h1>
    <p className='mt-2'><NavLink to = '/admin'> Dashboard  </NavLink>/  <span className='text-[#ffae01] font-semibold'>Attendance</span> </p>
    <div className='flex flex-col sm:flex-row items-center justify-center mt-10 sm:mt-24 mb-5 gap-5'>
      <Tile label={'Students'} icon={studentImg} path={'/admin/classSelect'} />
      <Tile label={'Teachers'} icon={teacherImg} path={'/admin/StaffAttendance'} />
    </div>
    </div>
  );
};

export default Select ;