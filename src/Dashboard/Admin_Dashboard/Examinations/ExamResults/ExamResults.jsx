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

  useEffect(() => {
    const fetchExamAndProcessData = async () => {
      try {
        // Fetch exams
        const examResponse = await axios.get(`${BASE_URL}/exam/getExam`);
        const exams = examResponse.data.data;

        // Filter exams by examTypeId and className
        const filteredExams = exams.filter(
          (exam) => exam.examName === examTypeId && exam.className === className
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
              subjectName: `Subject ${subject.subject}`,
              marks: examResult ? examResult.examMarks : "NULL",
              remarks: examResult ? examResult.remarks : "NULL",
            };
          });

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

    fetchExamAndProcessData();
  }, [filteredData, className, examTypeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    {
      name: "SR.No",
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: "Student ID",
      selector: (row) => row.studentId,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subjectName,
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
    <div className="mt-8">
                              <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Class List</h1>
                              <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<NavLink to = '/admin/ExamTypeTiles'> Exam Type </NavLink>/<NavLink to = '/admin/ExamTypeTiles/ClassNameTiles'> Classname </NavLink>/ <span className='text-[#ffae01] font-semibold'>Exam Result</span> </p>
      <h1 className="text-2xl font-semibold">Exam Results</h1>
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
