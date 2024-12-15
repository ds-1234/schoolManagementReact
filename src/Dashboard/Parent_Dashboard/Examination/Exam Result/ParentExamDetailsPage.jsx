import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ParentExamDetailsPage = () => {
  const location = useLocation();
  const { classId, userId, examType } = location.state || {};

  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (classId && userId && examType) {
      axios
        .get('http://localhost:8080/exam/getExamResult')
        .then((response) => {
          if (response.data.success) {
            // Filter data based on classId, userId, and examType
            const results = response.data.data.filter(
              (result) =>
                result.examData.className === classId &&
                result.studentId === userId &&
                result.examData.examType === examType
            );
            setFilteredResults(results);
          } else {
            setError('Failed to fetch exam details.');
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [classId, userId, examType]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (filteredResults.length === 0) return <div>No exam details found for this selection.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">Exam Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
          >
            <h3 className="text-xl font-semibold text-center text-blue-500">
              Exam ID: {result.id}
            </h3>
            <p className="text-center text-gray-700">Marks: {result.examMarks}</p>
            <p className="text-center text-gray-700">Remarks: {result.remarks}</p>
            <p className="text-center text-gray-700">Subject ID: {result.examData.subjectId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentExamDetailsPage;
