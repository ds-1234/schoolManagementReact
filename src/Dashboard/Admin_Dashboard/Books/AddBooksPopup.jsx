import React from 'react';
import { useForm } from 'react-hook-form';
import {Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddBooksPopup = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const SubmitBook = (data) => {
    const formData = getValues();
    console.log('Form Data:', formData);
    console.log('Submitted Data:', data);

    axios({
      method: 'post',
      url: 'http://localhost:8080/book/createBook',
      data: {
        name: data.name,
        description: data.description,
        author: data.author,
        publishingYear: data.publishingYear,
        allotedStratDate: data.startdate,
        allotedEndtDate: data.enddate,
        isActive: data.active ? 'true' : 'false'
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('Book added successfully!');
        onClose();
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add Book.');
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
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Add Book</h2>
        <form onSubmit={handleSubmit(SubmitBook)} className="space-y-4">
          <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Book Name
            </label>
            <Input
              {...register('name', {
                required: 'Book name is required',
              })}
              placeholder="Enter the Book name"
              aria-invalid={errors.name ? 'true' : 'false'}
              color={errors.name ? 'error' : 'default'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
            </label>
            <Input
              {...register('description', {
                required: 'Description is required',
              })}
              placeholder="Enter the Description"
              aria-invalid={errors.houseNumber ? 'true' : 'false'}
              color={errors.houseNumber ? 'error' : 'default'}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <Input
              {...register('author', {
                required: 'author is required',
              })}
              placeholder="Enter the author"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.author && (
              <span className="text-red-500 text-sm">{errors.author.message}</span>
            )}
          </div>

{/* <div>
  <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
    Publishing Year
  </label>
  <input
    {...register('publishingYear', { required: 'Publishing Year is required' })}
    type="date"
    id="publishingYear"
    placeholder="Enter the Publishing Year"
    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"
  />
  {errors.publishingYear && (
    <span className="text-red-500 text-sm">{errors.publishingYear.message}</span>
  )}
</div> */}


            <div>
              <label htmlFor="startdate" className="block text-sm font-medium text-gray-700">
              Alloted Start Date
            </label>
            <Input
              {...register('startdate', {
                required: 'startdate is required',
              })}
              placeholder="Enter the Alloted Start Date"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.startdate && (
              <span className="text-red-500 text-sm">{errors.startdate.message}</span>
            )}
          </div>

            <div>
              <label htmlFor="enddate" className="block text-sm font-medium text-gray-700">
              Alloted End Date
            </label>
            <Input
              {...register('enddate', {
                required: 'enddate is required',
              })}
              placeholder="Enter the Alloted End Date"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.enddate && (
              <span className="text-red-500 text-sm">{errors.enddate.message}</span>
            )}
          </div>
          
              <div       className="mt-1 block w-full sm:text-base bg-[#f3f4f6] " >
                  <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
                     Publishing Year
                  </label>  
                   <LocalizationProvider dateAdapter={AdapterDayjs} >
                   <DatePicker
                    label = 'Select Date'
                    {...register('publishingYear', { required: 'Publishing Year is required' })}
                    sx={{ width: '100%', '.MuiInputBase-input': { padding: '8px' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiFormLabel-root': { fontSize: '0.875rem',transform: 'translateY(8px)',marginBottom: '5px',marginLeft:'5px' } }}
                  />
             </LocalizationProvider>
                   </div>

      {/* Reusable Toggle Button */}
      <ToggleButton
        id="active"
        label="Active"
        register={register}
        defaultChecked={true} // Default to true
      />

          <Button 
          type='submit'
          className='w-full text-center'
          />

        </form>
      </div>
    </div>
  );
};

export default AddBooksPopup;
