import React , {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../../Reusable_components/Loader';

function BankDets({ handlePrevious , handleNext , userId , currentStep , selectedRole}) {
  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [teacherData , setTeacherData] = useState(null) ;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true); // Start loader
    axios({
      method: "post",
      url: `${BASE_URL}/teacherInfo/createTeacherInfo`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...teacherData ,
        accountName : data.accountName ,
        accountNumber : data.accountNumber ,
        bankName : data.bankName ,
        branchName : data.branchName ,
        ifsc: data.ifsc ,
        teacherId : userId,
      }
    })
    .then((response) => {
      toast.success("User Updated Successfully !")
      handleNext()
    })
    .catch((error) => {
        console.error("Error updating user:", error);
      }).finally(()=> {
        setLoading(false); // Stop loader
      });
  }

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the existing teacher details if available
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
            const data = response.data.data;
            setTeacherData(data) ;
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
            <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <h3 className="font-semibold text-gray-900 text-xl">Bank Information</h3>
      
      <div className="grid grid-cols-3 gap-5 ">
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountName" className="text-sm font-medium">Account Name</label>
          <input
            type="text"
            id="accountName"
            {...register('accountName')}
            className="border border-gray-300 p-2 rounded-lg "
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountNumber" className="text-sm font-medium">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            {...register('accountNumber', {
              minLength: {
                value: 10,
                message: 'Account Number must be at least 10 characters',
              },
            })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="bankName" className=" text-sm font-medium">Bank Name</label>
          <input
            type="text"
            id="bankName"
            {...register('bankName')}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="ifsc" className=" text-sm font-medium">IFSC Code</label>
          <input
            type="text"
            id="ifsc"
            {...register('ifsc')}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="branchName" className=" text-sm font-medium">Branch Name</label>
          <input
            type="text"
            id="branchName"
            {...register('branchName')}
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

      {/* <ToastContainer/> */}

      </div>
  )
}

export default BankDets