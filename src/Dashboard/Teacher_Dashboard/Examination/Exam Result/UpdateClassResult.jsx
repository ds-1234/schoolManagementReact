import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const UpdateClassResult = ({ selectedClassId }) => {
  const [students, setStudents] = useState([]);
console.log(selectedClassId,'classidselected')
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
    <div>
                <>
          <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Update Exam Result</h1>
          <p className='mt-2'>
            Dashboard /
            <NavLink to='/teacherDashboard'> Teacher Dashboard </NavLink> /
            <span className='text-[#ffae01] font-semibold'> Exam Result</span>
          </p>
        </>
      {/* <h2>Update Class Result</h2> */}
      <form>
        {students.map((student) => (
          <div key={student.id}>
            <div>
              <label>{student.firstName} {student.lastName}</label>
              <input 
                type="number" 
                name={`marks-${student.id}`} 
                placeholder="Enter Marks" 
              />
              <input 
                type="text" 
                name={`remarks-${student.id}`} 
                placeholder="Enter Remarks" 
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default UpdateClassResult;
