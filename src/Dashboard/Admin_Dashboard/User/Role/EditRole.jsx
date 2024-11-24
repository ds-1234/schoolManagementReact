import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import BASE_URL from '../../../../conf/conf';

function EditSubject({ isOpen, onClose, roleId , onSuccess }) {
  
  const [role, setRole] = useState({ role: '',  });
  // const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/role/getRole/${roleId}`, // API to get specific subject by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setRole(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
      });
  }, [roleId , isOpen]);

  useEffect(() => {
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...role, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/role/createRole/${roleId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: subject,
    })
      .then((response) => {
        console.log("Role updated:", response.data);
        toast.success("Role updated successfully!")

        onSuccess() ;
        onClose() ;
      })
      .catch((error) => {
        console.error("Error updating Role:", error);
        toast.error('Failed to update Role.')
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
      
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Role</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={role.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter role"
            required
          />
        </div>


          <Button 
          // label={"Update Role"}
          type='submit'
          className='w-full text-center'
          />

      </form>
      </div>
    </div>
  );
}

export default EditSubject;
