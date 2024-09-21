import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from '../../../Reusable_components/DatePicker';

function AddNotice() {


  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate() 


  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
    console.log('Submitted Data:', data);

    axios({
      method: 'post',
      url: 'http://localhost:8080/notice/createNotice',
      data: {
        noticeTitle: data.title,
        noticeDetails: data.details,
        postedBy: data.postedby,
        noticeDate: data.date,

      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('School added successfully!');
        navigate('/admin/notice' ) ;

        // onClose();
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add school.');
        // onClose();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-semibold text-black"> Add Notice</h2>
      <p className=' '>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<NavLink to = '/admin/notice'> Notices </NavLink>/ <span className='text-[#ffae01] font-semibold'>Add Notice</span> </p>
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
          {/* Using the reusable DatePicker component */}
          <DatePicker
            labelClass = {"block text-sm font-medium text-gray-700"}
            name="date"
            label="Date"
            register={register}
            required={true}
            className={'mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1'}
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
