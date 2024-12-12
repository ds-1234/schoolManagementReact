import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';

const StdClassWiseExamSchedule = () => {
  const location = useLocation();
  const { subjectWiseExamList, className } = location.state || {}; // Get the data from the state

  const [subject, setSubject] = useState([]);  // State for subjects

  // Fetch subject data
  const fetchSubject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
      if (response.data && response.data.success) {
        setSubject(response.data.data);  // Store subject data
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSubject();
  }, []);

  // Map subject ID to subject name
  const getSubjectNameById = (subjectId) => {
    const subjectObj = subject.find((sub) => sub.id === subjectId);
    return subjectObj ? subjectObj.subject : 'Unknown Subject';
  };

  const columns = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Subject',
      selector: row => getSubjectNameById(row.subject),
      sortable: true,
    },
    {
      name: 'Exam Date',
      selector: row => row.examDate,
      sortable: true,
    },
    {
      name: 'End Time',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
      sortable: true,
    },
    {
      name: 'Max Marks',
      selector: row => row.maxMarks,
      sortable: true,
    },
    {
      name: 'Min Marks',
      selector: row => row.minMarks,
      sortable: true,
    },
  ];

  return (
    <div className="flex flex-col justify-start pl-0">
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">{className}'s Exam Schedule</h2> */}
            <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Exam Schedule</h1>
            <p className='pl-0 mt-2'>
              <NavLink to='/studentDashboard'> Dashboard </NavLink>/<NavLink to='/studentDashboard/stdExamResult'> Examinations </NavLink>/<NavLink to='/studentDashboard/StdExamSchedule'> Exam Schedule </NavLink>/ <span className='text-[#ffae01] font-semibold'>Schedule By Exam Name</span>
            </p>
      <Table columns={columns} data={subjectWiseExamList} />
    </div>
  );
};

export default StdClassWiseExamSchedule;
