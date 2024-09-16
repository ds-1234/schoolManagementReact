import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'
import { NavLink } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Input } from '@nextui-org/react';

function AdmissionForm() {
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div className='pl-0 h-full mr-10 mb-10'>
       <h1 className='text-lg md:text-2xl pl-28 pt-8 font-semibold text-black'>Admission Form</h1>
       <p className='pl-28 mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>

    <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto ml-24 bg-white rounded-xl shadow-md space-y-6 my-5">
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
        {/* <div       className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] "
        >
          <label className="block text-sm font-medium text-gray-700 ">Date Of Birth *</label>
   <LocalizationProvider dateAdapter={AdapterDayjs} >
    <DatePicker
      label = 'Select Date'
       {...register('date', { required: 'Date is required' })}
       sx={{ width: '100%', '.MuiInputBase-input': { padding: '8px' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiFormLabel-root': { fontSize: '1rem',transform: 'translateY(8px)',marginBottom: '5px',marginLeft:'5px' } }}

       id="date"

       />
  </LocalizationProvider>
        </div> */}


         <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date Of Birth *
            </label>
            <Input
            // type='text'
              {...register('date', { required: 'Date Of Birth is required' })}
              placeholder="Select Date" 
              onFocus={(e) => {
                e.target.type = 'date'; 
                e.target.placeholder = ''; 
                console.log('focused')
              }}
              // onBlur={(e) => {       
              //     e.target.type = 'text'; 
              //     e.target.placeholder = 'Select Date'; 
              //     console.log('blur')
              // }}
             
            />
      
          </div>




        <div>
          <label className="block text-sm font-medium text-gray-700">Roll No. *</label>
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
          <Button type='submit' label="Submit" className='px-8'/>
          <Button onClick={() => reset()} label="Reset" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>
    </div>
  );
}

export default AdmissionForm;
