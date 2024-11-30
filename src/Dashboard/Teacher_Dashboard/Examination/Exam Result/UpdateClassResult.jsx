import React, { useState, useEffect } from 'react';

const UpdateClassResult = ({ selectedClassId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the user data from the API
    fetch('http://localhost:8080/user/getUserList')
      .then((response) => response.json())
      .then((data) => {
        // Filter students who have role == 3 and whose className matches the selectedClassId
        const filteredStudents = data.data.filter((student) => {
          return student.role === 3 && student.className?.includes(selectedClassId);
        });

        // Update the state with the filtered students
        setStudents(filteredStudents);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [selectedClassId]);

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">Update Exam Results</h1>

      {/* Student List in 3 Columns */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{student.firstName} {student.lastName}</td>
                <td className="p-3">{student.className}</td>

                {/* Marks and Remarks Inputs */}
                <td className="p-3">
                  <input
                    type="number"
                    name={`marks-${student.id}`}
                    placeholder="Enter Marks"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    name={`remarks-${student.id}`}
                    placeholder="Enter Remarks"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateClassResult;
