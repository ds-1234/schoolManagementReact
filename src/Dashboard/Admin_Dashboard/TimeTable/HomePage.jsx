import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentTT from '../../../assets/studying.png';
import teacherTT from '../../../assets/time.png';
import { NavLink } from 'react-router-dom';
import Tile from '../../../Reusable_components/Tile';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
    <p className='mt-2'><NavLink to = '/admin'>Dashboard </NavLink>/  <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>
    <div className='flex flex-row items-center justify-center mt-10 sm:mt-24 mb-5 gap-5'>
      <Tile label={"Class Time Table"} icon={studentTT} path={'/admin/classes'} />
      <Tile label={"Teacher Time Table"} icon={teacherTT} path={'/admin/teachers'} />
    </div>
    </div>
  );
};

export default HomePage;
