import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditUser() {
  
  const location = useLocation();
  const { userId } = location.state || {};

  const [user, setUser] = useState({ 
    firstName : "" ,
    lastName : "" , 
    gender: "",
    dateOfBirth: "",
    role: "",
    email: "",
    phone: "",
    userName: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: ""
   });
   const [value, setValue] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/user/getUser/${userId}`, // API to get specific user by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data)
        setUser(response.data.data);
        setValue(response.data.data.isActive)
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/user/updateUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {...user , isActive: value ? 'true' : 'false' },
    })
      .then((response) => {
        console.log("User updated:", response.data);
        toast.success("User updated successfully!")
        // onSuccess() ;
        // onClose() ;
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error('Failed to update user.')
      });
  };

  // if (!isOpen) return null;

  return (
    <div className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10 ">

        <h2 className="text-2xl font-bold text-[#042954]  ">Edit User</h2>
        <p className=' '>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Edit User</span> </p>
      
      <div className="bg-white rounded-lg w-full">
      <form 
      onSubmit={handleSubmit}
      className='flex flex-wrap py-1'>
        <div className="flex flex-col px-1 w-1/2 mb-1 ">
          <label className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter first name "
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1" >
          <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1 ">Gender</label>
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter gender"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">House Number</label>
          <input
            type="text"
            name="houseNumber"
            value={user.houseNumber}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter house number"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Street</label>
          <input
            type="text"
            name="street"
            value={user.street}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter street"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter city"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={user.pinCode}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter pincode"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">State</label>
          <input
            type="text"
            name="state"
            value={user.state}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter state"
            required
          />
        </div>
        <div className="flex flex-col px-1 w-1/2 mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter country name"
            required
          />
        </div>

        <div className="mb-2">
          <label className="mb-2" htmlFor="active">
            Status 
          </label>
          <ToggleButton
            isOn={value}
            handleToggle={() => setValue(!value)}
            id="active"
            register={user}
          />
        </div>

      </form>

        <Button 
          // label={"Update User"}
          type='submit'
          className='text-center mt-5 '
          />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default EditUser;