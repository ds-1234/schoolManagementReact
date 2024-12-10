import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../../conf/conf';

function StdExamResult() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Retrieve user from session storage
  const [filteredData, setFilteredData] = useState({});
  const navigate = useNavigate();
  const [examTypes, setExamTypes] = useState([]);


  // Fetch Exam Result Data
  const fetchExamResults = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/exam/getExamResult`);
      if (response.data && response.data.success) {
        // Filter data based on the current user ID
        const filtered = response.data.data.filter(item => item.studentId === user.id);
        // Group data by examType
        const grouped = filtered.reduce((acc, item) => {
          const examType = item.examData.examType;
          if (!acc[examType]) {
            acc[examType] = [];
          }
          acc[examType].push(item);
          return acc;
        }, {});
        setFilteredData(grouped); // Store grouped data
      }
    } catch (error) {
      console.error("Error fetching exam results:", error);
    }
  };

  const fetchExamTypes = () => {
    axios
      .get("http://localhost:8080/examType/getExamTypeList")
      .then((response) => {
        if (response.data.success) {
          setExamTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching exam types:", error);
      });
  };

  useEffect(() => {
    fetchExamResults();
    fetchExamTypes()
  }, []);

  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find((type) => type.id == examTypeId);
    return examType ? examType.examTypeName : "Unknown";
  };

  const handleTileClick = (examType) => {
    navigate(`/studentDashboard/ExamDetails`, { state: { data: filteredData[examType] } });
  };

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Results</h1>
      <p className="mt-2">
      <NavLink to = '/studentDashboard'> Dashboard </NavLink> /       <span className="text-[#ffae01] font-semibold">Exam Results</span>
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.keys(filteredData).map(examType => (
          <div
            key={examType}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => handleTileClick(examType)}
          >
            <h2 className="text-xl font-bold mb-2"> {getExamTypeNameById(examType)}</h2>
            <p className="text-gray-600">Click to view details</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StdExamResult;
