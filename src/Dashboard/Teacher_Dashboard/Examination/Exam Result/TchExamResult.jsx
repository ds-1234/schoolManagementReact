import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const TchExamResult = () => {
  const [exams, setExams] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const navigate = useNavigate();

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
    navigate("/teacherdashboard/ExamSubjects", { state: { selectedExam: exam } });
  };

  return (
    <div className="h-full mb-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Exam Result</h1>
        <p className="mt-2  text-gray-600">
          Dashboard /
          <NavLink
            to="/teacherDashboard"
            // className="text-blue-600 hover:underline"
          >
            Teacher Dashboard
          </NavLink>{" "}
          / <span className="text-yellow-500 font-semibold">Exam Result</span>
        </p>

        {/* Exam Tiles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTileClick(exam)}
            >
              <p className="font-semibold text-lg">
                Exam Type: {getExamTypeNameById(exam.examName)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TchExamResult;
