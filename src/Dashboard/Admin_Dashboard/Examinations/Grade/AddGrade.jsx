import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
// import { useNavigate } from 'react-router-dom';

const AddExamType = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // const navigate = useNavigate()

//   const onSubmit = (data) => {
//     axios({
//         method:"POST",
//         url : `http://localhost:8080/subject/createSubject`,
//         data: {
//             subject : data.subject ,
//             description : data.description 
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
    
//       })
//       .then((response)=>{
//         console.log('response' , response.data)
//         toast.success("Successfully Add Subject");
//         reset()
//         onClose(); 
//     })
//     .catch(err=>{
//         console.log(err,'error:')
//         toast.error("Error to add new Subject");
//         onClose();
//     })
//   }

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
        // onSubmit={handleSubmit(onSubmit)} 
        className=""
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Grade Points</h2>

        {/* Grade Input */}
        <div className="mb-4">
          <label htmlFor="Grade" className="block text-gray-700 font-semibold mb-2">Grade</label>
          <input
            type="text"
            id="Grade"
            className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('Grade', { required: 'Grade is required' })}
          />
          {errors.Grade && <p className="text-red-500 text-sm mt-1">{errors.Grade.message}</p>}
        </div>
        
        {/* Marks from */}
        <div className="mb-4">
          <label htmlFor="marksfrom" className="block text-gray-700 font-semibold mb-2">Marks From(%)</label>
          <input
            type="text"
            id="marksfrom"
            className={`w-full px-3 py-2 border ${errors.marksfrom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('marksfrom', { required: 'marksfrom is required' })}
          />
          {errors.marksfrom && <p className="text-red-500 text-sm mt-1">{errors.marksfrom.message}</p>}
        </div>

        {/* Marks Upto */}
        <div className="mb-4">
          <label htmlFor="marksupto" className="block text-gray-700 font-semibold mb-2">Marks Upto(%)</label>
          <input
            type="text"
            id="marksupto"
            className={`w-full px-3 py-2 border ${errors.marksupto ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('marksupto', { required: 'marksupto is required' })}
          />
          {errors.marksupto && <p className="text-red-500 text-sm mt-1">{errors.marksupto.message}</p>}
        </div>

        {/* Grade Points */}
        <div className="mb-4">
          <label htmlFor="gradepoints" className="block text-gray-700 font-semibold mb-2">Grade Points</label>
          <input
            type="text"
            id="gradepoints"
            className={`w-full px-3 py-2 border ${errors.gradepoints ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('gradepoints', { required: 'gradepoints is required' })}
          />
          {errors.gradepoints && <p className="text-red-500 text-sm mt-1">{errors.gradepoints.message}</p>}
        </div>

        {/* Status */}
        <div className="mb-4">
      {/* Reusable Toggle Button */}
      <ToggleButton
        id="active"
        label="Active"
        register={register}
        defaultChecked={true} // Default to true
      />
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
        <Button 
        type='submit'
        className='w-full text-center'
        />
      </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddExamType;
