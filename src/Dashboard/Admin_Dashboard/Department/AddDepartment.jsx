import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import Loader from '../../../Reusable_components/Loader'; // Import reusable loader
import BASE_URL from '../../../conf/conf';

const AddDepartment = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [value, setValue] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    // setTimeout(() => {
      axios({
        method: 'POST',
        url: `${BASE_URL}/department/saveDepartment`,
        data: {
          departmentName: data.departmentName,
          isActive: value,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          toast.success('Successfully added Data');
          reset();
          onClose();
        })
        .catch((err) => {
          toast.error('Error adding new Data');
          onClose();
        })
        .finally(() => {
          setLoading(false); // Stop loader
        });
    // }, 3000);
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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">
            Add New Department
          </h2>

          <div className="mb-4">
            <label htmlFor="departmentName" className="block text-gray-700 font-semibold mb-2">
              Department
            </label>
            <input
              type="text"
              id="departmentName"
              className={`w-full px-3 py-2 border ${errors.departmentName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('departmentName', { required: 'Department name is required' })}
            />
            {errors.departmentName && <p className="text-red-500 text-sm mt-1">{errors.departmentName.message}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
              Status
            </label>
            <ToggleButton
              isOn={value}
              handleToggle={() => setValue(!value)}
              id="active"
              register={register}
            />
          </div>

          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
