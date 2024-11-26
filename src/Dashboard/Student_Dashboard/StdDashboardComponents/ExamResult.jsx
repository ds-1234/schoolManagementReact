import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import BASE_URL from '../../../conf/conf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExamResult() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [examData, setExamData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chartData, setChartData] = useState(null);

  // Fetch exam data from API
  useEffect(() => {
    fetch(`${BASE_URL}/exam/getExamListByStudentId/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setExamData(data.data); // Store the fetched data
        }
      })
      .catch((error) => console.error('Error fetching exam data:', error));
  }, []);

  // Fetch subject data from API
  useEffect(() => {
    fetch(`${BASE_URL}/subject/getSubjectList`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubjects(data.data); // Store subject data
        }
      })
      .catch((error) => console.error('Error fetching subjects:', error));
  }, []);

  // Function to get subject name by ID
  const getSubjectNameById = (id) => {
    console.log(subjects,'subjects')
    const subject = subjects.find((subject) => subject.id == id);
    return subject ? subject.subject : `Subject ${id}`;
  };

  // Generate chart data
  useEffect(() => {
    if (examData.length > 0 && subjects.length > 0) {
      const subjectNames = examData.map((exam) => getSubjectNameById(exam.subjectId)); // Map subject names
      const marks = examData.map((exam) => parseInt(exam.subjectMarks, 10)); // Y-axis marks

      const chartData = {
        labels: subjectNames, // X-axis
        datasets: [
          {
            label: 'Marks (out of 100)',
            data: marks, // Y-axis
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'], // Colors
            borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'], // Border colors
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartData);
    }
  }, [examData, subjects]);

  // Bar chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Exam Results by Subject',
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Exam Result</h2>
      </div>

      {/* Show bar chart or a loading message */}
      <div className="mt-10">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-lg text-center text-gray-500">Loading Exam Data...</p>
        )}
      </div>
    </div>
  );
}

export default ExamResult;
