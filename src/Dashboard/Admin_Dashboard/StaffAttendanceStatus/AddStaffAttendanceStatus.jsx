import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import 'react-toastify/dist/ReactToastify.css';

const AddStaffAttendanceStatus = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [value, setValue] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: `${BASE_URL}/attendance/saveStaffAttendanceStatus`,
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        attendanceStatus: data.attendanceStatus,
        isActive: value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Data');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Data');
        onClose();
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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Attendance Status</h2>

          {/* Start Time Input */}
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-gray-700 font-semibold mb-2">Start Time</label>
            <input
              type="time"
              id="startTime"
              className={`w-full px-3 py-2 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              {...register('startTime', { required: 'Start time is required' })}
              step="1"
            />
            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
          </div>

          {/* End Time Input */}
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700 font-semibold mb-2">End Time</label>
            <input
              type="time"
              id="endTime"
              className={`w-full px-3 py-2 border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              {...register('endTime', { required: 'End time is required' })}
              step="1"
            />
            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
          </div>

          {/* Attendance Status Input */}
          <div className="mb-4">
            <label htmlFor="attendanceStatus" className="block text-gray-700 font-semibold mb-2">Attendance Status</label>
            <input
              type="text"
              id="attendanceStatus"
              className={`w-full px-3 py-2 border ${errors.attendanceStatus ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              {...register('attendanceStatus', { required: 'Attendance status is required' })}
            />
            {errors.attendanceStatus && <p className="text-red-500 text-sm mt-1">{errors.attendanceStatus.message}</p>}
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

          <Button type="submit" className="w-full bg-[#042954] text-white py-2 mt-4">Submit</Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddStaffAttendanceStatus;
