import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useState } from 'react';
import ToggleButton from '../../../../Reusable_components/ToggleButton';

const AddEventCategory = ({ isOpen, onClose }) => {

    const [value, setValue] = useState(true);


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


  const generateRandomColor = () => {
    // Hue: Random value between 0 and 360 degrees for variety of colors
    const hue = Math.floor(Math.random() * 360);
    
    // Saturation: High (90-100%) for neon-like vibrancy
    const saturation = 100;
    
    // Lightness: Adjusted to 50-60% for brightness without washing out the color
    const lightness = Math.floor(Math.random() * 20) + 50; // Random value between 50 and 70
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  

  // Handle form submission
  const onSubmit = (data) => {
    const color = generateRandomColor(); // Generate random color for event tile border

    axios({
      method: 'POST',
      url: `${BASE_URL}/eventCategory/saveEventCategory`,
      data: {
        eventCategoryTitle: data.CategoryTitle,
        eventCatColorCode:color,
        isActive:value
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Event Category');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Event Category');
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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Event Category</h2>

          {/* Room Type Input */}
          <div className="mb-4">
            <label htmlFor="CategoryTitle" className="block text-gray-700 font-semibold mb-2">Event Category Title</label>
            <input
              type="text"
              id="CategoryTitle"
              className={`w-full px-3 py-2 border ${errors.CategoryTitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('CategoryTitle', { required: 'Room Type is required' })}
            />
            {errors.CategoryTitle && <p className="text-red-500 text-sm mt-1">{errors.CategoryTitle.message}</p>}
          </div>

          {/* Description Input
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div> */}

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">Status *</label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
              />
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

export default AddEventCategory;
