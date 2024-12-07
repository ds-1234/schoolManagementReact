import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ExamResults = () => {
  const location = useLocation();
  const { className, filteredData, examTypeId } = location.state || {};
  console.log(filteredData,'filteredDataresultx')
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassSubjectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/teacherInfo/getClassSubjectInfo/${className}`
        );
        const classSubjectData = response.data.data;
    
        // Filter data to find matching subjects
        const matchingSubjects = classSubjectData.filter((item) =>
          filteredData.filter(
            (filteredItem) =>
              Number(filteredItem.subjectId) === Number(item.subjectId)
          )
        );
    
        console.log(matchingSubjects, "Matching Subjects");
    
        // Generate results for each student in filteredData and each subject in matchingSubjects
        const results = filteredData.map((student) => {
          const studentResults = matchingSubjects.map((subject) => {
            const examResult =
              student.examData &&
              Number(student.examData.subjectId) === Number(subject.subjectId)
                ? student.examData
                : null;
    
                return {
                  subjectName: `Subject ${subject.subjectId}`,
                  marks: examResult ? examResult.examMarks : "NULL",
                  remarks: examResult ? examResult.remarks : "NULL",
                };
              });
              console.log(studentResults,'studentResults')
    
          return {
            studentId: student.studentId,
            results: studentResults,
          };
        });
    
        console.log(results, "Generated Results");
        setExamResults(results);
      } catch (err) {
        setError("Failed to fetch class subject data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClassSubjectData()
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
              {examResults[0].results.map((result, index) => (
                <th key={index} className="px-4 py-2">
                  {result.subjectName} {/* Subject name column */}
                </th>
              ))}
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((examResult, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{examResult.studentId}</td>
                {examResult.results.map((result, index) => (
                  <td key={index} className="px-4 py-2">
                    {result.marks || "NULL"}
                  </td>
                ))}
                {examResult.results.map((result, index) => (
                  <td key={index} className="px-4 py-2">
                    {result.remarks || "NULL"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">No results found for the selected criteria.</p>
      )}
    </div>
  );
};

export default ExamResults;
