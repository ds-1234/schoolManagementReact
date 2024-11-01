import React , {useState} from 'react'
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';

function Documents() {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [toggleValue, setToggleValue] = useState(true);

  return (
    <div className='space-y-2 mb-5'>
    <h3 className=" font-semibold text-gray-900 text-xl">Upload Documents</h3>
    <div className='grid grid-cols-2 gap-5'>
    <div className="flex flex-col  mb-5">
      <label htmlFor="resume">Resume </label>
      <input
        type="file"
        id="resume"
        className={`py-2 px-2 rounded-lg border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
        {...register('resume', { required: 'Resume is required' })}
      />
      {errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}
    </div>

    <div className="flex flex-col  mb-5">
      <label htmlFor="photo">Upload Photo</label>
      <input
        type="file"
        id="photo"
        className={`py-2 px-2 rounded-lg border ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
        {...register('photo', { required: 'Photo is required' })}
      />
      {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
    </div>
    </div>

    <div className="mb-2">
      <label className="mb-2" htmlFor="active">Status</label>
      <ToggleButton
        isOn={toggleValue}
        handleToggle={() => setToggleValue(!toggleValue)}
        id="active"
      />
    </div>
  </div>
  )
}

export default Documents