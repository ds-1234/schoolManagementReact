import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';

const AddSchoolPopup = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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

  const Submitschool = (data) => {
    const formData = getValues();
    console.log('Form Data:', formData);
    console.log('Submitted Data:', data);

    axios({
      method: 'post',
      url: 'http://localhost:8080/school/createSchool',
      data: {
        name: data.name,
        houseNumber: data.houseNumber,
        street: data.street,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        country: data.country,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('School added successfully!');
        onClose();
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add school.');
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
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Add School</h2>
        <form onSubmit={handleSubmit(Submitschool)} className="space-y-4">
          <div>
            <Input
              {...register('name', {
                required: 'School name is required',
              })}
              label="School Name"
              labelPlacement="outside"
              placeholder="Enter the school name"
              aria-invalid={errors.name ? 'true' : 'false'}
              color={errors.name ? 'error' : 'default'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('houseNumber', {
                required: 'House number is required',
              })}
              label="House Number"
              labelPlacement="outside"
              placeholder="Enter the house number"
              aria-invalid={errors.houseNumber ? 'true' : 'false'}
              color={errors.houseNumber ? 'error' : 'default'}
            />
            {errors.houseNumber && (
              <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('street', {
                required: 'Street is required',
              })}
              label="Street"
              labelPlacement="outside"
              placeholder="Enter the street"
              aria-invalid={errors.street ? 'true' : 'false'}
              color={errors.street ? 'error' : 'default'}
            />
            {errors.street && (
              <span className="text-red-500 text-sm">{errors.street.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('city', {
                required: 'City is required',
              })}
              label="City"
              labelPlacement="outside"
              placeholder="Enter the city"
              aria-invalid={errors.city ? 'true' : 'false'}
              color={errors.city ? 'error' : 'default'}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('state', {
                required: 'State is required',
              })}
              label="State"
              labelPlacement="outside"
              placeholder="Enter the state"
              aria-invalid={errors.state ? 'true' : 'false'}
              color={errors.state ? 'error' : 'default'}
            />
            {errors.state && (
              <span className="text-red-500 text-sm">{errors.state.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('pinCode', {
                required: 'Pin code is required',
              })}
              label="Pin Code"
              labelPlacement="outside"
              placeholder="Enter the pin code"
              aria-invalid={errors.pinCode ? 'true' : 'false'}
              color={errors.pinCode ? 'error' : 'default'}
            />
            {errors.pinCode && (
              <span className="text-red-500 text-sm">{errors.pinCode.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('country', {
                required: 'Country is required',
              })}
              label="Country"
              labelPlacement="outside"
              placeholder="Enter the country"
              aria-invalid={errors.country ? 'true' : 'false'}
              color={errors.country ? 'error' : 'default'}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country.message}</span>
            )}
          </div>

          {/* <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="primary"
            className="w-full mt-4"
          >
            Add School
          </Button> */}

          <Button 
          // onClick={handleSubmit}
          type='submit'
          className='w-full text-center'
          // label={"Add School"}
          />
        </form>
      </div>
    </div>
  );
};

export default AddSchoolPopup;
