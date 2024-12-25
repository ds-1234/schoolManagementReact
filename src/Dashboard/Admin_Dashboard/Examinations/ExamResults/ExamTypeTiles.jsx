import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom"; 
import BASE_URL from '../../../../conf/conf';


const ExamTypeTiles = () => {
  const [examResults, setExamResults] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the exam data from the API
    axios
      .get(`${BASE_URL}/exam/getExamResult`)
      .then((response) => {
        if (response.data.success) {
          setExamResults(response.data.data);
        } else {
          console.error("Failed to fetch exam results");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Handle tile click to navigate to the class data page with filtered data
  const handleTileClick = (examTypeId) => {
    const filteredExamData = examResults.filter(
      (exam) => exam.examData.examType === examTypeId
    );
    navigate("/admin/ExamTypeTiles/ClassNameTiles", {
      state: { examData: filteredExamData, examTypeId: examTypeId }, // Send filtered data and examTypeId
    });
    console.log(filteredExamData, 'filteredExamData');
  };

  // Get unique exam types from the fetched data
  const uniqueExamTypes = [
    ...new Set(examResults.map((exam) => exam.examData.examType)),
  ];

  const fetchExamTypes = () => {
    axios
      .get(`${BASE_URL}/examType/getExamTypeList`)
      .then((response) => {
        if (response.data.success) {
          setExamTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam types:", error);
      });
  };
  useEffect(()=>{
    fetchExamTypes();
  })

  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find((type) => type.id == examTypeId);
    return examType ? examType.examTypeName : "Unknown";
  };

  return (
    <div>
                <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Exam Type</h1>
                <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Exam Type</span> </p>
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {uniqueExamTypes.map((examTypeId) => {
        // Filter the data to get exam information for the current examTypeId
        const examType = examResults.filter((exam) => exam.examData.examType === examTypeId);
        const examTypeName = `Exam Type ${getExamTypeNameById(examTypeId)}`;  // Customize this if you have names for exam types

        return (
          <div
            key={examTypeId}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => handleTileClick(examTypeId)}
          >
            <h2 className="text-xl font-semibold">{examTypeName}</h2>
            <p>Total Exams: {examType.length}</p>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ExamTypeTiles;
