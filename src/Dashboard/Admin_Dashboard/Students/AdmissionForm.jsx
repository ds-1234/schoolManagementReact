import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'

function AdmissionForm() {
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto ml-24 bg-white rounded-xl shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-semibold text-black">Add New Students</h2>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input {...register('firstName', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input {...register('lastName', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender *</label>
          <select {...register('gender', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1">
            <option className="hidden">Please Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Of Birth *</label>
          <input {...register('dob', { required: true })} type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll</label>
          <input {...register('roll')} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group *</label>
          <select {...register('bloodGroup', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1">
            <option>Please Select Group</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Religion *</label>
          <select {...register('religion', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1 ">
            <option>Please Select Religion</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-Mail</label>
          <input {...register('email')} type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Class *</label>
          <select {...register('class', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1">
            <option>Please Select Class</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Section *</label>
          <select {...register('section', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1">
            <option>Please Select Section</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Admission ID</label>
          <input {...register('admissionId')} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input {...register('phone')} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div className="col-span-2 row-span-5">
          <label className="block text-sm font-medium text-gray-700">Short BIO</label>
          <textarea {...register('bio')} className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"></textarea>
        </div>
        <div className="col-span-2 mt-8">
          <label className="block text-sm font-medium text-gray-700">Upload Student Photo (150px X 150px)</label>
          <input {...register('photo')} type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base py-1 px-1"/>
        </div>
      </div>
      <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => reset()} label="Reset" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>
  );
}

export default AdmissionForm;
