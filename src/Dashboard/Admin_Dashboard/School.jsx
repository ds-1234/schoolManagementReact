import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './CSS_Styles/Table.css';
import { Link } from 'react-router-dom';

function School() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/school/getSchoolList`,
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>houseNumber</th>
            <th>street</th>
            <th>city</th>
            <th>state</th>
            <th>pinCode</th>
            <th>country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.houseNumber}</td>
              <td>{item.street}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.pinCode}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
                to="/admin/AddSchool"
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >
                Add School
              </Link>
    </div>
  );
};


export default School