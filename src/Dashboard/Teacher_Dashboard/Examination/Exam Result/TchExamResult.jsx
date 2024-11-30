import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';


const TchExamResult = () => {
  const [exams, setExams] = useState([]);
  const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));

  useEffect(() => {
    // Extract class IDs from classSubjectEntity
    const validClasses = teacherData.classSubjectEntity
      .filter((entry) => entry.classId !== null)
      .map((entry) => entry.classId);
      console.log(validClasses,'valid class')

    // Fetch exams using Axios
    axios
      .get("http://localhost:8080/exam/getExam")
      .then((response) => {
        const { data } = response;
        if (data.success) {
          // Filter exams based on validClasses
          console.log(data,'data')
          const filteredExams = data.data.filter((exam) =>exam.className == validClasses);
          setExams(filteredExams);
          console.log(filteredExams,'filteredExams')
        }
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []);

  return (
    <div className='h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Exam Result</h1>
       <p className='mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Exam Result</span> </p> 
       <div className="p-12 max-w-7xl mx-auto bg-white space-y-2 my-10">
   
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-red-500 text-white p-4 rounded-lg w-40 text-center shadow-md"
          >
            <p className="font-semibold">Exam Name: {exam.examName}</p>
            {/* <p className="text-sm">ID: {exam.id}</p> */}
          </div>
        ))}
        </div>
    </div>
  );
};

export default TchExamResult;
