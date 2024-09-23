import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button'

function Logout() {
    const navigate = useNavigate() 

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();

        // Navigate back to login
        navigate('/');
    };

  return (
    <div className="py-2">
      <Button label="Logout" onClick={handleLogout} />
    </div>
  )
}

export default Logout