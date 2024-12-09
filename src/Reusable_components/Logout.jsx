import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <Button label="Logout" onClick={handleLogout} className='hidden md:block cursor-pointer'/>
      <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={handleLogout} className='md:hidden border bg-[#042954] text-white py-2 px-2 rounded-md cursor-pointer' />
    </div>


  )
}

export default Logout