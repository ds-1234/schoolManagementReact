import React from 'react';
import { useForm } from 'react-hook-form';
import {Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';

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
        allotedStratDate: '',
        allotedEndtDate: '',
        isActive: '',
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
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Add School</h2>
        <form onSubmit={handleSubmit(SubmitBook)} className="space-y-4">
          <div>
            <Input
              {...register('name', {
                required: 'Book name is required',
              })}
              label="Book Name"
              labelPlacement="outside"
              placeholder="Enter the Book name"
              aria-invalid={errors.name ? 'true' : 'false'}
              color={errors.name ? 'error' : 'default'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('description', {
                required: 'Description is required',
              })}
              label="Description"
              labelPlacement="outside"
              placeholder="Enter the Description"
              aria-invalid={errors.houseNumber ? 'true' : 'false'}
              color={errors.houseNumber ? 'error' : 'default'}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('author', {
                required: 'author is required',
              })}
              label="author"
              labelPlacement="outside"
              placeholder="Enter the author"
              aria-invalid={errors.author ? 'true' : 'false'}
              color={errors.author ? 'error' : 'default'}
            />
            {errors.author && (
              <span className="text-red-500 text-sm">{errors.author.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('publishingYear', {
                required: 'Publishing Year is required',
              })}
              label="Publishing Year"
              labelPlacement="outside"
              placeholder="Enter the Publishing Year"
              aria-invalid={errors.publishingYear ? 'true' : 'false'}
              color={errors.publishingYear ? 'error' : 'default'}
            />
            {errors.publishingYear && (
              <span className="text-red-500 text-sm">{errors.publishingYear.message}</span>
            )}
          </div>


          {/* <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="primary"
            className="w-full mt-4"
          >
            Add Book
          </Button> */}

          <Button 
          // onClick={handleSubmit}
          className='w-full text-center'
          label={"Add Book"}/>

        </form>
      </div>
    </div>
  );
};

export default AddBooksPopup;
