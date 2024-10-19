import React, {useEffect} from 'react'
import DatePicker from '../../../../Reusable_components/DatePicker'
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function OfficeDets() {
  const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
  const {userId} = useUserContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const navigate = useNavigate();

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

      const onSubmit = async(data) => {
        console.log(data);
        
        const userData = {
            ...data , 
            userId : userId ,
          }
          await axios({
              method:"Post",
              url : `${BASE_URL}/user/updateOfficeDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              handleNextStep()
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              reset()
          })
    }

  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Office Details</h2>
    <form className="grid grid-cols-4 mt-5 gap-6">
        <div className="flex flex-col px-1">
            <DatePicker 
            name={'admissionDate'}
            label={"Admission Date"}
            register={register}
            className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none`}
            />
        </div>

        <div className="flex flex-col px-1">
            <label htmlFor="admissionNumber">Admission Number</label>
            <input
            type="text"
            id="admissionNumber"
            placeholder=""
            className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
            {...register('admissionNumber')}
            />
        </div>
    </form>
    <div className='flex justify-between items-center'>
    <button onClick={() => handlePrevStep()}>
            <h1 className='mt-6 font-semibold text-medium cursor-pointer'>
                <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
                Back
            </h1>
      </button>
        <div className="col-span-2 flex justify-end space-x-4 mt-5">
            <Button type='submit' label="Save & Continue" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
    </div>
</div>
</div>
  )
}

export default OfficeDets