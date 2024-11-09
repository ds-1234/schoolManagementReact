import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TodayDate from '../../../Reusable_components/TodayDate';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';

function AddNotice() {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState(true);
  const [showRoleAndTeachers, setShowRoleAndTeachers] = useState(false); // To control the visibility of roles
  const [role, setRole] = useState([]); // List of roles fetched from the API
  const [rolepay, setRolepay] = useState(0); // Selected role ID
  const [selectedRoles, setSelectedRoles] = useState([]); // Track the selected roles

  useEffect(() => {
    // Fetch roles when the component loads
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/role/getRoleList`, {
          headers: { 'Content-Type': 'application/json' },
        });
        setRole(response.data.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Handle role selection logic
  const handleRoleChange = (roleId) => {
    if (roleId === 'All') {
      setRolepay(0); // ID for "All"
      setSelectedRoles([]); // Clear any selected staff roles
      setShowRoleAndTeachers(false); // Hide the roles section
    } else if (roleId === 'Student') {
      setRolepay(3); // ID for "Student"
      setSelectedRoles([]); // Clear any selected staff roles
      setShowRoleAndTeachers(false); // Hide the roles section
    } else {
      setRolepay(roleId); // Set the selected role ID
      setSelectedRoles([roleId]); // Track the selected staff role
      setShowRoleAndTeachers(true); // Show the roles section if "Staff" is selected
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Submitted Data:', data);

    const formattedDate = data.date;
    const selectedRoleId = rolepay; // Use the selected role ID

    axios({
      method: 'post',
      url: `${BASE_URL}/notice/createNotice`,
      data: {
        noticeTitle: data.title,
        noticeDetails: data.details,
        userId: user.id,
        noticeDate: formattedDate,
        role: selectedRoleId, // Send the selected role ID as an integer
        isActive: value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('Notice added successfully!');
        navigate('/admin/notice');
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add notice.');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto ml-19.5 bg-white rounded-xl shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-semibold text-black"> Add Notice</h2>
      
      <p className=' '>Dashboard /<NavLink to='/admin'> Admin </NavLink>/<NavLink to='/admin/notice'> Notices </NavLink>/ <span className='text-[#ffae01] font-semibold'>Add Notice</span></p>

      {/* Radio buttons for "Notice For" */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Notice For *</label>
        <div className="mt-2 space-y-2">
          <div className='inline ml-4'>
            <input {...register('noticeFor', { required: true })} type="radio" value="All" id="all" className="mr-2" onChange={() => { setRolepay(0); setSelectedRoles([]); setShowRoleAndTeachers(false); }} defaultChecked />
            <label htmlFor="all" className="text-sm font-medium text-gray-700">All</label>
          </div>
          <div className='inline ml-4'>
            <input {...register('noticeFor', { required: true })} type="radio" value="Student" id="student" className="mr-2" onChange={() => { setRolepay(3); setSelectedRoles([]); setShowRoleAndTeachers(false); }} />
            <label htmlFor="student" className="text-sm font-medium text-gray-700">Student</label>
          </div>
          <div className='inline ml-4'>
            <input {...register('noticeFor', { required: true })} type="radio" value="Staff" id="staff" className="mr-2" onChange={() => { setShowRoleAndTeachers(true); }} />
            <label htmlFor="staff" className="text-sm font-medium text-gray-700">Staff</label>
          </div>

          {/* Only show role selection when "Staff" is selected */}
          {showRoleAndTeachers && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Role</label>
              <div className="grid grid-cols-2 gap-4">
                {role.map((roleItem) => (
                  <div key={roleItem.id} className="flex items-center">
                    <input
                      type="radio"
                      value={roleItem.id}
                      checked={rolepay === roleItem.id}
                      onChange={() => handleRoleChange(roleItem.id)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">{roleItem.name}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title and Details */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input {...register('title', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Details *</label>
          <input {...register('details', { required: true })} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1" />
        </div>

        {/* Date Input */}
        <TodayDate 
          label="Date" 
          labelClass="block text-sm font-medium text-gray-700"
          name="date"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-1 px-1"
          register={register}
          required={true}
        />
        
        {/* Toggle button for status */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">Status *</label>
          <ToggleButton isOn={value} handleToggle={() => setValue(!value)} id="active" register={register} />
        </div>
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-start space-x-4 mt-10">
        <Button type="submit" label="Submit" className="px-8" />
        <Button onClick={() => reset()} label="Reset" className="px-8 bg-[#ffae01] hover:bg-[#042954]" />
      </div>
    </form>
  );
}

export default AddNotice;
