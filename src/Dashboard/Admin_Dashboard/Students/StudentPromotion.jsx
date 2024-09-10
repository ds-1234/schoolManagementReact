import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button';

function StudentPromotion() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [currentSession, setCurrentSession] = useState("");
  const [promoteSession , setPromoteSession] = useState("") ;

  // Automatically generate currentSession value
  useEffect(() => {
    const year = new Date().getFullYear();
    const currentSession = `${year-1}-${year}`;
    const promoteSession = `${year}-${year + 1}`
    setCurrentSession(currentSession);
    setPromoteSession(promoteSession);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 mx-auto ml-24 bg-white rounded-xl shadow-md space-y-10 my-20 ">
      <h2 className="text-2xl font-semibold text-black">Search Student Promotion</h2>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Current Session *</label>
          <select
            {...register('currentSession', { required: 'Current Session is required' })}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
          >
            <option value={currentSession}>{currentSession}</option>
            <option value={promoteSession}>{promoteSession}</option>
          </select>
          {errors.currentSession && <p className="text-red-500 text-sm mt-1">{errors.currentSession.message}</p>}
        </div>
        <div>
          <label className="block text-base mb-1 font-medium text-gray-700">Promote Session *</label>
          <select
            {...register('promoteSession', { required: 'Promote Session is required' })}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
          >
            <option value={currentSession}>{currentSession}</option>
            <option value={promoteSession}>{promoteSession}</option>
          </select>
          {errors.promoteSession && <p className="text-red-500 text-sm mt-1">{errors.promoteSession.message}</p>}
        </div>
        <div>
          <label className="block text-base mb-1 font-medium text-gray-700">Promotion From Class *</label>
          <select
            {...register('promotionFromClass', { required: 'Promotion From Class is required' })}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
          >
            <option value="">Please Select *</option>
          </select>
          {errors.promotionFromClass && <p className="text-red-500 text-sm mt-1">{errors.promotionFromClass.message}</p>}
        </div>
        <div>
          <label className="block text-base mb-1 font-medium text-gray-700">Promotion To Class *</label>
          <select
            {...register('promotionToClass', { required: 'Promotion To Class is required' })}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
          >
            <option value="">Please Select *</option>
          </select>
          {errors.promotionToClass && <p className="text-red-500 text-sm mt-1">{errors.promotionToClass.message}</p>}
        </div>
      </div>
      <div className="flex justify-start gap-4">
        <Button
          type="submit"
         label={"Save"}
        />
        <Button
          type="button"
          onClick={() => reset()}
          label={"Reset"}
          className='bg-[#ffae01] hover:bg-[#42954]'
        />
      </div>
    </form>
  );
}

export default StudentPromotion;
