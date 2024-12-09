import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';

function ExamDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || [];
  const [subject,SetSubject] = useState([])

  const fetchSubjectName = () => {
    axios
      .get("http://localhost:8080/subject/getSubjectList")
      .then((response) => {
        if (response.data.success) {
            SetSubject(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Subject Name:", error);
      });
  };

  useEffect(() => {
    fetchSubjectName();
  }, []);

  const getSubjectNameById = (id) => {
    const sub = subject.find((type) => type.id == id);
    return sub ? sub.subject : "Unknown";
  };

  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    //   width: '280px', 
    },
    {
      name: 'Subject',
      selector: (row) => getSubjectNameById(row.examData.subjectId),
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    {
      name: 'Marks',
      selector: (row) => row.examMarks,
      sortable: true,
      wrap: true,
    //   width: '280px', 
    },
    {
      name: 'Remarks',
      selector: (row) => row.remarks,
      sortable: true,
      wrap: true,
    //   width: '280px', 
    },

  ];

  return (
    <div className="h-full mb-10 ">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Details</h1>
      {/* <p className="mt-2">
        <span
          className="text-[#ffae01] font-semibold cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </span>
        / Exam Details
      </p> */}
            <p className="mt-2">
        Student_Dashboard /<span onClick={() => navigate(-1)}>Exam Results</span>/ <span className="text-[#ffae01] font-semibold"> Results</span>
      </p>

      <div className="mt-8">
        {data.length > 0 ? (
        //   <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white">
        //     <thead>
        //       <tr className="bg-gray-100">
        //         <th className="border p-2 text-center">Subject ID</th>
        //         <th className="border p-2 text-center">Marks</th>
        //         <th className="border p-2 text-center">Remarks</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {data.map((item) => (
        //         <tr key={item.id}>
        //           <td className="border p-2 text-center">{getSubjectNameById(item.examData.subjectId)}</td>
        //           <td className="border p-2 text-center">{item.examMarks}</td>
        //           <td className="border p-2 text-center">{item.remarks}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        <Table
        columns={column}
        data={data}
        // searchOptions={searchOptions}
        // onSearch={handleSearch}
        // handleClear={handleClear}
        />
        ) : (
          <p className="text-gray-600">No data available for this exam type.</p>
        )}
      </div>
    </div>
  );
}

export default ExamDetails;
