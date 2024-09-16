import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';

const EditBookPopup = ({ isOpen, onClose, bookId, onSuccess }) => {
  const [active, setActive] = useState(true);

  const [book, setBook] = useState({
    name: '',
    description: '',
    author: '',
    publishingYear: '',
    allotedStartDate: '',
    allotedEndDate: '',
    // isActive: ''
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    if (bookId) {
      axios({
        method: 'GET',
        url: `http://localhost:8080/book/getBook/${bookId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const data = response.data.data;
          setBook(data);
          setValue('name', data.name);
          setValue('description', data.description);
          setValue('author', data.author);
          setValue('publishingYear', data.publishingYear);
          setValue('allotedStartDate', data.allotedStartDate);
          setValue('allotedEndDate', data.allotedEndDate);
          // setValue('isActive', data.isActive);
        })
        .catch((error) => {
          console.error('Error fetching Book:', error);
        });
    }
  }, [bookId, isOpen, setValue]);

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
    const { name, value, type, checked } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const submitBook = (data) => {
    axios({
      method: 'POST',
      url: `http://localhost:8080/book/createBook/${bookId}`,
      data: {
        ...book,
        isActive: book.isActive ? 'true' : 'false', // Convert boolean to string
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('Book updated successfully!');
        onSuccess(); // Call onSuccess to refresh data
        onClose(); // Close the popup
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Failed to update Book.');
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
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Edit Book</h2>
        <form onSubmit={handleSubmit(submitBook)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <Input
              {...register('name', { required: 'Book name is required' })}
              value={book.name}
              onChange={handleChange}
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
              {...register('description', { required: 'Description is required' })}
              value={book.description}
              onChange={handleChange}
              placeholder="Enter the Description"
              aria-invalid={errors.description ? 'true' : 'false'}
              color={errors.description ? 'error' : 'default'}
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
              {...register('author', { required: 'Author is required' })}
              value={book.author}
              onChange={handleChange}
              placeholder="Enter the author"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.author && (
              <span className="text-red-500 text-sm">{errors.author.message}</span>
            )}
          </div>


          <div>
            <label htmlFor="allotedStartDate" className="block text-sm font-medium text-gray-700">
              Alloted Start Date
            </label>
            <Input
              {...register('allotedStartDate', { required: 'Alloted Start Date is required' })}
              value={book.allotedStartDate}
              onChange={handleChange}
              placeholder="Enter the Alloted Start Date"
              aria-invalid={errors.allotedStartDate ? 'true' : 'false'}
              color={errors.allotedStartDate ? 'error' : 'default'}
            />
            {errors.allotedStartDate && (
              <span className="text-red-500 text-sm">{errors.allotedStartDate.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="allotedEndDate" className="block text-sm font-medium text-gray-700">
              Alloted End Date
            </label>
            <Input
              {...register('allotedEndDate', { required: 'Alloted End Date is required' })}
              value={book.allotedEndDate}
              onChange={handleChange}
              placeholder="Enter the Alloted End Date"
              aria-invalid={errors.allotedEndDate ? 'true' : 'false'}
              color={errors.allotedEndDate ? 'error' : 'default'}
            />
            {errors.allotedEndDate && (
              <span className="text-red-500 text-sm">{errors.allotedEndDate.message}</span>
            )}
          </div>
          {/* <div>
            <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
              Publishing Year
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                {...register('publishingYear', { required: 'Publishing Year is required' })}
                // value={book.publishingYear}
                onChange={(date) => handleChange({ target: { name: 'publishingYear', value: date } })}
                sx={{
                  width: '100%',
                  '.MuiInputBase-input': { padding: '8px' },
                  '.MuiOutlinedInput-root': { border: 'none' },
                  '.MuiFormLabel-root': {
                    fontSize: '0.875rem',
                    transform: 'translateY(8px)',
                    marginBottom: '5px',
                    marginLeft: '5px',
                  },
                }}
              />
            </LocalizationProvider>
            {errors.publishingYear && (
              <span className="text-red-500 text-sm">{errors.publishingYear.message}</span>
            )}
          </div> */}

<div>
            <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
            Publishing Year
            </label>
            <Input
              {...register('publishingYear', { required: 'Publishing Year is required' })}
              placeholder="Select Date" 
              onFocus={(e) => {
                e.target.type = 'date'; 
                e.target.placeholder = ''; 
                console.log('focused')
              }}
              // onBlur={(e) => {       
              //     e.target.type = 'text'; 
              //     e.target.placeholder = 'Select Date'; 
              //     console.log('blur')
              // }}
                    aria-invalid={errors.publishingYear ? 'true' : 'false'}
              color={errors.publishingYear ? 'error' : 'default'}
            />
            {errors.publishingYear && (
              <span className="text-red-500 text-sm">{errors.publishingYear.message}</span>
            )}
          </div>


          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status *
              </label>
              <ToggleButton
                isOn={active}
                handleToggle={() => setActive(!active)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
};

export default EditBookPopup;
