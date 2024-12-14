import React, { useEffect, useState } from 'react';

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the 'isParents' array from sessionStorage
    const users = JSON.parse(sessionStorage.getItem('user')) ; // Default to an empty array if not available
    const isParents =  users.isParent || []

    // Fetching data from the API
    fetch('http://localhost:8080/user/getUserList') // Replace with your actual API endpoint
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
          isParents.includes(user.id) // Check if user id exists in isParents
        );
        setUsers(filteredUsers); // Set the filtered users
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Filtered User List (Students with Active Status)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <div key={user.id} className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold text-center text-blue-500">{user.firstName}</h3>
            <p className="text-center text-gray-700">{user.className}</p> {/* Assuming className is available */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchData;
