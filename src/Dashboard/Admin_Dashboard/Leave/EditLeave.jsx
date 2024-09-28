import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../Reusable_components/ToggleButton';

function EditLeave({ isOpen, onClose, leaveId, onSuccess }) {
  const [leave, setLeave] = useState({ leaveType: '', leaveDescription: '' });
  const [value,setValue] =useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8080/leaves/getLeaveById/${leaveId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const leaveData = response.data.data;
        setLeave({
            leaveType: leaveData.leaveType,
            leaveDescription: leaveData.leaveDescription,
        });
        setValue(leaveData.isActive); // Set active status based on API response
      })
      .catch((error) => {
        console.error('Error fetching Leave:', error);
      });
  }, [leaveId]);

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
    setLeave({ ...leave, [name]: value });
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:8080/leaves/saveLeaves`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        id : `${leaveId}`,
        leaveType:leave.leaveType,
        leaveDescription:leave.leaveDescription,
        isActive:value,
        },
    })
      .then((response) => {
        console.log('leave updated:', response.data);
        toast.success('Leave updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating leave:', error);
        toast.error('Failed to update Leave.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Leave</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Leave Type</label>
            <input
              type="text"
              name="leaveType"
              value={leave.leaveType}  
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Leave Type name"
              required
            />
          </div>



          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="leaveDescription"
              value={leave.leaveDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Leave description"
              rows="4"
              required
            />
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditLeave;
