import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import UpdateClassResult from './UpdateClassResult'; // Import the UpdateClassResult component

const TchExamResult = () => {
  const [exams, setExams] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null); // State to track the selected classId

  const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));

  useEffect(() => {
    // Fetch exam types on component mount
    fetchExamTypes();

    // Extract class IDs from classSubjectEntity
    const validClasses = teacherData.classSubjectEntity
      .filter((entry) => entry.classId !== null)
      .map((entry) => entry.classId);

    // Fetch exams using Axios
    axios
      .get("http://localhost:8080/exam/getExam")
      .then((response) => {
        const { data } = response;
        if (data.success) {
          // Filter exams based on validClasses (convert className to string)
          const filteredExams = data.data.filter((exam) =>
            validClasses.includes(String(exam.className)) // Convert className to string
          );
          setExams(filteredExams);
        }
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []); // Run only once on component mount

  // Function to fetch exam types and store them in state
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

  // Function to get examTypeName based on examTypeId
  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find((type) => type.id == examTypeId); // Match examTypeId
    return examType ? examType.examTypeName : "Unknown";
  };

  const handleTileClick = (exam) => {
    // Set selectedClassId when a tile is clicked
    setSelectedClassId(exam.className);
  };

  return (
    <div className='h-full mb-10'>
      {/* Only render this header if no class is selected */}
      {!selectedClassId && (
        <>
          <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Exam Result</h1>
          <p className='mt-2'>
            Dashboard /
            <NavLink to='/teacherDashboard'> Teacher Dashboard </NavLink> /
            <span className='text-[#ffae01] font-semibold'> Exam Result</span>
          </p>
        </>
      )}

      {/* Show the UpdateClassResult component if a class is selected */}
      {selectedClassId ? (
        <UpdateClassResult selectedClassId={selectedClassId} />
      ) : (
        <div className="p-12 max-w-7xl mx-auto bg-white space-y-2 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-red-500 text-white p-4 rounded-lg text-center shadow-md cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleTileClick(exam)} // Pass entire exam object to the click handler
            >
              <p className="font-semibold">Exam Type: {getExamTypeNameById(exam.examName)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TchExamResult;
