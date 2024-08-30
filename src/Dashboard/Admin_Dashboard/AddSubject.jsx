import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    axios({
        method:"post",
        url : `http://localhost:8080/subject/createSubject`,
        data: {
            subject : data.subject ,
            description : data.description 
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add Subject");
        
        navigate('/admin/subject' , {state: data}) ;   
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new Subject");
    
    })
  }

  return (
    <div className="flex justify-center items-center mt-20">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add New Subject</h2>

        {/* Subject Input */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('subject', { required: 'Subject name is required' })}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="description"
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Subject
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default AddSubject;
