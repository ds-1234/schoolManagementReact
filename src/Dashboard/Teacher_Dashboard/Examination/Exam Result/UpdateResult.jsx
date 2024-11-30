import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar"; // Assuming your navbar component is named 'Navbar'

const UpdateResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const { className, selectedSubject, selectedExamType } = location.state || {};

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8080/user/getUserList");
      const data = await response.json();

      if (data.success && data.data) {
        // Filter users based on the given conditions
        const filteredUsers = data.data.filter(
          (user) =>
            user.role === 3 &&
            user.isActive === true &&
            user.className.includes(className)
        );
        console.log(className, 'className')

        // Set the filtered user list
        setUserList(filteredUsers);
      }
    };

    fetchUserData();
  }, [className]);

  return (
    <div className="h-full mb-10">
      {/* Navbar */}
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Result</h1>
      <p className="mt-2">
        Dashboard /
        <NavLink to="/teacherDashboard"> Teacher Dashboard </NavLink> /
        <span className="text-[#ffae01] font-semibold"> Exam Result</span>
      </p>      
      <div className="container mt-4">
        {/* <h2 className="text-xl font-semibold mb-4">User List</h2> */}
        <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Exam Marks</th>
              <th className="border px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  {/* Display FirstName and LastName in a single column */}
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2">
                  {/* Placeholder for Exam Marks */}
                  <input
                    type="number"
                    className="border p-1 rounded"
                    placeholder="Enter marks"
                  />
                </td>
                <td className="border px-4 py-2">
                  {/* Placeholder for Remarks */}
                  <input
                    type="text"
                    className="border p-1 rounded"
                    placeholder="Enter remarks"
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

export default UpdateResult;
