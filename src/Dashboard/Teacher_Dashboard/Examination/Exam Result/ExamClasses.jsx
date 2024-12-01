import { useLocation, useNavigate } from "react-router-dom";

const ExamClasses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { examType = "Unknown", classNames = [] } = location.state || {};

  const handleTileClick = (className) => {
    navigate("/teacherdashboard/UpdateResult", {
      state: { className, examType },
    });
  };

  return (
    <div className="h-full mb-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Exam Type: {examType}
        </h1>
        <p className="mt-2 text-gray-600">Select a class to view details:</p>

        {/* Class Name Tiles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classNames.map((className, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => handleTileClick(className)}
            >
              <p className="font-semibold text-lg">Class: {className}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamClasses;
