import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BankDets({ handlePrevious , handleNext , userId , currentStep , selectedRole}) {
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

  useEffect(() => {
    // Fetch the existing teacher details if available
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
            const data = response.data.data;

            if (data) {
                // If data exists, populate the form
                reset(data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

      fetchDetails();
}, [reset , userId]);

  return (
    <div className="space-y-2 mb-5">
      <h3 className="font-semibold text-gray-900 text-xl">Bank Information</h3>
      
      <div className="grid grid-cols-3 gap-5 ">
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountName" className="text-sm font-medium">Account Name</label>
          <input
            type="text"
            id="accountName"
            {...register('accountName', { required: 'Account Name is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountNumber" className=" text-sm font-medium">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            {...register('accountNumber', { required: 'Account Number is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="bankName" className=" text-sm font-medium">Bank Name</label>
          <input
            type="text"
            id="bankName"
            {...register('bankName', { required: 'Bank Name is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="ifsc" className=" text-sm font-medium">IFSC Code</label>
          <input
            type="text"
            id="ifsc"
            {...register('ifsc', { required: 'IFSC Code is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="branchName" className=" text-sm font-medium">Branch Name</label>
          <input
            type="text"
            id="branchName"
            {...register('branchName', { required: 'Branch Name is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
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

export default BankDets