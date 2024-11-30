import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamSubjects = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the selected exam data passed via navigate
  const { selectedExam } = location.state || {}; // Handle undefined state gracefully

  // If there's no selectedExam, navigate back to the previous page
  if (!selectedExam) {
    navigate("/tch-exam-result");
    return null;
  }

  const { className, examName, subjectWiseExamList } = selectedExam; // Destructure the data

  // Handle subject tile click
  const handleSubjectClick = (subjectDetails) => {
    // Navigate to another page with the required data
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
        Subjects for Exam ID: {selectedExam.id}
      </h1>
      <p className="mt-2">
        Dashboard / <span className="text-[#ffae01] font-semibold">Exam Subjects</span>
      </p>

      {/* Subject Tiles */}
      <div className="p-12 max-w-7xl mx-auto bg-white space-y-2 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjectWiseExamList.map((subjectDetails) => (
          <div
            key={subjectDetails.id}
            className="bg-gray-300 p-4 rounded-lg text-center shadow-md cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleSubjectClick(subjectDetails)} // Pass subject details to the handler
          >
            <p className="font-semibold text-red-500">
              Subject ID: {subjectDetails.subject}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSubjects;
