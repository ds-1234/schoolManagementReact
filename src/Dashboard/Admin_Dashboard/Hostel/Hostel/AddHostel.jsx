import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';

const AddHostel = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Clean up scrolling style
    };
  }, [isOpen, onClose]);

  // Handle form submission
  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/hostel/saveHostel',
      data: {
        hostelName: data.hostelName,
        hostelType: data.hostelType,
        intakeBedCount: data.intake,
        hostelAddress: data.address,
        description: data.description,
        isActive:true
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Hostel');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Hostel');
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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Hostel</h2>

          {/* Hostel Name Input */}
          <div className="mb-4">
            <label htmlFor="hostelName" className="block text-gray-700 font-semibold mb-2">Hostel Name</label>
            <input
              type="text"
              id="hostelName"
              className={`w-full px-3 py-2 border ${errors.hostelName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('hostelName', { required: 'Hostel Name is required' })}
            />
            {errors.hostelName && <p className="text-red-500 text-sm mt-1">{errors.hostelName.message}</p>}
          </div>
          {/* Hostel Type Input */}
          <div className="mb-4">
             <label htmlFor="hostelType" className="block text-gray-700 font-semibold mb-2">Hostel Type</label>
               <select
                 id="hostelType"
                 className={`w-full px-3 py-2 border ${errors.hostelType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                 {...register('hostelType', { required: 'Hostel Type is required' })}
                 >
                <option value="">Select Hostel Type</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
               </select>
              {errors.hostelType && <p className="text-red-500 text-sm mt-1">{errors.hostelType.message}</p>}
         </div>


          {/* Intake Input */}
          <div className="mb-4">
            <label htmlFor="intake" className="block text-gray-700 font-semibold mb-2">Intake</label>
            <input
              type="number"
              id="intake"
              className={`w-full px-3 py-2 border ${errors.intake ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('intake', { required: 'Intake is required' })}
            />
            {errors.intake && <p className="text-red-500 text-sm mt-1">{errors.intake.message}</p>}
          </div>
          {/* Address Input */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="2"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddHostel;
