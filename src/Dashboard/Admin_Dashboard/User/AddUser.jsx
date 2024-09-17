import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { NavLink } from 'react-router-dom';

const AddUser = () => {

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }; 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // useEffect(() => {
  //   // Disable scrolling on background when the popup is open
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   // Add event listener for ESC key press
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Escape') {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.body.style.overflow = 'auto'; // Clean up scrolling style
  //   };
  // }, [isOpen, onClose]);

  const onSubmit = (data) => {
    const userData = {
      ...data , 
      role: {
        id: 1 ,
        name: "Guest" ,
      },
      isActive : "false" 
    }
    axios({
        method:"post",
        url : `http://localhost:8080/user/createUser`,
        data: userData ,
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add User");
        reset()
        // onClose(); 
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new User");
        // onClose();
    })
  }

  // if (!isOpen) return null;

  return (
    <div className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10 ">
       <div className="bg-white rounded-lg w-full">
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button> */}
        <h2 className="text-2xl font-bold text-[#042954]  ">Add New User</h2>
        <p className=' '>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Add User</span> </p>
      <form  
        className="grid grid-cols-4 mt-10 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* Input Fields */}
        <div className="flex flex-col px-1">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('firstName', { required: 'First Name is required' })}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span> }
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('lastName', { required: 'Last Name is required' })}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span> }
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
            <div className="flex flex-col  px-1 ">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                placeholder=""
                autoComplete='new-password'
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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

            <div className="flex flex-col px-1 ">
              <label htmlFor="phone">Mobile Number *</label>
              <input
                type="phone"
                id="phone"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="fatherName">Father's Name *</label>
              <input
                type="text"
                id="fatherName"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('fatherName', { required: 'Father\'s Name is required' })}
              />
              {errors.fatherName && <span className="text-red-500 text-sm">{errors.fatherName.message}</span>}
            </div>

            <div className="flex flex-col px-1">
              <label htmlFor="motherName">Mother's Name *</label>
              <input
                type="text"
                id="motherName"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('motherName', { required: 'Mother\'s Name is required' })}
              />
              {errors.motherName && <span className="text-red-500 text-sm">{errors.motherName.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="gender">Gender * </label>
              <select
                id="gender"
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="" className='hidden'>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
      <label htmlFor="dateOfBirth">Date of Birth *</label>
      <input
        type="text"
        id="dateOfBirth"
        placeholder="Select Date" 
        onFocus={(e) => {
          e.target.type = 'date';
          e.target.placeholder = ''; 
          console.log('focused')
        }}
        onBlur={(e) => {
          const value = e.target.value;
          e.target.type = 'text'; 
          e.target.placeholder = 'Select Date'; 
    
          if (value) {
            e.target.value = formatDateToDDMMYYYY(value);
          }
        }}
        className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
        {...register('dateOfBirth', { required: 'Date of Birth is required' })}
      />
      {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
    </div>

            <div className="flex flex-col  px-1">
              <label htmlFor="houseNumber">House Number *</label>
              <input
                type="text"
                id="houseNumber"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.houseNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('houseNumber', { required: 'House Number is required' })}
              />
              {errors.houseNumber && <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="street">Street *</label>
              <input
                type="text"
                id="street"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('street', { required: 'Street is required' })}
              />
              {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            <div className="flex flex-col px-1">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col px-1 ">
              <label htmlFor="pinCode">Pincode *</label>
              <input
                type="text"
                id="pinCode"
                placeholder=''
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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

            <div className="flex flex-col px-1">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>
      </form>

      {/* Submit Button */}
      <Button 
        type='submit' className=' p-0 text-center mt-10 '/>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddUser;