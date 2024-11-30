import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the data passed via navigation
  const { className, selectedSubject, selectedExamType } = location.state || {};

  // Handle cases where state is missing
  if (!className || !selectedSubject || !selectedExamType) {
    navigate("/exam-subjects");
    return null;
  }

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
        Subject Details
      </h1>
      <p className="mt-2">
        Dashboard / <span className="text-[#ffae01] font-semibold">Subject Details</span>
      </p>

      {/* Display Passed Data */}
      <div className="p-12 max-w-7xl mx-auto bg-white space-y-4 my-10">
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="font-semibold">Class Name: {className}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="font-semibold">Selected Subject: {selectedSubject}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <p className="font-semibold">Selected Exam Type: {selectedExamType}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateResult;
