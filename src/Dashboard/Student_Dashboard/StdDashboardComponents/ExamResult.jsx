import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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
  const [examResults, setExamResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [examTypeFilter, setExamTypeFilter] = useState(''); // State to hold the selected exam type filter
  const [examTypes, setExamTypes] = useState([]); // State to hold the unique exam types
  const [examTypeName, setExamTypeName] = useState([]); 

  // Fetch exam results from API
  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/exam/getExamResult`);
        if (response.data.success) {
          // Filter results by studentId
          const filteredResults = response.data.data.filter(
            (result) => result.studentId === user.id
          );
          setExamResults(filteredResults);

          // Extract unique exam types
          const uniqueExamTypes = [
            ...new Set(filteredResults.map((result) => result.examData.examType)),
          ];
          setExamTypes(uniqueExamTypes);
        }
      } catch (error) {
        console.error('Error fetching exam results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamResults();
  }, [user.id]);

  // Fetch subject data from API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
        if (response.data.success) {
          setSubjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);
  useEffect(() => {
    const fetchExamType = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/examType/getExamTypeList`);
        if (response.data.success) {
          setExamTypeName(response.data.data);
          setExamTypeFilter(response.data.data[0].id)
        }
      } catch (error) {
        console.error('Error fetching Exam Type:', error);
      }
    };

    fetchExamType();
  }, []);

  // Function to get subject name by ID
  const getSubjectNameById = (id) => {
    const subject = subjects.find((subject) => subject.id === id);
    return subject ? subject.subject : `Subject ${id}`;
  };
  const getExamTypeNameById = (id) => {
    const name = examTypeName.find((type) => type.id == id);
    return name ? name.examTypeName : `Exam type ${id}`;
  };

  // Generate chart data based on examTypeFilter
  useEffect(() => {
    let filteredResults = examResults;
    if (examTypeFilter) {
      filteredResults = examResults.filter(
        (result) => result.examData.examType === parseInt(examTypeFilter)
      );
      console.log(examTypeFilter,'Examtypefilter')
    }

    if (filteredResults.length > 0 && subjects.length > 0) {
      const subjectNames = filteredResults.map((result) =>
        getSubjectNameById(result.examData.subjectId)
      );
      const marks = filteredResults.map((result) => result.examMarks);

      const chartData = {
        labels: subjectNames, // X-axis: Subject names
        datasets: [
          {
            label: 'Marks (out of 100)',
            data: marks, // Y-axis: Exam marks
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'],
            borderColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#F3FF33'],
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartData);
    }
  }, [examResults, subjects, examTypeFilter]);

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
        text: `Exam Results of ${getExamTypeNameById(examTypeFilter)}`,
      },
    },
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Exam Result</h2>

        {/* Filter Dropdown for Exam Type */}
        <select
          className="p-2 border rounded"
          value={examTypeFilter}
          onChange={(e) => setExamTypeFilter(e.target.value)}
        >
          <option value="">Select Exam Type</option>
          {examTypes.map((examType, index) => (
            <option key={index} value={examType}>
              {`${getExamTypeNameById(examType)}`}
            </option>
          ))}
        </select>
      </div>

      {/* Show bar chart or a loading message */}
      <div className="mt-10">
        {loading ? (
          <p className="text-lg text-center text-gray-500">Loading Exam Data...</p>
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p className="text-lg text-center text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
}

export default ExamResult;
