import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClassExamSchedulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = location.state || {}; // Access classId from state
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (classId) {
      fetchExamData();
    }
  }, [classId]);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/exam/getExam');
      const { data } = response.data;

      // Filter exams by classId
      const filteredData = data.filter((exam) => exam.className == classId);

      // Determine the most recent createdDate
      if (filteredData.length > 0) {
        const mostRecentCreatedDate = filteredData.reduce((latest, exam) => {
          const currentExamDate = new Date(exam.createdDate || 0);
          return currentExamDate > new Date(latest.createdDate || 0) ? exam : latest;
        });

        // Mark exams as most recent or not
        const processedData = filteredData.map((exam) => ({
          ...exam,
          isMostRecent: exam.id === mostRecentCreatedDate.id,
        }));

        setExamData(processedData);
      } else {
        setExamData([]);
      }
    } catch (err) {
      setError('Failed to fetch exam data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (examData.length === 0) return <div>No exams found for this class.</div>;

  const handleExamClick = (exam) => {
    console.log(classId,'classId')
    navigate('/teacherDashboard/TchClassExamSchedule', { state: { exam,classId } });
  };

  return (
    <div>
      <h1>Exam Details for Class ID: {classId}</h1>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {examData.map((exam) => (
          <div
            key={exam.id}
            style={{
              backgroundColor: exam.isMostRecent ? 'green' : 'red',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleExamClick(exam)}
          >
            <h3>Exam Name: {exam.examName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassExamSchedulePage;
