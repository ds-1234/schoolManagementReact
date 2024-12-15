import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';

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

  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Subject',
      selector: row => row.examData.subjectId,
      sortable: true,
    },
    {
      name: 'Exam Marks',
      selector: row => row.examMarks,
      sortable: true,
    },
    {
      name: 'Remarks',
      selector: row => row.remarks,
      sortable: true,
    },
    // {
    //   name: 'Duration',
    //   selector: row => row.duration,
    //   sortable: true,
    // },
    // {
    //   name: 'Max Marks',
    //   selector: row => row.maxMarks,
    //   sortable: true,
    // },
    // {
    //   name: 'Min Marks',
    //   selector: row => row.minMarks,
    //   sortable: true,
    // },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (filteredResults.length === 0) return <div>No exam details found for this selection.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold text-center text-[#042954]">{classId}'s Exam Schedule</h2> */}
            <h1 className="text-lg md:text-2xl font-semibold text-black mt-5"> Exam Result</h1>
            <p className="pl-0 mt-2">
              <NavLink to="/parentsDashboard"> Dashboard </NavLink>/
              {/* <NavLink to="/teacherDashboard/Examinations"> Examinations </NavLink>/ */}
              <NavLink to="/parentsDashboard/ParentExamSchedule"> Exam Schedule </NavLink>/<NavLink to="/parentsDashboard/ParentClassExamSchedulePage"> Class Schedule </NavLink>/
              <span className="text-[#ffae01] font-semibold"> Exam Result</span>
            </p>
      <Table
        columns={columns}
        data={filteredResults}  // Adjust based on your data structure
        />
    </div>
  );
};

export default ParentExamDetailsPage;
