import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './DatePicker.css'; // Adjust the path as necessary



const AddBooksPopup = ({ isOpen, onClose }) => {
  const [value, setValue] = useState(true);
  const [publishingYear, setPublishingYear] = useState(null); // State for DatePicker

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue: setFormValue, // react-hook-form's setValue to manually set form field values
  } = useForm();

  const SubmitBook = (data) => {
    const formattedPublishingYear = dayjs(data.publishingYear).format('DD-MM-YYYY');

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
        publishingYear: formattedPublishingYear,
        allotedStratDate: data.startdate,
        allotedEndtDate: data.enddate,
        isActive: value.toString(),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('Book added successfully!');
        setValue(false)
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
          {/* Book Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <Input
              {...register('name', { required: 'Book name is required' })}
              placeholder="Enter the Book name"
              aria-invalid={errors.name ? 'true' : 'false'}
              color={errors.name ? 'error' : 'default'}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              {...register('description', { required: 'Description is required' })}
              placeholder="Enter the Description"
              aria-invalid={errors.description ? 'true' : 'false'}
              color={errors.description ? 'error' : 'default'}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <Input
              {...register('author', { required: 'Author is required' })}
              placeholder="Enter the Author"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.author && <span className="text-red-500 text-sm">{errors.author.message}</span>}
          </div>

          {/* Alloted Start Date */}
          <div>
            <label htmlFor="startdate" className="block text-sm font-medium text-gray-700">
              Alloted Start Date
            </label>
            <Input
              {...register('startdate', { required: 'Start date is required' })}
              placeholder="Enter the Alloted Start Date"
              aria-invalid={errors.startdate ? 'true' : 'false'}
              color={errors.startdate ? 'error' : 'default'}
            />
            {errors.startdate && (
              <span className="text-red-500 text-sm">{errors.startdate.message}</span>
            )}
          </div>

          {/* Alloted End Date */}
          <div>
            <label htmlFor="enddate" className="block text-sm font-medium text-gray-700">
              Alloted End Date
            </label>
            <Input
              {...register('enddate', { required: 'End date is required' })}
              placeholder="Enter the Alloted End Date"
              aria-invalid={errors.enddate ? 'true' : 'false'}
              color={errors.enddate ? 'error' : 'default'}
            />
            {errors.enddate && (
              <span className="text-red-500 text-sm">{errors.enddate.message}</span>
            )}
          </div>

          {/* Publishing Year DatePicker */}
          <div className="mt-1 block w-full sm:text-base bg-[#f3f4f6]">
            <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
              Publishing Year
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={publishingYear}
                onChange={(newValue) => setPublishingYear(newValue)} // Update state on date change
                sx={{ width: '100%', '.MuiInputBase-input': { padding: '8px' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiFormLabel-root': { fontSize: '0.875rem',transform: 'translateY(8px)',marginBottom: '5px',marginLeft:'5px' } }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <div className="relative">
                    <input
                      ref={inputRef}
                      {...inputProps}
                      className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {InputProps?.endAdornment}
                  </div>
                )}
              />
            </LocalizationProvider>
            {errors.publishingYear && (
              <span className="text-red-500 text-sm">{errors.publishingYear.message}</span>
            )}
          </div>

          {/* Active Toggle Button */}
          <div>
            {/* <label htmlFor="active" className="block text-sm font-medium text-gray-700">
              Active
            </label> */}
           <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status *
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
};

export default AddBooksPopup;
