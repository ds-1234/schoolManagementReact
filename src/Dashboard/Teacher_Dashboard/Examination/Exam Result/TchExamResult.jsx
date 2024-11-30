import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const TchExamResult = () => {
  const [exams, setExams] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));

  useEffect(() => {
    fetchExamTypes();

    const validClasses = teacherData.classSubjectEntity
      .filter((entry) => entry.classId !== null)
      .map((entry) => entry.classId);

    axios
      .get("http://localhost:8080/exam/getExam")
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const filteredExams = data.data.filter((exam) =>
            validClasses.includes(String(exam.className))
          );
          setExams(filteredExams);
        }
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []);

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

  const getExamTypeNameById = (examTypeId) => {
    const examType = examTypes.find((type) => type.id == examTypeId);
    return examType ? examType.examTypeName : "Unknown";
  };

  const handleTileClick = (exam) => {
    // Navigate to the new page and pass selected exam data
    navigate("/teacherdashboard/ExamSubjects", { state: { selectedExam: exam } });
  };

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Result</h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/teacherDashboard"> Teacher Dashboard </NavLink> /
        <span className="text-[#ffae01] font-semibold"> Exam Result</span>
      </p>

      <div className="p-12 max-w-7xl mx-auto bg-white space-y-2 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-red-500 text-white p-4 rounded-lg text-center shadow-md cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleTileClick(exam)}
          >
            <p className="font-semibold">Exam Type: {getExamTypeNameById(exam.examName)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TchExamResult;
