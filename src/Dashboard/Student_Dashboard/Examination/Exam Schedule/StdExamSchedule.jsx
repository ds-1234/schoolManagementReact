import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import StdClassWiseExamSchedulepopup from './StdClassWiseExamSchedulepopup';

const StdExamSchedule = () => {
  const [examSchedule, setExamSchedule] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [className, setClassName] = useState(null);

  const openEditPopup = (exam, className) => {
    setClassName(className);
    setSelectedExam(exam);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setClassName(null);
    setIsEditPopupOpen(false);
    setSelectedExam(null);
  };

  const fetchExamSchedule = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/exam/getExam`);
      const data = response.data.data;
      if (response.data && response.data.success) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.className) {
          const filteredExamSchedule = data.filter(schedule =>
            user.className.includes(schedule.className)
          );
          setExamSchedule(filteredExamSchedule);
        }
      }
    } catch (error) {
      console.error('Error fetching exam schedule:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/class/getClassList`);
      if (response.data && response.data.success) {
        setClasses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchExamTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/examType/getExamTypeList`);
      if (response.data && response.data.success) {
        setExamTypes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };

  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find(type => type.id === examTypeId);
    return examType ? examType.examTypeName : 'Unknown Exam Type';
  };

  const getClassNameById = (classId) => {
    const classObj = classes.find(cls => cls.id === classId);
    return classObj ? `${classObj.name} ${classObj.section}` : 'Unknown Class';
  };

  useEffect(() => {
    fetchExamSchedule();
    fetchClasses();
    fetchExamTypes();
  }, []);

  return (
    <div className='flex flex-col justify-start pl-0'>
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Exam Schedule</h1>
      <p className='pl-0 mt-2'>
        <NavLink to='/studentDashboard'> Dashboard </NavLink>/<NavLink to='/studentDashboard/stdExamResult'> Examinations </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Exam Schedule</span>
      </p>

      {/* Tiles for Exam Names */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6'>
        {examSchedule.map((exam, idx) => (
          <div
            key={idx}
            className='p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg transform hover:scale-105 hover:z-10 transition-transform duration-300 ease-in-out cursor-pointer overflow-hidden'
            onClick={() => openEditPopup(exam, getClassNameById(exam.className))}
            style={{ transformOrigin: 'center' }} // Ensures the tile scales from the center
          >
            <h2 className='text-2xl font-bold text-white'>{getExamTypeNameById(exam.examName)}</h2>
            <p className='text-sm text-gray-200 mt-2'>{getClassNameById(exam.className)}</p>
            <div className='mt-4'>
              <span className='text-sm text-gray-100'>Click to view details</span>
            </div>
          </div>
        ))}
      </div>

      {/* Class Wise Exam Schedule Popup */}
      {selectedExam && (
        <StdClassWiseExamSchedulepopup
          subjectWiseExamList={selectedExam.subjectWiseExamList}
          className={className}
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
};

export default StdExamSchedule;
