import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ClassNameTiles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { examData,examTypeId } = location.state || {}; // Retrieve the exam data passed from ExamTypeTiles
//   console.log(examData,'examData')
console.log(examData,'Examdata')
  // Get unique class names from the filtered exam data
  const uniqueClassNames = [
    ...new Set(examData.map((exam) => exam.examData.className)),
  ];

  // Handle class tile click to navigate to ExamResults page with filtered data
  const handleClassClick = (className) => {
    const filteredData = examData.filter((exam) => exam.examData.className == className);
    console.log(filteredData,'classfromtile')
    console.log(className,'classNametile')
    navigate("/admin/ExamTypeTiles/ClassNameTiles/examResults", { state: { className, filteredData,examTypeId } });
  };

  return (
    <div className="mt-8">
                        <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Class List</h1>
                        <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<NavLink to = '/admin/ExamTypeTiles'> ExamType </NavLink>/ <span className='text-[#ffae01] font-semibold'>Classname</span> </p>
      <h1 className="text-2xl font-semibold">Class Names for Exam Type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {examData ? (
          uniqueClassNames.map((className) => (
            <div
              key={className}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => handleClassClick(className)}
            >
              <h2 className="text-xl font-semibold">Class Name: {className}</h2>
            </div>
          ))
        ) : (
          <p>No exam data available</p>
        )}
      </div>
    </div>
  );
};

export default ClassNameTiles;
