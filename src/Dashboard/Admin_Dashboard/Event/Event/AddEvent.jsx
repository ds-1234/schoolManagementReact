import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';
import Loader from '../../../../Reusable_components/Loader';



const AddEvent = ({ isOpen, onClose }) => {
  const [dropdownOpen2, setDropdownOpen2] = useState(false); 
  const [dropdownOpen1, setDropdownOpen1] = useState(false); 
  const [showClassAndSection, setShowClassAndSection] = useState(false);
  const [showRoleAndTeachers, setShowRoleAndTeachers] = useState(false);
  const eventCategoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [role, setRole] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedEventCategory, setSelectedEventCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rolepay, setRolepay] = useState([0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classes, setClasses] = useState([]); // Assuming this is fetched from API
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [active, setActive] = useState(true);
      const [loading, setLoading] = useState(false);
  
  



  const { register, handleSubmit, formState: { errors },setValue , reset } = useForm({
    defaultValues: {
      noticeFor: 'All',
      user: '', // Ensure default value for user
    },
  });


  console.log(selectedClasses, 'selectedClasses')
  const [userForDropdown, setUserForDropdown] = useState([]);

  useEffect(() => {
    // Fetch classes from API
    axios.get(`${BASE_URL}/class/getClassList`)
      .then(response => {
        setClasses(response.data.data); // Assume response data is an array of class objects
      })
      .catch(error => {
        console.error("Error fetching classes:", error);
      });
  }, []);

  const handleClassSelect = (classId, className) => {
    setSelectedClasses(prevSelected => {
      if (prevSelected.includes(classId)) {
        // Remove the class if it's already selected
        return prevSelected.filter(id => id !== classId);
      } else {
        // Add the class if it's not selected
        return [...prevSelected, classId];
      }
    });
  };
  const handleUserSelect = (userId, userName) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        // Remove the class if it's already selected
        return prevSelected.filter(id => id !== userId);
      } else {
        // Add the class if it's not selected
        return [...prevSelected, userId];
      }
    });
  };

  console.log(selectedClasses, 'selectedClasses')

  // Handle closing on clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen2 && eventCategoryDropdownRef.current && !eventCategoryDropdownRef.current.contains(e.target)) {
        setDropdownOpen2(false);
      }
      if (dropdownOpen1 && userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen2]);

  // Handle popup visibility and scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowClassAndSection(false)
      setShowRoleAndTeachers(false)
      setSelectedClasses([]);setSelectedUsers([]);setSelectedRoles([]);setRolepay([0]),setFilteredUsers([])
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        setSelectedEventCategory(null)
        setSelectedUser(null)
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // Optional: You could also set default values or reset the form here if needed
      reset(); // Reset the form when it opens
      setStartTime('')
      setEndTime('')
      setStartDate('')
      setEndDate('')
    }
  }, [isOpen, reset]);



    // Fetch event categories from API
    useEffect(() => {
      const fetchEventCategories = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/eventCategory/getEventCatList`, {
            headers: { 'Content-Type': 'application/json' },
          });
          const cat = response.data.data
          let eventcat = cat.filter((cat) => cat.isActive==true); 
          setEventCategories(eventcat); // Set the event categories from the response
        } catch (error) {
          console.error('Error fetching event categories:', error);
        }
      };
  
      fetchEventCategories();
    }, []);

  useEffect(() => {
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

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUserList`, {
          headers: { 'Content-Type': 'application/json' },
        });
        setUserForDropdown(response.data.data);
        console.log(userForDropdown,'user for drop down')
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchRoles();
    fetchUsers();
  }, []);

    // Handle Role Selection and User Filtering
    const handleRoleChange = (roleId) => {
      setSelectedRoles((prevSelected) => {
        const updatedRoles = prevSelected.includes(roleId) ? prevSelected.filter((id) => id !== roleId) : [...prevSelected, roleId];
  
        // Filter users based on selected role ids
        if (updatedRoles.length > 0) {
          console.log(userForDropdown,'userForDropdown')
          console.log(updatedRoles,'updatedRoles')
          setRolepay(updatedRoles)
          const filtered = userForDropdown.filter((user) => updatedRoles.includes(user.role));
          // const filtered = userForDropdown.filter((user) => updatedRoles.includes(user.roleId));
          console.log(filtered,'filtered')
          setFilteredUsers(filtered);
          console.log(filteredUsers,'filtered users')
        } else {
          setFilteredUsers(userForDropdown);
        }
  
        return updatedRoles;
      });
    };
    const getDropdownLabel = () => {
      if (selectedRoles.length === 1) {
        const selectedRole = role.find((r) => r.id === selectedRoles[0]);
        return `Select ${selectedRole?.name}`;
      }
      return 'Select User';
    };
    
    const onSubmit = async (data) => {
      setLoading(true); // Start loader
      const selectedUserId = data.user; // This will get the selected user ID
    
      // Function to capitalize the first letter of the event title
      const capitalizeFirstLetter = (string) => {
        if (!string) return ''; // Handle empty string
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      // Create the event data object to send to your API
      const eventData = {
        eventTitle: capitalizeFirstLetter(data.eventtitle), // Capitalize first letter
        eventCategory: selectedEventCategory?.id, // assuming selectedEventCategory holds the ID
        role: showClassAndSection ? [3] : rolepay,
        user: selectedUsers.length > 0 ? selectedUsers : undefined, // Add the selected user ID here
        className: selectedClasses.length > 0 ? selectedClasses : undefined, // Send classes only if selected
        message: data.message,
        startDate: startDate, // Include start date
        endDate: endDate, // Include end date
        startTime: startTime, // Include start time
        endTime: endTime, // Include end time
        isActive: active // Add other necessary fields like isActive
      };
    
      // Example API call to save the event data
      try {
        const response = await axios.post(`${BASE_URL}/events/saveEvent`, eventData, {
          headers: { 'Content-Type': 'application/json' },
        });
        
        // Notify the user of success
        toast.success('Event created successfully!');
        reset(); // Reset the form if needed
        onClose(); // Close the modal
        setSelectedClasses([]) 
        setFilteredUsers([])
        setSelectedUsers([])
        setSelectedEventCategory(null) 
      } catch (error) {
        console.error('Error creating event:', error);
        toast.error('Failed to create event. Please try again.');
      }finally {
        setLoading(false); // Stop loader
      };
    };

  // Create a string of selected class names for the placeholder
  const selectedClassNames = selectedClasses.map(classId => {
    const cls = classes.find(cls => cls.id === Number(classId));
    return cls ? `${cls.name} - ${cls.section}` : '';
  });
  
  
  console.log("Mapped Class Names:", selectedClassNames);

// Filter out any undefined names
const filteredClassNames = selectedClassNames.filter(name => name);
console.log("Filtered Class Names:", filteredClassNames);

    // Create a string of selected class names for the placeholder
    const selectedUsersNames = selectedUsers.map(userId =>filteredUsers.find(user => user.id === Number(userId))?.firstName);
    
    console.log("Mapped User Names:", selectedUsersNames);
    console.log("selectedUsers", selectedUsers);

    const handleClose = () => {
      reset(); // Reset the form when closing the modal
      onClose(); // Call the original onClose function
    };
    const handleClear = () => {
      reset(); // Reset the form when closing the modal
      setStartTime('')
      setEndTime('')
      setStartDate('')
      setEndDate('') 
      setSelectedClasses([]) 
      setFilteredUsers([])
      setSelectedUsers([])
      setSelectedEventCategory(null) 
     };
    
    if (!isOpen) return null;
    

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-4 rounded-xl w-full max-w-xl relative shadow-lg animate-fadeIn overflow-y-auto max-h-screen">
        <button onClick={handleClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#042954]">New Event</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-2">
            <label htmlFor="noticeFor" className="block text-gray-700 font-semibold mb-2">Event For</label>
            <div className="mt-2 space-y-2">
              <div className='inline ml-4'>
                <input {...register('noticeFor', { required: true })} type="radio" value="All" id="all" className="mr-2" onChange={() => { setShowClassAndSection(false);setFilteredUsers([]), setSelectedClasses([]);setSelectedUsers([]);setSelectedRoles([]);setRolepay([0]); setShowRoleAndTeachers(false); }} defaultChecked />
                <label htmlFor="all" className="text-sm font-medium text-gray-700">All</label>
              </div>
              <div className='inline ml-4'>
                <input {...register('noticeFor', { required: true })} type="radio" value="Student" id="student" className="mr-2" onChange={() => { setShowClassAndSection(true);setFilteredUsers([]) , setSelectedUsers([]);setSelectedRoles([]);setRolepay([]); setShowRoleAndTeachers(false); }} />
                <label htmlFor="student" className="text-sm font-medium text-gray-700">Student</label>
              </div>
              <div className='inline ml-4'>
                <input {...register('noticeFor', { required: true })} type="radio" value="Staff" id="staff" className="mr-2" onChange={() => { setShowClassAndSection(false); setShowRoleAndTeachers(true); }} />
                <label htmlFor="staff" className="text-sm font-medium text-gray-700">Staff</label>
              </div>
            </div>
          </div>

                    {/* Conditional Dropdowns for Class and Section */}
                    {showClassAndSection && (
            <>
              <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Select Classes:</label>
        <select
          value=""
          onChange={e => handleClassSelect(e.target.value, e.target.options[e.target.selectedIndex].text)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="" disabled>
            {selectedClassNames.join(',') || 'Select Classes'}
          </option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>
      </div>


              {/* </div> */}

            </>
          )}

          {showRoleAndTeachers && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Role</label>
                <div className="grid grid-cols-2 gap-4">
                  {role.map((role) => (
                    <div key={role.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={role.id}
                        onChange={() => handleRoleChange(role.id)}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">{role.name}</label>
                    </div>
                  ))}
                </div>
              </div>


              

              {/* <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Select Users:</label>
        <select
          value=""
          onChange={e => handleUserSelect(e.target.value, e.target.options[e.target.selectedIndex].text)}
          className="w-full p-3 border border-gray-300 rounded"
        >
          <option value="" disabled>
            {selectedUsersNames.join(',') || 'Select Users'}
          </option>
          {filteredUsers.map(users => (
            <option key={users.id} value={users.id}>
              {users.firstName}
            </option>
          ))}
        </select>


              </div> */}





<div className="mt-4 " ref={userDropdownRef}>
              <label className="block text-gray-700 font-semibold mb-2">Select Users</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen1(!dropdownOpen1)}
                  className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-md text-left flex justify-between items-center"
                >
  <span>
    {selectedUsers.length > 0
      ? selectedUsers
          .map((userId) => {
            const user = userForDropdown.find((user) => user.id === userId);
            return user ? user.firstName : '';
          })
          .join(', ')
      : 'Select Users'}
  </span>
                  <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                </button>
                {dropdownOpen1 && (
                  <div  className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <label key={user.id} className="flex items-center p-2">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          className="mr-2"
                        />
                        {user.firstName}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
              


            </>
          )}
          {          console.log(filteredUsers,'filtered users')            }






          {/* Event Title Input */}
          <div className="mb-4">
            <label htmlFor="eventtitle" className="block text-gray-700 font-semibold mb-2">Event Title</label>
            <input
              type="text"
              id="eventtitle"
              className={`w-full px-3 py-2 border ${errors.eventtitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('eventtitle', { required: 'Event Title is required' })}
            />
            {errors.eventtitle && <p className="text-red-500 text-sm mt-1">{errors.eventtitle.message}</p>}
          </div>

          {/* Event Category Input */}
          <div className="mb-2 relative" ref={eventCategoryDropdownRef}>
            <label htmlFor="eventCategory" className="block text-gray-700 font-semibold mb-2">Event Category</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen2(!dropdownOpen2)}
            >
              <p>{selectedEventCategory ? selectedEventCategory.eventCategoryTitle : 'Select Event Category'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen2 && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {eventCategories.map(eventCategory => (
                  <div
                    key={eventCategory.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedEventCategory(eventCategory);
                      setDropdownOpen2(false);
                    }}
                  >
                    {eventCategory.eventCategoryTitle}
                  </div>
                ))}
              </div>
            )}
          </div>
          {console.log(selectedEventCategory,'selected event category')}

          {/* // In your Date and Time Inputs, add onChange handlers to update state */}
<div className="grid grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-semibold mb-1">Start Date</label>
    <input 
      type="date" 
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)} // Update state
    />
  </div>
  <div>
    <label className="block text-sm font-semibold mb-1">End Date</label>
    <input 
      type="date" 
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)} // Update state
    />
  </div>
  <div>
    <label className="block text-sm font-semibold mb-1">Start Time</label>
    <input 
      type="time" 
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)} // Update state
    />
  </div>
  <div>
    <label className="block text-sm font-semibold mb-1">End Time</label>
    <input 
      type="time" 
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)} // Update state
    />
  </div>
</div>
{/* File attachment */}
<div className="mb-4 mt-6 bg-gray-200">
    <h1 className="mb-4 mt-6 ml-4 tect-xl text-gray-700 font-semibold">Attachment</h1>
    <p className="mb-4 ml-4 mt-6 ">Upload Size of 4mb,Accepted Format PDF</p>
    <input type="file" label="Upload" className='ml-4 mb-4' />
</div>

          {/* Message Input */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              type="text"
              id="message"
              className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">Status *</label>
              <ToggleButton
                isOn={active}
                handleToggle={() => setActive(!active)}
                id="active"
              />
            </div>


          <div className="mt-8 flex justify-center gap-2">
        <Button type="submit" />
        <Button label="Clear" className="bg-[#ffae01]" onClick={handleClear} />
      </div>
              </form>
      </div>
    </div>
  );
};


export default AddEvent;



