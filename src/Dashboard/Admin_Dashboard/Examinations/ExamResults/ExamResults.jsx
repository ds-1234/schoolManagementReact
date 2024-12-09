import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import Table from "../../../../Reusable_components/Table";
import BASE_URL from "../../../../conf/conf";

const ExamResults = () => {
  const location = useLocation();
  const { className, filteredData, examTypeId } = location.state || {};
  console.log(filteredData, 'filteredData');

  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchExamAndProcessData = async () => {
      try {
        // Fetch exams
        const examResponse = await axios.get(`${BASE_URL}/exam/getExam`);
        const exams = examResponse.data.data;

        // Filter exams by examTypeId and className
        const filteredExams = exams.filter(
          (exam) => exam.examName == examTypeId && exam.className == className
        );

        // Extract all subjects from filtered exams
        const subjects = filteredExams.flatMap((exam) => exam.subjectWiseExamList);
        // Create unique subject list
        const uniqueSubjects = [...new Map(subjects.map((item) => [item.subject, item])).values()];

        // Generate results for each student
        const results = filteredData.map((student) => {
          const studentResults = uniqueSubjects.map((subject) => {
            const examResult =
              student.examData &&
              Number(student.examData.subjectId) === Number(subject.subject)
                ? student
                : null;
            return {
              subjectName: `${subject.subject}`,
              marks: examResult ? examResult.examMarks : "NULL",
              remarks: examResult ? examResult.remarks : "NULL",
            };
          });
          console.log(studentResults, 'studentResults');

          return {
            studentId: student.studentId,
            results: studentResults,
          };
        });

        setExamResults(results);
      } catch (err) {
        setError("Failed to fetch exam data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubjectsAndUsers = async () => {
      try {
        // Fetch subjects
        const subjectResponse = await axios.get("http://localhost:8080/subject/getSubjectList");
        if (subjectResponse.data.success) {
          const subjectData = subjectResponse.data.data;
          setSubjects(subjectData || []);
        }
        
        // Fetch user data
        const userResponse = await fetch("http://localhost:8080/user/getUserList");
        const data = await userResponse.json();
        if (data.success && data.data) {
          const filteredUsers = data.data.filter(
            (user) => user.role === 3 && user.isActive === true
          );
          setUserList(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching subject/user data:", error);
      }
    };

    fetchExamAndProcessData(); // Fetch exams and process data
    fetchSubjectsAndUsers(); // Fetch subjects and user data

  }, [filteredData, className, examTypeId]); // This ensures effects are run based on dependency changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getStudentNameById = (id) => {
    const std = userList.find((type) => type.id === id);
    return std ? std.firstName : "Unknown";
  };

  const getSubjectNameById = (id) => {
    const sub = subjects.find((type) => type.id == id);
    return sub ? sub.subject : "Unknown";
  };

  const columns = [
    {
      name: "SR.No",
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: "Student ID",
      selector: (row) => getStudentNameById(row.studentId),
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => getSubjectNameById(row.subjectName),
      sortable: true,
    },
    {
      name: "Marks",
      selector: (row) => row.marks,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      sortable: true,
    },
  ];

  return (
    <div className="">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
        Exam Result
      </h1>
      <p className="mt-2">
        Dashboard /<NavLink to="/admin"> Admin </NavLink>/ 
        <NavLink to="/admin/ExamTypeTiles"> Exam Type </NavLink>/ 
        <NavLink to="/admin/ExamTypeTiles/ClassNameTiles"> Class List </NavLink>/{" "} 
        <span className="text-[#ffae01] font-semibold">Exam Result</span>
      </p>
      {examResults.length > 0 ? (
        <Table
          columns={columns}
          data={examResults.flatMap((examResult) =>
            examResult.results.map((result) => ({
              studentId: examResult.studentId,
              ...result,
            }))
          )}
        />
      ) : (
        <p className="mt-4">No results found for the selected criteria.</p>
      )}
    </div>
  );
};

export default ExamResults;
