import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const ExamSubjects = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the selected exam data passed via navigate
  const { selectedExam } = location.state || {}; // Handle undefined state gracefully
  const [subjects, setSubjects] = useState([]);
  const [examType, setExamType] = useState("");

  // If there's no selectedExam, navigate back to the previous page
  if (!selectedExam) {
    navigate("/teacherdashboard/tchExamResult");
    return null;
  }

  const { className, examName, subjectWiseExamList } = selectedExam; // Destructure the data

  useEffect(() => {
    fetchSubjects();
    fetchExamType();
  }, []);

  const fetchSubjects = () => {
    axios
      .get("http://localhost:8080/subject/getSubjectList")
      .then((response) => {
        if (response.data.success) {
          setSubjects(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Data:", error);
      });
  };

  const getSubjectNameById = (SubjectId) => {
    const subject = subjects.find((type) => type.id == SubjectId);
    return subject ? subject.subject : "Unknown";
  };

  const fetchExamType = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/examType/getExamTypeList"
      );

      if (response.data.success) {
        const examTypeData = response.data.data;
        const selectedExamType = examTypeData.find(
          (type) => type.id === selectedExam.id
        );
        const examName = selectedExamType?.examTypeName;

        if (examName) {
          setExamType(examName);
        } else {
          console.error("Exam type not found for the selected exam ID.");
        }
      } else {
        console.error("Failed to fetch exam type data.");
      }
    } catch (error) {
      console.error("Error fetching exam type data:", error);
    }
  };

  // Handle subject tile click
  const handleSubjectClick = (subjectDetails) => {
    navigate("/teacherdashboard/UpdateResult", {
      state: {
        className,
        selectedSubject: subjectDetails.subject,
        selectedExamType: examName,
      },
    });
  };

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
        Subjects for Exam : {examType}
      </h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/teacherDashboard"> Teacher Dashboard </NavLink> /
        <NavLink to="/teacherdashboard/ExamSubjects"> Exam Result </NavLink> /
        <span className="text-[#ffae01] font-semibold"> Subject</span>
      </p>

      {/* Subject Tiles */}
      <div className="p-12 max-w-7xl mx-auto bg-white my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjectWiseExamList.map((subjectDetails) => (
          <div
            key={subjectDetails.id}
            className="bg-gray-300 p-6 rounded-lg text-center shadow-md cursor-pointer transform transition-transform hover:scale-105 flex items-center justify-center"
            onClick={() => handleSubjectClick(subjectDetails)}
          >
            <p className="font-semibold text-red-500 text-base">
              {getSubjectNameById(subjectDetails.subject)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSubjects;
