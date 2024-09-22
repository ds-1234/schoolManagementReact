import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../Reusable_components/Button';

function Admin() {
  const navigate = useNavigate();


  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Navigate back to login
    navigate('/');
  };

  return (
<>
  <div className="flex flex-col items-center mt-20">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard!</h1>
    
    <div className="mt-6">
      <Button label="Logout" onClick={handleLogout} />
    </div>
  </div>
</>

  )
}

export default Admin