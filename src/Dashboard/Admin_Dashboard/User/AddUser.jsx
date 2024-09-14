import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import {Link} from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddUser = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    axios({
        method:"post",
        url : `http://localhost:8080/user/createUser`,
        data: {
            firstName : "" ,
            lastName : "" , 
            fatherName: "",
            motherName: "",
            gender: "",
            dateOfBirth:"",
            role: "",
            email: "",
            phone: "",
            password: "",
            houseNumber: "",
            street: "",
            city: "",
            state: "",
            pinCode: "",
            country: "",
            isActive: ""
        },
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        console.log('response' , response.data)
        toast.success("Successfully Add User");
        reset()
        onClose(); 
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new User");
        onClose();
    })
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-[#042954] mb-2">Add New User</h2>
      <form  
        className="flex flex-wrap mt-1"
      >

        {/* Input Fields */}
        <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col  px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            {/* <div className="flex flex-col px-1 w-1/2">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('dateOfBirth', { required: 'Date of Birth is required' })}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
            </div> */}


          <div      className="flex flex-col px-1 w-1/2" >
             <label htmlFor="dateOfBirth">Date of Birth *</label>
  
                   <LocalizationProvider dateAdapter={AdapterDayjs} >
                   <DatePicker
                    label = 'Select Date'
                    {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                    sx={{ width: '100%', '.MuiInputBase-input': { padding: '8px' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiOutlinedInput-root': { border: 'none' },'.MuiFormLabel-root': { fontSize: '0.875rem',transform: 'translateY(8px)',marginBottom: '5px',marginLeft:'5px' } }}
                  />
             </LocalizationProvider>
             {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}

                   </div>

            <div className="flex flex-col  px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
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

            <div className="flex flex-col  px-1 w-1/2">
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

            <div className="flex flex-col px-1 w-1/2">
              <label htmlFor="role" >Role *</label>
              <select
                id="role"
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('role', { required: 'Role is required' })}
              >
                <option value="" className='hidden'>Role</option>
                <option value="Admin">Admin</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Guest">Guest</option>
              </select>
              {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
            </div>

            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                id="isActive"
                className={`mr-2 leading-tight ${errors.isActive ? 'border-red-500' : ''}`}
                {...register('isActive', { required: 'You must agree to the terms and policy' })}
              />
              <label htmlFor="isActive" className="text-sm text-black">
                I agree to the <Link to="#" className="text-blue-700 hover:underline">terms and policy</Link>
              </label>
              {errors.isActive && <span className="text-red-500 text-sm">{errors.isActive.message}</span>}
            </div>
            
        {/* Submit Button */}
        <Button 
        onClick={handleSubmit(onSubmit)}
        className='w-full text-center'
        // label={"Add new User"}
        />
      </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddUser;