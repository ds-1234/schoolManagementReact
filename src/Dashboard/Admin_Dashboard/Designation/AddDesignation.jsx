import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import Loader from '../../../Reusable_components/Loader'; // Import reusable loader


const AddDesignation = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [value, setValue] = useState(true);
  const [loading, setLoading] = useState(false);
  


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
    setLoading(true); // Start loader
    axios({
      method: 'POST',
      url: `${BASE_URL}/designation/saveDesignation`,
      data: {
        designationName: data.designationName,
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
      }).finally(()=> {
        setLoading(false); // Stop loader
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Designation</h2>

          {/* Designation Input */}
          <div className="mb-4">
            <label htmlFor="designationName" className="block text-gray-700 font-semibold mb-2">Designation</label>
            <input
              type="text"
              id="designationName"
              className={`w-full px-3 py-2 border ${errors.designationName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('designationName', { required: 'Designation name is required' })}
            />
            {errors.designationName && <p className="text-red-500 text-sm mt-1">{errors.designationName.message}</p>}
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


          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddDesignation;
