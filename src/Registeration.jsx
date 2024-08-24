import React from 'react'
import image from './assets/images/register.png'
import {Link} from 'react-router-dom'

function Registeration() {
  return (
    <div className='flex flex-col justify-center items-center px-10 bg-[rgba(136,169,240,1)] h-screen'>
         <h1 className=' font-semibold  mb-4 text-2xl sm:text-3xl'>Time to sign up</h1>
         <p className='text-xl mb-4 text-center'>Send over your deets in the form below 🤘</p>
      <div className="bg-white rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/5 flex flex-col md:flex-row sm:w-4/5">

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-5 flex justify-center items-center">
          <img src={image} alt="register" className='w-full h-auto max-w-xs md:max-w-full'/>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-5">
          <form className="flex flex-col justify-center">
            <div className="flex flex-col pt-2">
              <label htmlFor="first-name" className="hidden">
                First Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="First Name"
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="last-name" className="hidden">
                Last Name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Last Name"
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="tel" className="hidden">
                Mobile Number
              </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Phone Number"
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete='new-password'
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-2">
              <label htmlFor="role" className="font-semibold mb-2 hidden">
                Select Role
              </label>
              <select
                name="role"
                id="role"
                className="py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-blue-500 focus:outline-none"
              >
                <option value="" className='hidden'>-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
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

            <p className='text-center text-blue-400 text-md mt-4'>-OR-</p>

            <button className='mt-3 py-3 px-3 rounded-lg bg-gray-100 border border-gray-300 hover:bg-blue-600 hover:text-white flex justify-center items-center gap-2'>
              <img src="https://image.similarpng.com/very-thumbnail/2020/12/Illustration-of-Google-icon-on-transparent-background-PNG.png" alt="Google" className='h-5' />
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registeration