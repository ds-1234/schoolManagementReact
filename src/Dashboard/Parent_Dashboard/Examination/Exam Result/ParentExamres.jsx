import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const ParentExamres = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [className, setClassName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem('user')) || {}; // Default to empty object
    const isParents = users.isParent || [];

    fetch('http://localhost:8080/user/getUserList')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const filteredUsers = data.data.filter(user =>
          user.role === 3 &&
          user.isActive === true &&
          isParents.includes(user.id)
        );
        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const fetchClasses = () => {
    axios
      .get("http://localhost:8080/class/getClassList")
      .then((response) => {
        if (response.data.success) {
          setClassName(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Class :", error);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const getClassNameById = (id) => {
    const res = className.find((type) => type.id === id);
    return res ? `${res.name}-${res.section}` : "Unknown";
  };

  const handleTileClick = (user) => {
    const classId = user.className[0]; // Assuming user.className is an array
    navigate('/parentsDashboard/ParentClassExamResultPage', {
      state: { classId, userId: user.id } // Pass both classId and userId
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">Child Result</h1>
      <p className="pl-0 mt-2">
        <NavLink to="/parentsDashboard"> Dashboard </NavLink>/
        <span className="text-[#ffae01] font-semibold">Exam Result</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {users.map(user => (
          <div
            key={user.id}
            className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white cursor-pointer"
            onClick={() => handleTileClick(user)} // Pass user data on click
          >
            <h3 className="text-xl font-semibold text-center text-blue-500">{user.firstName}</h3>
            <p className="text-center text-gray-700">{getClassNameById(user.className[0])}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentExamres;
