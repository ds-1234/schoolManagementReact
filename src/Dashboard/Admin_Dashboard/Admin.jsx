import React from 'react'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();


  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Navigate back to login
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center mt-20'>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Admin