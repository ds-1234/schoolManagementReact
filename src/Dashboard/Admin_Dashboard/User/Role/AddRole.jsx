import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
// import { useNavigate } from 'react-router-dom';

const AddRole = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // const navigate = useNavigate()

  const onSubmit = (data) => {
    axios({
        method:"POST",
        url : `http://localhost:8080/role/createRole`,
        data: {
            name : data.role ,
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add role");
        reset()
        onClose(); 
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new role");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Role</h2>

        {/* Subject Input */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label>
          <input
            type="text"
            id="role"
            className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('role', { required: 'role is required' })}
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>


        {/* Submit Button */}
        <Button 
        type='submit'
        className='w-full text-center'
        // label={"Add new Role"}
        />
      </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddRole;
