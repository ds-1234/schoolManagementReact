import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';

const EditBookPopup = ({ isOpen, onClose, bookId, onSuccess }) => {
  const [book, setBook] = useState({
    name: '',
    description: '',
    author: '',
    publishingYear: '',
    allotedStartDate: '',
    allotedEndDate: '',
    isActive: true
  });
  const {
    register,
    handleSubmit,
    formState: { errors },

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
          setBook(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching Book:', error);
        });
    }
  }, [bookId, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const submitBook = (e) => {
    e.preventDefault();
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
        <form onSubmit={submitBook} className="space-y-4">
          <div>
            <Input
              name="name"
              value={book.name}
              onChange={handleChange}
              label="Book Name"
              labelPlacement="outside"
              placeholder="Enter the Book name"
              aria-invalid={!!book.name && 'true'}
              color={!!book.name ? 'default' : 'error'}
            />
          </div>

          <div>
            <Input
              name="description"
              value={book.description}
              onChange={handleChange}
              label="Description"
              labelPlacement="outside"
              placeholder="Enter the Description"
              aria-invalid={!!book.description && 'true'}
              color={!!book.description ? 'default' : 'error'}
            />
          </div>

          <div>
            <Input
              name="author"
              value={book.author}
              onChange={handleChange}
              label="Author"
              labelPlacement="outside"
              placeholder="Enter the author"
              aria-invalid={!!book.author && 'true'}
              color={!!book.author ? 'default' : 'error'}
            />
          </div>

          <div>
            <Input
              name="publishingYear"
              value={book.publishingYear}
              onChange={handleChange}
              label="Publishing Year"
              labelPlacement="outside"
              placeholder="Enter the Publishing Year"
              aria-invalid={!!book.publishingYear && 'true'}
              color={!!book.publishingYear ? 'default' : 'error'}
            />
          </div>

          <div>
            <Input
              name="allotedStartDate"
              value={book.allotedStartDate}
              onChange={handleChange}
              label="Alloted Start Date"
              labelPlacement="outside"
              aria-invalid={!!book.allotedStartDate && 'true'}
              color={!!book.allotedStartDate ? 'default' : 'error'}
            />
          </div>

          <div>
            <Input
              name="allotedEndDate"
              value={book.allotedEndDate}
              onChange={handleChange}
              label="Alloted End Date"
              labelPlacement="outside"
              aria-invalid={!!book.allotedEndDate && 'true'}
              color={!!book.allotedEndDate ? 'default' : 'error'}
            />
          </div>

          <div>
            <ToggleButton
              id="isActive"
              label="Active"
              name="isActive"
              register={register}
              checked={book.isActive}
              onChange={handleChange}
            />
          </div>

          <Button
            type='submit'
            className='w-full text-center'
          />
        </form>
      </div>
    </div>
  );
};

export default EditBookPopup;
