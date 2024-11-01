import React from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';

function HRDets({ handlePrevious , handleNext , userId , currentStep , selectedRole}) {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}/teacherInfo/createTeacherInfo`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        teacherId : userId,
      }
    })
    .then((response) => {
      toast.success("User Updated Successfully !")
      handleNext()
    })
    .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  const navigate = useNavigate()

  return (
    <div className='space-y-2 mb-5'>
      <h3 className=" font-semibold text-gray-900 text-xl">HR Information</h3>
      <div className='grid grid-cols-2 gap-5'>
      <div className="flex flex-col  mb-5 gap-2">
        <label htmlFor="aadhar">Aadhar Card </label>
        <input
            type="text"
            id="aadhar"
            placeholder='Enter Aadhar Number'
            {...register('aadhar', { required: 'Aadhar Number is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        <input
          type="file"
          id="aadharCard"
          className={`py-2 px-2 rounded-lg border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
          // {...register('aadharCard', { required: 'Aadhar Card is required' })}
        />
        {errors.aadhar && <span className="text-red-500 text-sm">{errors.aadhar.message}</span>}
      </div>

      <div className="flex flex-col  mb-5 gap-2">
        <label htmlFor="pan">PAN Card</label>
        <input
            type="text"
            id="pan"
            placeholder='Enter Pan Card Number'
            {...register('pan', { required: 'Pan Card Number is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        <input
          type="file"
          id="panCard"
          className={`py-2 px-2 rounded-lg border ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
          // {...register('pan', { required: 'PAN Card is required' })}
        />
        {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
      </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
        <button
          onClick={handleSubmit(onSubmit)}
          hidden={selectedRole != 4}
          className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
        >
          Save & Continue 
        </button>
            <Button onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>
      </div>
  )
}

export default HRDets