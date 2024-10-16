import React, { useState } from 'react'
import ToggleButton from '../../../../Reusable_components/ToggleButton'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Reusable_components/Button';
import { useUserContext } from '../../../../hooks/UserContext';
import axios from 'axios';
import ProgressIndicator from './ProgressIndicator';
import { NavLink } from 'react-router-dom';

function PrevSchlDets() {
  const {userId} = useUserContext() 
    const navigate = useNavigate()
    const [value , setValue] = useState(true) 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit = async (data) => {
        console.log(data);
        
        const userData = {
            ...data , 
            userId : userId ,
          }
          await axios({
              method:"Post",
              url : `http://localhost:8080/user/updatePreSchoolDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              navigate('/admin/allStudents')
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
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={7} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
         <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Previous School Details</h2>
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
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

          <div className="mb-2">
                <label className="mb-2" htmlFor="status">
                  Status 
                </label>
                <ToggleButton
                  isOn={value}
                  handleToggle={() => setValue(!value)}
                  id="status"
                  register={register}
                  {...register('status')}
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
    </div>
  )
}

export default PrevSchlDets