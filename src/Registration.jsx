import React from 'react';
import { useForm } from 'react-hook-form';
import image from './assets/images/register.png';
import { Link, useNavigate } from 'react-router-dom';
import useRegister from './hooks/useRegister.jsx'
import {ToastContainer} from 'react-toastify'



function Registration() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, loading, error } = useRegister(); // Destructure values from the custom hook
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await registerUser(data);

    // if (result) {
    //   console.log("User registered successfully:", result);
    //   navigate('/dashboard', { state: data });
    // }
  };

  return (
    <div className='flex flex-col justify-center items-center px-10 bg-[rgba(136,169,240,1)] py-4'>
      <h1 className='font-semibold mb-2 text-2xl sm:text-3xl'>Time to sign up</h1>
      <p className='text-xl mb-2 text-center'>Send over your deets in the form below 🤘</p>
      <div className="bg-white rounded-lg shadow-lg w-full flex flex-col sm:w-4/5">

        {/* Image Section */}
        <div className="p-5 flex justify-center items-center">
          <img src={image} alt="register" className='w-full h-auto max-w-xs'/>
        </div>

        {/* Form Section */}
        <div className="w-full p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-wrap  justify-center md:flex-row">
            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="firstName" className="hidden">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('firstName', { required: 'First Name is required' })}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span> }
            </div>

            <div className="flex flex-col pt-2  px-1 md:w-1/2">
              <label htmlFor="lastName" className="hidden">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none`}
                {...register('lastName', { required: 'Last Name is required' })}
              />
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="email" className="hidden">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Email is not valid',
                  },
                })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="phone" className="hidden">Mobile Number</label>
              <input
                type="phone"
                id="phone"
                placeholder="Phone Number"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.tel ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
              />
              {errors.tel && <span className="text-red-500 text-sm">{errors.tel.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="fatherName" className="hidden">Father's Name</label>
              <input
                type="text"
                id="fatherName"
                placeholder="Father's Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('fatherName', { required: 'Father\'s Name is required' })}
              />
              {errors.fatherName && <span className="text-red-500 text-sm">{errors.fatherName.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="motherName" className="hidden">Mother's Name</label>
              <input
                type="text"
                id="motherName"
                placeholder="Mother's Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('motherName', { required: 'Mother\'s Name is required' })}
              />
              {errors.motherName && <span className="text-red-500 text-sm">{errors.motherName.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="gender" className="hidden">Gender</label>
              <select
                id="gender"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="" className='hidden'>-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="dateOfBirth" className="hidden">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('dateOfBirth', { required: 'Date of Birth is required' })}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="houseNumber" className="hidden">House Number</label>
              <input
                type="text"
                id="houseNumber"
                placeholder="House Number"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.houseNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('houseNumber', { required: 'House Number is required' })}
              />
              {errors.houseNumber && <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="street" className="hidden">Street</label>
              <input
                type="text"
                id="street"
                placeholder="Street"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('street', { required: 'Street is required' })}
              />
              {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="city" className="hidden">City</label>
              <input
                type="text"
                id="city"
                placeholder="City"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="state" className="hidden">State</label>
              <input
                type="text"
                id="state"
                placeholder="State"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="pinCode" className="hidden">Pincode</label>
              <input
                type="text"
                id="pinCode"
                placeholder="Pincode"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('pinCode', { 
                  required: 'Pincode is required'  , 
                  pattern: {
                    value: /^[0-9]/,
                    message: 'Pincode must be digits',
                  },
                })}
              />
              {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="country" className="hidden">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Country"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="password" className="hidden">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete='new-password'
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="role" className="font-semibold mb-2 hidden">Select Role</label>
              <select
                id="role"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('role', { required: 'Role is required' })}
              >
                <option value="" className='hidden'>-- Select Role --</option>
                <option value="Admin">Admin</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Guest">Guest</option>
              </select>
              {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
            </div>

            <div className="flex items-center mt-4 ">
              <input
                type="checkbox"
                id="isActive"
                className={`mr-2 leading-tight ${errors.isActive ? 'border-red-500' : ''}`}
                {...register('isActive', { required: 'You must agree to the terms and policy' })}
              />
              <label htmlFor="isActive" className="text-sm">
                I agree to the <Link to="#" className="text-blue-500">terms and policy</Link>
              </label>
              {errors.isActive && <span className="text-red-500 text-sm">{errors.isActive.message}</span>}
            </div>
            

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-4 transition ease-in-out duration-300"
            >
              Create Account
            </button>

            <div className="flex justify-center text-sm mt-3">
              <p>Already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}

export default Registration;
