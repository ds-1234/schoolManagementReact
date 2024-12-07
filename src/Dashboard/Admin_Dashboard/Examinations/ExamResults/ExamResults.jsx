import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
        const examResponse = await axios.get("http://localhost:8080/exam/getExam");
        const exams = examResponse.data.data;

        // Filter exams by examTypeId and className
        const filteredExams = exams.filter(
          (exam) => exam.examName == examTypeId && exam.className == className
        );

        // Extract all subjects from filtered exams
        const subjects = filteredExams.flatMap((exam) => exam.subjectWiseExamList);

        // Create unique subject list
        const uniqueSubjects = [...new Map(subjects.map((item) => [item.subject, item])).values()];
        console.log(uniqueSubjects,'uniqueSubjects')

        // Generate results for each student
        const results = filteredData.map((student) => {
          const studentResults = uniqueSubjects.map((subject) => {
            const examResult =
              student.examData &&
              Number(student.examData.subjectId) == Number(subject.subject)
                ? student
                : null;
                return {
                  subjectName: `Subject ${subject.subject}`,
                  marks: examResult ? examResult.examMarks : "NULL",
                  remarks: examResult ? examResult.remarks : "NULL",
                };
              });
              console.log(studentResults,'studentResults')
              console.log(filteredData,'filteredData')

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

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-semibold">Exam Results</h1>
      {examResults.length > 0 ? (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((examResult, index) =>
              examResult.results.map((result, idx) => (
                <tr key={`${index}-${idx}`} className="border-t">
                  {idx == 0 && (
                    <td rowSpan={examResult.results.length} className="px-4 py-2">
                      {examResult.studentId}
                    </td>
                  )}
                  <td className="px-4 py-2">{result.subjectName}</td>
                  <td className="px-4 py-2">{result.marks}</td>
                  <td className="px-4 py-2">{result.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No results found for the selected criteria.</p>
      )}
    </div>
  );
};

export default ExamResults;
