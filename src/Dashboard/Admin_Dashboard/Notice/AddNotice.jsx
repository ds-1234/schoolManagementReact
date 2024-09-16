import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'
import { NavLink } from 'react-router-dom';

function AddNotice() {

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-semibold text-black">Create A Notice</h2>
      <p className=' '>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/<NavLink to = '/admin/notice'> Notices </NavLink>/ <span className='text-[#ffae01] font-semibold'>Add Notice</span> </p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input {...register('title', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Details *</label>
          <input {...register('details', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>

                <div>
          <label className="block text-sm font-medium text-gray-700">Posted By *</label>
          <input {...register('postedby', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date *</label>
          <input {...register('date', { required: true })}  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"
              placeholder="Select Date"
              onFocus={(e) => {
                e.target.type = 'date'; 
                e.target.placeholder = ''; 
                console.log('focused')
              }}
              onBlur={(e) => {
                const value = e.target.value;
                e.target.type = 'text'; // Switch back to text input on blur
                e.target.placeholder = 'Select Date'; // Restore placeholder
          
                // Reformat the date to dd/mm/yyyy if a date is selected
                if (value) {
                  e.target.value = formatDateToDDMMYYYY(value);
                }
              }}
          />
        </div>
        
      </div>
      <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Submit" className='px-8'/>
          <Button onClick={() => reset()} label="Reset" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>
  );
}

export default AddNotice;
