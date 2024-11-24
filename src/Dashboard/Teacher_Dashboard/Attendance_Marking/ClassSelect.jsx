import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classImg from '../../../assets/class.png'
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';

const ClassSelect = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const teacherData = JSON.parse(sessionStorage.getItem('teacherData')) ;
  
  const [classMap, setClassMap] = useState({});
  const [classes , setClasses] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCls = () => {
      axios({
        method: 'GET',
        url: `${BASE_URL}/class/getClassList`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Data from API:', response.data.data);
        
          const classSubjectIds = teacherData.classSubjectEntity.map((item) => parseInt(item?.classId));

          console.log(classSubjectIds);
          
        // Filter and map classes from the API based on class IDs
        const filteredClasses = response.data.data.filter((cls) =>
          classSubjectIds.includes(cls.id)
        );

        // Create a map for easy access and set the state
        const classesMap = {};
        filteredClasses.forEach((cls) => {
          classesMap[cls.id] = cls;
        });

        setClassMap(classesMap);
        setClasses(filteredClasses);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    fetchCls()
  }, []);

  const handleClassSelect = (classItem) => {
    navigate(`/teacherDashboard/attendance/${classItem.name}/${classItem.section}`, { state: { classItem } });
  };


  return (
    <div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Attendance</h1>
    <p className='mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher </NavLink>/  <span className='text-[#ffae01] font-semibold'>Classes</span> </p>
    <div className='mt-10'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Classes</h2>
      <div className="grid grid-cols-3 pb-5">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-lg font-semibold hover:bg-gray-400 hover:shadow-xl hover:text-white transition-transform transform hover:scale-105 cursor-pointer w-72 flex flex-col justify-center items-center"
            onClick={() => handleClassSelect(classItem)}
          >
            <img src={classImg} alt="Class" className="w-28 h-28 px-4 py-4" />
            {classItem.name} - {classItem.section}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ClassSelect;
