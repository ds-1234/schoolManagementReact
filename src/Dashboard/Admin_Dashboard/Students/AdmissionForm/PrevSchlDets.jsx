import React, { useState } from 'react'
import ToggleButton from '../../../../Reusable_components/ToggleButton'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Reusable_components/Button';

function PrevSchlDets({handleNextStep , currentStep}) {
    const navigate = useNavigate()
    const [value , setValue] = useState(true) 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit = (data) => {
        console.log(data);
        navigate('/admin/allStudents')
      }
    
  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
         <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Previous School Details</h2>
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
          <div className="flex flex-col px-1">
            <label htmlFor="previousSchool">School Name</label>
            <input
              type="text"
              id="previousSchool"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('previousSchool')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="previousAddress">Address</label>
            <input
              type="text"
              id="previousAddress"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('previousAddress')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="leavingYear">Leaving Year Session</label>
            <input
              type="text"
              id="leavingYear"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('leavingYear')}
            />
          </div>

          <div className="mb-2">
                <label className="mb-2" htmlFor="isActive">
                  Status 
                </label>
                <ToggleButton
                  isOn={value}
                  handleToggle={() => setValue(!value)}
                  id="isActive"
                  register={register}
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

export default PrevSchlDets