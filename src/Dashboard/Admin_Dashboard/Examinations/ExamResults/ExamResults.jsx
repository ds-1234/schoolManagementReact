import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import Table from "../../../../Reusable_components/Table";
import BASE_URL from "../../../../conf/conf";

const ExamResults = () => {
  const location = useLocation();
  const { className, filteredData, examTypeId } = location.state || {};

  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectsName, setSubjectsName] = useState([]);

  useEffect(() => {
    // const fetchExamAndProcessData = async () => {
    //   try {
    //     const examResponse = await axios.get(`${BASE_URL}/exam/getExam`);
    //     const exams = examResponse.data.data;

    //     const filteredExams = exams.filter(
    //       (exam) => exam.examName == examTypeId && exam.className == className
    //     );

    //     const subjectList = filteredExams.flatMap((exam) => exam.subjectWiseExamList);
    //     const uniqueSubjects = [
    //       ...new Map(subjectList.map((item) => [item.subject, item])).values(),
    //     ];

    //     const results = filteredData.map((student) => {
    //       const studentResults = uniqueSubjects.map((subject) => {
    //         const examResult =
    //           student.examData &&
    //           Number(student.examData.subjectId) === Number(subject.subject)
    //             ? student
    //             : null;
    //         return {
    //           subjectName: `${subject.subject}`,
    //           marks: examResult ? examResult.examMarks : "NULL",
    //         };
    //       });
    //       return {
    //         studentId: student.studentId,
    //         results: studentResults,
    //       };
    //     });

    //     setExamResults(results);
    //     setSubjects(uniqueSubjects);
    //     console.log(uniqueSubjects,'uniqueSubjects')
    //   } catch (err) {
    //     setError("Failed to fetch exam data.");
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const fetchUsers = async () => {
    //   try {
    //     const userResponse = await fetch("http://localhost:8080/user/getUserList");
    //     const data = await userResponse.json();
    //     if (data.success && data.data) {
    //       const filteredUsers = data.data.filter(
    //         (user) => user.role === 3 && user.isActive === true
    //       );
    //       setUserList(filteredUsers);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };

    // fetchExamAndProcessData();
    // fetchUsers();

    const fetchExamResults = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const payload = { className, examType: examTypeId };
        console.log(payload,'payload')
        const response = await axios.post(`${BASE_URL}/exam/getExamResultForAdmin`, {
          // headers: {
          //   'Content-Type': 'application/json', 
          // },
          // // payload
          // data: {
            className: className,
            examType: examTypeId,
          // },
        });
  
        if (response.data.success && response.data.data) {
          const data = response.data.data;
  
          const results = Object.entries(data).map(([studentName, subjects]) => ({
            studentName,
            subjects,
          }));
  
          setExamResults(results);
        } else {
          setError("No results found.");
        }
      } catch (err) {
        setError("Failed to fetch exam results.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExamResults()

  }, [ className, examTypeId]);

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
  }, [filteredData]); 

  const getSubjectNameById = (id) => {
    const sub = subjectsName.find((type) => type.id == id);
    return sub ? sub.subject : "Unknown";
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getStudentNameById = (id) => {
    const std = userList.find((type) => type.id == id);
    return std ? std.firstName : "Unknown";
  };

  // const columns = [
  //   {
  //     name: "Student Name",
  //     selector: (row) => getStudentNameById(row.studentId),
  //     sortable: true,
  //   },
  //   ...subjects.map((subject) => ({
  //     name: getSubjectNameById(subject.subject), // Use subject names as column headers
  //     selector: (row) => {
  //       const subjectResult = row.results.find(
  //         (result) => result.subjectName == subject.subject
  //       );
  //       return subjectResult ? subjectResult.marks : "NULL";
  //     },
  //     sortable: true,
  //   })),
  // ];

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.studentName,
      sortable: true,
    },
    ...examResults[0]?.subjects.map((subject, index) => ({
      name: subject.subjectName,
      selector: (row) => {
        const subjectData = row.subjects.find(
          (sub) => sub.subjectName == subject.subjectName
        );
        return subjectData ? subjectData.examMarks : "NULL";
      },
      sortable: true,
    })),
    // {
    //   name: "Remarks",
    //   selector: (row) =>
    //     row.subjects.map((sub) => sub.remarks).join(", "),
    //   sortable: false,
    // },
  ];

  return (
    <div>
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Result</h1>
      <p className="mt-2">
        Dashboard /<NavLink to="/admin"> Admin </NavLink>/ 
        <NavLink to="/admin/ExamTypeTiles"> Exam Type </NavLink>/ 
        <NavLink to="/admin/ExamTypeTiles/ClassNameTiles"> Class List </NavLink>/{" "} 
        <span className="text-[#ffae01] font-semibold">Exam Result</span>
      </p>
      {examResults.length > 0 ? (
        <Table
          columns={columns}
          data={examResults}
        />
      ) : (
        <p className="mt-4">No results found for the selected criteria.</p>
      )}
    </div>
  );
};

export default ExamResults;
