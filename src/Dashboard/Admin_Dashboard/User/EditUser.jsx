import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';

function EditUser({ isOpen, onClose, userId , onSuccess }) {
  
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
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId , isOpen]);

  useEffect(() => {
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/user/getUser/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((response) => {
        console.log("User updated:", response.data);
        toast.success("User updated successfully!")

        onSuccess() ;
        onClose() ;
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error('Failed to update user.')
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
      
        <h2 className="text-2xl font-bold text-center mb-4 text-[#042954]">Edit User</h2>
      <form 
      onSubmit={handleSubmit}
      className='flex flex-wrap py-1'>
        <div className="flex flex-col px-1 w-1/2 mb-1 ">
          <label className="block text-gray-700 text-sm font-bold mb-1">FirstName</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-1">LastName</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-1">Pincode</label>
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

          <Button 
          // label={"Update User"}
          type='submit'
          className='w-full text-center'
          />

      </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default EditUser;