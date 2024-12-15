import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ParentClassExamResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId, userId } = location.state || {}; // Destructure data from state

  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (classId && userId) {
      axios
        .get('http://localhost:8080/exam/getExamResult')
        .then((response) => {
          if (response.data.success) {
            // Filter the data based on classId and userId
            const filteredResults = response.data.data.filter(
              (result) =>
                result.examData.className === classId && result.studentId === userId
            );
            setExamResults(filteredResults);
          } else {
            setError('Failed to fetch exam results.');
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [classId, userId]);

  const handleTileClick = (examType) => {
    navigate('/parentsDashboard/ParentExamDetailsPage', { state: { classId, userId, examType } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (examResults.length === 0) return <div>No results found for this student and class.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">Exam Results</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {examResults.map((result) => (
          <div
            key={result.id}
            className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white cursor-pointer"
            onClick={() => handleTileClick(result.examData.examType)} // Navigate on click
          >
            <h3 className="text-xl font-semibold text-center text-blue-500">
              Exam Type: {result.examData.examType}
            </h3>
            {/* <p className="text-center text-gray-700">Marks: {result.examMarks}</p> */}
            {/* <p className="text-center text-gray-700">Remarks: {result.remarks}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentClassExamResultPage;
