import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';

const TchExamSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]); // State for classes
  const [examSchedule, setExamSchedule] = useState([]); // State for exam schedule
  const navigate = useNavigate();
  const [classesName, setClassesName] = useState([]); // State for classes


  // Fetch exam schedule data from the API
  // const fetchExamSchedule = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/exam/getExam`);
  //     if (response.data && response.data.success) {
  //       setExamSchedule(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching exam schedule:', error);
  //   }
  // };

  // Fetch class data from the API
  const fetchClasses = async () => {
    try {
      const teacherData = JSON.parse(sessionStorage.getItem('teacherData'));
      if (teacherData && teacherData.classSubjectEntity) {
        const classSubjectEntity = teacherData.classSubjectEntity;

        // Filter and map valid classes
        const validClasses = classSubjectEntity
          .filter((entity) => entity.classId !== null)
          .map((entity) => ({
            id: entity.classId,
            name: entity.className,
            section: entity.classSection,
          }));

        // Ensure unique classes
        const uniqueClasses = Array.from(
          new Map(validClasses.map((cls) => [cls.id, cls])).values()
        );
        console.log(uniqueClasses,'uniqueClasses')

        setClasses(uniqueClasses);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchClassName = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/class/getClassList`); // Replace with your actual API endpoint
      if (response.data && response.data.success) {
        const activeClasses = response.data.data.filter((cls) => cls.isActive); // Filter active classes
        setClassesName(activeClasses);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get class name by ID
  const getClassNameById = (id) => {
    console.log(classesName,'classesname')
    const classData = classesName.find((cls) => cls.id == id);
    return classData ? `${classData.name}` : 'Class not found';
  };

  // Fetch all data on component mount
  useEffect(() => {
    // fetchExamSchedule();
    fetchClasses();
    fetchClassName()
  }, []);

  // Handle tile click
  const handleTileClick = (classId) => {
    navigate('/teacherDashboard/ClassExamSchedulePage', { state: { classId } }); // Navigate with state
  };

  return (
    <div className="flex flex-col justify-start pl-0">
      <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">Exam Schedule</h1>
      <p className="pl-0 mt-2">
        <NavLink to="/teacherDashboard"> Dashboard </NavLink>/<NavLink to="/teacherDashboard/tchExamResult"> Examinations </NavLink>/
        <span className="text-[#ffae01] font-semibold">Exam Schedule</span>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="p-4 border rounded shadow-md bg-white hover:bg-gray-100 cursor-pointer"
            onClick={() => handleTileClick(cls.id)}
          >
            <h2 className="text-lg font-semibold text-gray-800">{getClassNameById(cls.id)}</h2>
            {/* <p className="text-sm text-gray-600">Section: {cls.section}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TchExamSchedule;
