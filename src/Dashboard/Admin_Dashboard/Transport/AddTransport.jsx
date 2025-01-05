import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Button from '../../../Reusable_components/Button'
import axios from 'axios';
import {toast } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import { Circles } from 'react-loader-spinner';
import Loader from '../../../Reusable_components/Loader';


function AddTransport() {

  const { register, handleSubmit,formState: { errors }, reset } = useForm();
  const navigate = useNavigate()
  const [value, setValue] = useState(true);
      const [loading, setLoading] = useState(false);
  

  // Function to handle form submission
  const onSubmit = (data) => {
    setLoading(true); // Start loader
    axios({
        method:"POST",
        url : `${BASE_URL}/transport/createTransport`,
        data: {
            routeName : data.routeName ,
            vehicleNumber : data.vehicleNumber ,
            driverName : data.driverName , 
            licenseNumber : data.licenseNumber ,
            phone : data.phone , 
            isActive : value.toString()
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add Transport!");
        // reset()
        navigate('/admin/transport')
        setValue(true)
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new transport!");
        setValue(true)
    }).finally(()=> {
      setLoading(false); // Stop loader
    });
  }
  
  

  return (
    <div>
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Add Transport </h1>
       <p className=' mt-2'><NavLink to = '/admin'> Dashboard </NavLink>/ <NavLink to = '/admin/transport'> Transport </NavLink> /<span className='text-[#ffae01] font-semibold'>Add Transport</span> </p>

   <div className=" bg-white shadow-md rounded-xl my-20 p-10">
      <h2 className="text-2xl font-semibold mb-6 text-black">Add New Transport</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="routeName">
              Route Name *
            </label>
            <input
              type="text"
              id="routeName"
              {...register("routeName" , {required : "Route Name is required"})}
              className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
                {errors.routeName && (
                  <p className="text-red-500 text-sm">{errors.routeName.message}</p>
                )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="vehicleNumber">
              Vehicle Number *
            </label>
            <input
              type="text"
              id="vehicleNumber"
              {...register("vehicleNumber" , {required : "Vehicle Number is required"})}
              className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
                {errors.vehicleNumber && (
                  <p className="text-red-500 text-sm">{errors.vehicleNumber.message}</p>
                )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="driverName">
              Driver Name *
            </label>
            <input
              type="text"
              id="driverName"
              {...register("driverName" , {required : "Driver Name is required"})}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
                {errors.driverName && (
                  <p className="text-red-500 text-sm">{errors.driverName.message}</p>
                )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="licenseNumber">
              License Number *
            </label>
            <input
              type="text"
              id="licenseNumber"
              {...register("licenseNumber" , {required : "License Number is required"})}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
            {errors.licenseNumber && (
                  <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>
                )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="phoneNumber">
              Phone Number *
            </label>
            <input
              type="text"
              id="phone"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status *
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="px-8"
          />
          <Button
            type="button"
            onClick={() => reset()}
            className="px-8 bg-[#ffae01] hover:bg-[#042954]"
            label="Reset"
          />
          {/* <ToastContainer/> */}
        </div>
      </form>
    </div>
</div>
  )
}

export default AddTransport