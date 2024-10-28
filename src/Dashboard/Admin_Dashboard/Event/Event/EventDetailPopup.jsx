// EventDetailPopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusButton from '../../../../Reusable_components/StatusButton';

function EventDetailPopup({ event, onClose ,catColor }) {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eventCategoryTitle, setEventCategoryTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('http://localhost:8080/user/getUserList');
        const usersData = userResponse.data.data;

        // Filter users based on event.UserName IDs
        const filteredUsers = event.user ? 
          usersData.filter(user => event.user.includes(user.id)).map(user => user.firstName) : [];

        setUsers(filteredUsers);

        // Fetch class data
        const classResponse = await axios.get('http://localhost:8080/class/getClassList');
        const classesData = classResponse.data.data;

        // Filter classes based on event.className IDs
        const filteredClasses = event.className ? 
          classesData.filter(cls => event.className.includes(cls.id)).map(cls => cls.name) : [];

        setClasses(filteredClasses);

        // Fetch event category data
        const eventCategoryResponse = await axios.get('http://localhost:8080/eventCategory/getEventCatList');
        const eventCategoriesData = eventCategoryResponse.data.data;

        // Filter event category based on event.eventCategory ID
        const filteredEventCategory = eventCategoriesData.find(category => category.id === event.eventCategory);
        setEventCategoryTitle(filteredEventCategory ? filteredEventCategory.eventCategoryTitle : '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [event]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  console.log(catColor,'catecolornv')

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 transform transition-all duration-300">
      <h2 className="text-3xl font-semibold" style={{ color: catColor }}>{event.eventTitle}</h2>
      <div className="mt-4">
        <p className="text-gray-800 font-semibold text-xl">Date: </p>
        <p className="text-gray-600">{event.startDate} - {event.endDate}</p>

        </div>

        <div className="mt-4">
        <p className="text-gray-800 font-semibold text-xl">Time:</p>
        <p className="text-gray-600"> {event.startTime} - {event.endTime}</p>

        </div>

        <div className="mt-4">
        <p className="text-gray-800 font-semibold text-xl">Message:</p>
        <p className="text-gray-600"> {event.message}</p>

        </div>

        <div className="mt-4">
          <p className="text-gray-800 font-semibold text-xl">User Names:</p>
          <p className="text-gray-600">{users.length > 0 ? users.join(', ') : 'No data for you'}</p>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-800 font-semibold text-xl">Class Names:</p>
          <p className="text-gray-600">{classes.length > 0 ? classes.join(', ') : 'No data for you'}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-800 font-semibold text-xl">Event Category:</p>
          <p className="text-gray-600">{eventCategoryTitle || 'No data for you'}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-800 font-semibold text-xl">Status</p>
          <StatusButton isActive={event.isActive} />  
        </div>

        <button 
          onClick={onClose} 
          className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventDetailPopup;
