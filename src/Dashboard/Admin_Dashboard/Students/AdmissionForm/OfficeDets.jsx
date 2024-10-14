import React from 'react'
import DatePicker from '../../../../Reusable_components/DatePicker'
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import axios from 'axios';

function OfficeDets({handleNextStep , currentStep}) {
  const {userId} = useUserContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const navigate = useNavigate();
      const onSubmit = async(data) => {
        console.log(data);
        
        const userData = {
            ...data , 
            userId : userId ,
          }
          await axios({
              method:"Post",
              url : `http://localhost:8080/user/updateOfficeDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              handleNextStep(currentStep)
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              reset()
          })
    }

  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Office Details</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
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
        <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin/allStudents')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>
</div>
  )
}

export default OfficeDets