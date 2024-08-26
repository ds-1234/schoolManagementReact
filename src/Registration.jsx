import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import image from './assets/images/register.png';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
  
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [firstName , setFirstName] = useState('')
  const [lastName  , setLastName] = useState('')
  const [email , setEmail] = useState('')
  const[tel , setTel] = useState(null) 
  const [password , setPassword] = useState('')
  const [role , setRole] = useState('')
  const navigate = useNavigate() 

  // Handle form submission
  const onSubmit = (data) => {
    console.log("User Name : " , data.firstName);
    setFirstName('');
    setLastName('');
    setEmail('');
    setTel('');
    setPassword('');
    setRole('');  
    
    // navigate to DashBoard
    navigate('/dashboard' , {state: data}) ;
  };

  return (
    <div className='flex flex-col justify-center items-center px-10 bg-[rgba(136,169,240,1)] py-5 md:h-screen'>
      <h1 className='font-semibold mb-4 text-2xl sm:text-3xl'>Time to sign up</h1>
      <p className='text-xl mb-4 text-center'>Send over your deets in the form below 🤘</p>
      <div className="bg-white rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/5 flex flex-col md:flex-row sm:w-4/5">

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-5 flex justify-center items-center">
          <img src={image} alt="register" className='w-full h-auto max-w-xs md:max-w-full'/>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
            <div className="flex flex-col pt-2">
              <label htmlFor="first-name" className="hidden">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                placeholder="First Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('firstName', { required: 'First Name is required' })}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="last-name" className="hidden">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                placeholder="Last Name"
                className={`py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none`}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="email" className="hidden">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Email is not valid',
                  },
                })}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="tel" className="hidden">Mobile Number</label>
              <input
                type="tel"
                id="tel"
                placeholder="Phone Number"
                value={tel}
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.tel ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('tel', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
                onChange={(e) => setTel(e.target.value)}
              />
              {errors.tel && <span className="text-red-500 text-sm">{errors.tel.message}</span>}
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="password" className="hidden">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                autoComplete='new-password'
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="role" className="font-semibold mb-2 hidden">Select Role</label>
              <select
                id="role"
                value={role}
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('role', { required: 'Role is required' })}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" className='hidden'>-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
              {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
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
        </div>
      </div>
    </div>
  );
}

export default Registration;
