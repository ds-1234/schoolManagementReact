import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import BASE_URL from '../../../../conf/conf';
// import { useNavigate } from 'react-router-dom';

const AddExamType = ({ isOpen, onClose }) => {


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

  // const navigate = useNavigate()

  const onSubmit = (data) => {
    axios({
        method:"POST",
        url : `${BASE_URL}/examType/createExamType`,
        data: {
          examTypeName : data.ExamName ,
          examTypeDescription : data.description 
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add Exam Type");
        reset()
        onClose(); 
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new Exam Type");
        onClose();
    })
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className=""
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Exam Type</h2>

        {/* Exam Name Input */}
        <div className="mb-4">
          <label htmlFor="ExamName" className="block text-gray-700 font-semibold mb-2">Exam Type *</label>
          <input
            type="text"
            id="ExamName"
            className={`w-full px-3 py-2 border ${errors.ExamName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('ExamName', { required: 'Exam name is required' })}
          />
          {errors.ExamName && <p className="text-red-500 text-sm mt-1">{errors.ExamName.message}</p>}
        </div>

        {/* Description Input */}
        <div className="mb-2">
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
        <Button 
        type='submit'
        className='w-full text-center'
        // label={"Add new Exam Type"}
        />
      </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddExamType;
