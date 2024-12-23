import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';

const ParentClassExamSchedule = () => {
  const location = useLocation();
  const { exam,classId } = location.state || {}; // Access the exam data passed as state
  const [subject, setSubject] = useState([]); // State for exam types
  const [subjectWiseExamList, setSubjectWiseExamList] = useState([]);
  const [subjectsName, setSubjectsName] = useState([]);
  console.log(classId,'classid final')
  console.log(exam,'exam final')
  const navigate = useNavigate();


  // Fetch subject list
  const fetchSubject = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
      if (response.data && response.data.success) {
        setSubject(response.data.data);  // Store exam type data
      }
    } catch (error) {
      console.error('Error fetching exam types:', error);
    }
  };

  // Fetch the exam schedule data
  const fetchExamSchedule = async () => {
    if (classId) {
      try {
        const response = await axios.get(`${BASE_URL}/exam/getExam`);
        if (response.data && response.data.success) {
          const filteredSchedule = response.data.data.filter(
            (schedule) => schedule.className.toString() === classId.toString()
          );
          setSubjectWiseExamList(filteredSchedule);
        }
      } catch (error) {
        console.error('Error fetching exam schedule:', error);
      }
    }
  };

  useEffect(() => {
    fetchSubject();
    fetchExamSchedule();
  }, [classId]);

  if (!classId) {
    return <p className="text-red-500">Class ID not provided.</p>;
  }

  const fetchSubjectName = async () => {
    try {
      const response = await axios.get("http://localhost:8080/subject/getSubjectList");

      if (response.data.success) {
        const subdata = response.data.data;
        setSubjectsName(subdata);
      }
    } catch (error) {
      console.error("Error fetching Subject data:", error);
    }
  };

  useEffect(() => {
    fetchSubjectName();
  }, []); 

  const getSubjectNameById = (id) => {
    const sub = subjectsName.find((type) => type.id == id);
    return sub ? sub.subject : "Unknown";
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
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold text-center text-[#042954]">{classId}'s Exam Schedule</h2> */}
            <h1 className="text-lg md:text-2xl font-semibold text-black mt-5"> Schedule</h1>
            <p className="pl-0 mt-2">
              <NavLink to="/parentsDashboard"> Dashboard </NavLink>/
              {/* <NavLink to="/teacherDashboard/Examinations"> Examinations </NavLink>/ */}
              <NavLink to="/parentsDashboard/ParentExamSchedule"> Exam Schedule </NavLink>/
              <span
    className="cursor-pointer  hover:underline"
    onClick={() => navigate(-1)}
  >
    Class Schedule
  </span>/
                <span className="text-[#ffae01] font-semibold"> Schedule</span>
            </p>
      <Table
        columns={columns}
        data={exam?.subjectWiseExamList || []}  // Adjust based on your data structure
        />
    </div>
  );
};

export default ParentClassExamSchedule;