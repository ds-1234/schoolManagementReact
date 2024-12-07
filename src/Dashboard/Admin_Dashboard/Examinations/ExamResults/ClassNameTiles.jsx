import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ClassNameTiles = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for examData and examTypeId
  const [examData, setExamData] = useState([]);
  const [examTypeId, setExamTypeId] = useState("");

  useEffect(() => {
    // If data is available in location.state, use it
    if (location.state && location.state.examData && location.state.examTypeId) {
      setExamData(location.state.examData);
      setExamTypeId(location.state.examTypeId);
    } else {
      // If no data in location.state, fallback to sessionStorage
      const storedExamData = sessionStorage.getItem("examData");
      const storedExamTypeId = sessionStorage.getItem("examTypeId");

      if (storedExamData && storedExamTypeId) {
        setExamData(JSON.parse(storedExamData));
        setExamTypeId(storedExamTypeId);
      } else {
        console.error("No data found in location.state or sessionStorage");
      }
    }
  }, [location.state]);

  // Get unique class names from the filtered exam data
  const uniqueClassNames = [
    ...new Set(examData.map((exam) => exam.examData.className)),
  ];

  // Handle class tile click to navigate to ExamResults page with filtered data
  const handleClassClick = (className) => {
    const filteredData = examData.filter(
      (exam) => exam.examData.className === className
    );

    // Store data in sessionStorage for later use (e.g., going back from ExamResults)
    sessionStorage.setItem("examData", JSON.stringify(examData));
    sessionStorage.setItem("examTypeId", examTypeId);

    // Navigate to ExamResults page
    navigate("/admin/ExamTypeTiles/ClassNameTiles/examResults", {
      state: { className, filteredData, examTypeId },
    });
  };

  return (
    <div className="">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
        Class List
      </h1>
      <p className="mt-2">
        Dashboard /<NavLink to="/admin"> Admin </NavLink>/
        <NavLink to="/admin/ExamTypeTiles"> ExamType </NavLink>/{" "}
        <span className="text-[#ffae01] font-semibold">Classname</span>
      </p>
      <h1 className="text-2xl font-semibold">Class Names for Exam Type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {examData.length > 0 ? (
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
