import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './CSS_Styles/Table.css';
import { Link } from 'react-router-dom';

function Subject() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/subject/getSubjectList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
        <button className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
            <Link to="/admin/AddSubject">
                    Add Subject
            </Link>
        </button>
      <table className='mt-10'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Subject</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.subject}</td>
              <td>{item.description}</td>
                <button className='p-1 bg-blue-500 text-white rounded ml-2'>
                  <Link to={`/admin/editSubject/${item.id}`}>Edit</Link>
                </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Subject