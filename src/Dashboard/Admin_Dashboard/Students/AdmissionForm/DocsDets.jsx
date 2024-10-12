import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';

function DocsDets({handleNextStep}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data);
        handleNextStep()
        navigate('/admin/prevSchool')
    }
  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
         <h2 className="col-span-4  mt-8 text-xl font-semibold text-black">Documents Required</h2>
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
          <div className="col-span-2">
            <label htmlFor="transferCertificate">Upload Transfer Certificate</label>
            <input
              type="file"
              id="transferCertificate"
              className="mt-1 block w-full border-gray-300 rounded-md"
              {...register('transferCertificate')}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="idProof">Upload ID Proof</label>
            <input
              type="file"
              id="idProof"
              className="mt-1 block w-full border-gray-300 rounded-md"
              {...register('idProof')}
            />
          </div>
          <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
        </form>
    </div>
  )
}

export default DocsDets