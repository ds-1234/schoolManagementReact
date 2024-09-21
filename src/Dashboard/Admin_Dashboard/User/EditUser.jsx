import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { NavLink, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function EditUser() {
  const location = useLocation();
  const { userId } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();


  const [toggleValue, setToggleValue] = useState(true);
  const [roles , setRoles] = useState([]) ;
  const [classes , setClasses] = useState([]) ;
  const [books , setBooks] = useState([]) ;
  const [schools , setSchools] = useState([]) ;
  const [userClass, setUserClass] = useState('');
  const [userBook, setUserBook] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const fetchRoles = async() =>{
      axios({
        method:"GET" , 
        url:'http://localhost:8080/role/getRoleList' , 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRoles(res.data.data) ;
      })
      .catch(err => {
        console.log(err , 'error:');
      })
    }

    const fetchClasses = async() =>{
      axios({
        method:"GET" , 
        url:'http://localhost:8080/class/getClassList' , 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setClasses(res.data.data) ;
      })
      .catch(err => {
        console.log(err , 'error:');
      })
    }

    const fetchBooks = async() =>{
      axios({
        method:"GET" , 
        url:'http://localhost:8080/book/getBookList' , 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data.data) ;
      })
      .catch(err => {
        console.log(err , 'error:');
      })
    }

    const fetchSchools = async() =>{
      axios({
        method:"GET" , 
        url:'http://localhost:8080/school/getSchoolList' , 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSchools(res.data.data) ;
      })
      .catch(err => {
        console.log(err , 'error:');
      })
    }

    fetchRoles() ;
    fetchClasses() ;
    fetchBooks() ;
    fetchSchools() ;
} , []);


  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/user/getUser/${userId}`, // API to get specific user by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const userData = response.data.data;
        reset(userData);
        setToggleValue(userData.isActive);
        setUserRole(userData.role) ;
        setUserClass(userData.class); 
        setUserBook(userData.book); 
        setUserSchool(userData.school); 

        // Set default values in the form
        setValue('role' , userData.role);
        setValue('className', userData.class);
        setValue('book', userData.book);
        setValue('school', userData.school);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId, reset , setValue]);

  const onSubmit = (data) => {
    const selectedClasses = classes.find(cls => cls.id === parseInt(data.className));
    const selectedBooks = books.find(book => book.id === parseInt(data.book));
    const selectedSchools = schools.find(school => school.id === parseInt(data.school));
    axios({
      method: "post",
      url: `http://localhost:8080/user/updateUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        className : selectedClasses , 
        book: [selectedBooks] , 
        school : selectedSchools ,
         isActive: toggleValue ? 'true' : 'false' },
    })
    .then((response) => {
        toast.success("User updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user:", error);
        toast.error('Failed to update user.');
      });
  };

  return (
    <div className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-bold text-[#042954]">Edit User</h2>
      <p>Dashboard / <NavLink to='/admin'>Admin</NavLink> / <span className='text-[#ffae01] font-semibold'>Edit User</span></p>
      
      <div className="bg-white rounded-lg w-full">
        <h2 className="text-xl font-semibold text-black  mt-10">Basic Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-4 mt-5 gap-6'>
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


          {/* House Number */}
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

          {/* Street */}
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

          {/* City */}
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

          <div className="mb-2">
            <label className="mb-2" htmlFor="active">Status</label>
            <ToggleButton
              isOn={toggleValue}
              handleToggle={() => setToggleValue(!toggleValue)}
              id="active"
            />
          </div>
        </form>

        <h2 className="text-xl font-semibold text-black mt-10 ">Class Details</h2>
        {/* Role Input */}
        <div className="mt-4">
            <select
              id="role"
              className={`w-1/2 px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('role', { required: 'Role Field is required' })}
            >
                <option value="" hidden>Select a Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id} selected={role.id === userRole.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

        {/* Class Input */}
        <div className="mt-4">
            <select
              id="className"
              className={`w-1/2 px-3 py-2 border ${errors.classname ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('className', { required: 'Class Field is required' })}
            >
                <option value="" hidden>Select a Class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id} selected={cls.id === userClass}>
                  {cls.name}
                </option>
              ))}
            </select>
            {errors.cls && <p className="text-red-500 text-sm mt-1">{errors.cls.message}</p>}
          </div>


        {/* Book Input */}
        <div className="mt-4">
            <select
              id="book"
              className={`w-1/2 px-3 py-2 border ${errors.book ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('book', { required: 'Book details is required' })}
            >
                <option value="" hidden>Select a Book</option>
              {books.map(book => (
                <option key={book.id} value={book.id} selected={book.id === userBook}>
                  {book.name}
                </option>
              ))}
            </select>
            {errors.book && <p className="text-red-500 text-sm mt-1">{errors.book.message}</p>}
          </div>

        {/* School Input */}
        <div className="mt-4">
            <select
              id="school"
              className={`w-1/2 px-3 py-2 border ${errors.school ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('school', { required: 'School details is required' })}
            >
                <option value="" hidden>Select a School</option>
              {schools.map(school => (
                <option key={school.id} value={school.id} selected={school.id === userSchool}>
                  {school.name}
                </option>
              ))}
            </select>
            {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>}
          </div>

        <Button type='submit' className='p-0 text-center mt-10' />
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditUser;
