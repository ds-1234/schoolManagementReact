import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Reusable_components/Button';
import { useUserContext } from '../../../../hooks/UserContext';
import axios from 'axios';
import ProgressIndicator from './ProgressIndicator';
import { NavLink } from 'react-router-dom';
import { toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { useStepContext } from '../../../../hooks/StepContext';
import BASE_URL from '../../../../conf/conf';
import { useState } from 'react';
import Loader from '../../../../Reusable_components/Loader';

function PrevSchlDets() {
  const [loading, setLoading] = useState(false);
  const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
  const {userId} = useUserContext() 
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      useEffect(() => {
        // Fetch the existing student details if available
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
                const studentData = response.data.data;

                if (studentData) {
                    // If data exists, populate the form
                    reset(studentData);
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

          fetchStudentDetails();
    }, [reset , userId]);

      const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        
        const userData = {
            ...data , 
            userId : userId ,
          }
          if(data.previousSchoolName){
            await axios({
              method:"Post",
              url : `${BASE_URL}/user/updatePreSchoolDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              handleNextStep();
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              reset()
          }).finally(() => {
            setLoading(false); // Stop loader
          });
        }else{
            handleNextStep()
          }
    }
    
  return (
    <div>
              <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>
        <NavLink to = '/admin'> Dashboard </NavLink>/
        <NavLink to = '/admin/students'> Students </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
         <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Previous School Details</h2>
         <form  className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-5 gap-6">
          <div className="flex flex-col px-1">
            <label htmlFor="previousSchool">School Name</label>
            <input
              type="text"
              id="previousSchoolName"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('previousSchoolName')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="previousAddress">Address</label>
            <input
              type="text"
              id="previousAddress"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('preSchoolAddress')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="leavingYear">Leaving Year Session</label>
            <input
              type="text"
              id="preSchoolLeavingSession"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('preSchoolLeavingSession')}
            />
          </div>

    </form>
    <div className='flex justify-between items-center mt-10 lg:mt-5'>
    <button onClick={() => handlePrevStep()}>
        <h1 className='font-semibold text-medium cursor-pointer'>
            <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
            Back
        </h1>
    </button>
        <div className="col-span-2 flex justify-end space-x-4">
            <Button type='submit' label="Save & Continue" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
    </div>
    </div>
    {/* <ToastContainer/> */}
    </div>
  )
}

export default PrevSchlDets