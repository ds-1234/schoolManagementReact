import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../../conf/conf';


const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [className, setClassName] = useState([]);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Retrieve the 'isParents' array from sessionStorage
    const users = JSON.parse(sessionStorage.getItem('user')) || {}; // Default to an empty object if not available
    const isParents = users.isParent || [];

    // Fetching data from the API
    fetch(`${BASE_URL}/user/getUserList`) // Replace with your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Filter data (role == 3, isActive == true, and matching IDs with isParents)
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

  const fetchclasses = () => {
    axios
      .get(`${BASE_URL}/class/getClassList`)
      .then((response) => {
        if (response.data.success) {
          setClassName(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Class :", error);
      });
  };
  useEffect(()=>{
    fetchclasses();
  },[])

  const getClassNameById = (id) => {
    const res = className.find((type) => type.id == id);
    return res ? `${res.name}-${res.section}` : "Unknown";
  };

  const handleTileClick = (user) => {
    // Send the selected user data (including className) using the state
    const classId = user.className[0] 
    navigate('/parentsDashboard/ParentClassExamSchedulePage', { state: { classId } });
    console.log(user,'userinsdu')
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
           <h1 className="text-lg md:text-2xl font-semibold text-black mt-5">Exam Schedule</h1>
            <p className="pl-0 mt-2">
              <NavLink to="/parentsDashboard"> Dashboard </NavLink>/
              {/* <NavLink to="/teacherDashboard/Examinations"> Examinations </NavLink>/ */}
              {/* <NavLink to="/teacherDashboard/tchExamSchedule"> Exam Schedule </NavLink>/ */}
              <span className="text-[#ffae01] font-semibold">Exam Schedule</span>
            </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {users.map(user => (
          <div
            key={user.id}
            className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white cursor-pointer"
            onClick={() => handleTileClick(user)} // Send entire user data on click
          >
            <h3 className="text-xl font-semibold text-center text-blue-500">{user.firstName}</h3>
            <p className="text-center text-gray-700">{getClassNameById(user.className)}</p> {/* Assuming className is available */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;
