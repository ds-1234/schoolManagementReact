import React from 'react';
import { useForm } from 'react-hook-form';
import image from './assets/images/register.png';
import { Link} from 'react-router-dom';
import useRegister from './hooks/useRegister.jsx'
import Layout from './Reusable_components/Layout.jsx';
import Button from './Reusable_components/Button.jsx';
import DatePicker from './Reusable_components/DatePicker.jsx';


function Registration() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, loading, error } = useRegister(); // Destructure values from the custom hook
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result =  registerUser({
      ...data , 
      role: 1 ,
      isActive: "false" 
    });
  };

  return (
    <Layout>
      <div className='px-10 py-4 flex flex-col justify-center items-center'>
      <h1 className='font-semibold mb-2 text-2xl sm:text-3xl text-black'>Time to sign up</h1>
      <p className='text-xl mb-2 text-center text-black'>Send over your deets in the form below 🤘</p>
      <div className="bg-white rounded-lg shadow-lg w-full flex flex-col sm:w-4/5">

        {/* Image Section */}
        <div className="p-5 flex justify-center items-center">
          <img src={image} alt="register" className='w-full h-auto max-w-xs'/>
        </div>

        {/* Form Section */}
        <div className="w-full p-4 ">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-wrap  justify-center md:flex-row">
            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="firstName">First Name <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="firstName"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('firstName', { required: 'First Name is required' })}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span> }
            </div>

            <div className="flex flex-col pt-2  px-1 md:w-1/2">
              <label htmlFor="lastName">Last Name <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="lastName"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('lastName', { required: 'Last Name is required' })}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span> }
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="email">Email <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="email"
                id="email"
                placeholder=""
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
              <label htmlFor="password">Password <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="password"
                id="password"
                placeholder=""
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
              <label htmlFor="phone">Mobile Number <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="phone"
                id="phone"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
                <label htmlFor="gender">Gender * </label>
                <select
                  id="gender"
                  className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value="" className='hidden'>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
              </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="fatherName">Father's Name <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="fatherName"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('fatherName', { required: 'Father\'s Name is required' })}
              />
              {errors.fatherName && <span className="text-red-500 text-sm">{errors.fatherName.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="motherName">Mother's Name <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="motherName"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('motherName', { required: 'Mother\'s Name is required' })}
              />
              {errors.motherName && <span className="text-red-500 text-sm">{errors.motherName.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">

            <DatePicker 
              name={'dateOfBirth'}
              label={'Date of Birth'}
              register={register}
              required={true}
              className={`py-3 w-full px-3 rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}/>
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="houseNumber">House Number <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="houseNumber"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.houseNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('houseNumber', { required: 'House Number is required' })}
              />
              {errors.houseNumber && <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="street">Street <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="street"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('street', { required: 'Street is required' })}
              />
              {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="city">City <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="city"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="state">State <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="state"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('state', { required: 'State is required' })}
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="pinCode">Pincode <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="pinCode"
                placeholder=''
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
              <label htmlFor="country">Country <span className='text-red-700 font-bold'>*</span></label>
              <input
                type="text"
                id="country"
                placeholder=""
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('country', { required: 'Country is required' })}
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>

           

            {/* <div className="flex flex-col pt-2 px-1 md:w-1/2">
              <label htmlFor="role" >Role *</label>
              <select
                id="role"
                className={`py-3 px-3 rounded-lg bg-gray-100 border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
            </div> */}

            {/* <div className="flex items-center mt-4 ">
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
            </div> */}

            <Button
              type="submit"
              className="w-full mt-6"
              label={"Create Account"}
            />

            <div className="flex justify-center text-sm mt-3 text-black">
              <p>Already have an account? <Link to={'/login'} className='text-blue-700 hover:underline'>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default Registration;
