import React from 'react'
import { useForm } from "react-hook-form";
import Button from '../../../Reusable_components/Button'

function AddTransport() {

  const { register, handleSubmit, reset } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };
  return (

   <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl my-20 ml-24">
      <h2 className="text-2xl font-semibold mb-6 text-black">Add New Transport</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="routeName">
              Route Name *
            </label>
            <input
              type="text"
              id="routeName"
              {...register("routeName" , {required : true})}
              className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="vehicleNumber">
              Vehicle Number *
            </label>
            <input
              type="text"
              id="vehicleNumber"
              {...register("vehicleNumber" , {required : true})}
              className="block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="driverName">
              Driver Name *
            </label>
            <input
              type="text"
              id="driverName"
              {...register("driverName" , {required : true})}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="licenseNumber">
              License Number *
            </label>
            <input
              type="text"
              id="licenseNumber"
              {...register("licenseNumber" , {required : true})}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="phoneNumber">
              Phone Number *
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone" , {required : true})}
              className="block w-full  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-1 px-1"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            className="px-8"
            label = "Save"
          />
          <Button
            type="button"
            onClick={() => reset()}
            className="px-8 bg-[#ffae01] hover:bg-[#042954]"
            label="Reset"
          />
        </div>
      </form>
    </div>

  )
}

export default AddTransport