// EventDetailPopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusButton from '../../../../Reusable_components/StatusButton';

function EventDetailPopup({ event, onClose, catColor }) {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eventCategoryTitle, setEventCategoryTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/user/getUserList');
        const usersData = userResponse.data.data;

        const filteredUsers = event.user ? 
          usersData.filter(user => event.user.includes(user.id)).map(user => user.firstName) : [];

        setUsers(filteredUsers);

        const classResponse = await axios.get('http://localhost:8080/class/getClassList');
        const classesData = classResponse.data.data;

        const filteredClasses = event.className ? 
          classesData.filter(cls => event.className.includes(cls.id)).map(cls => cls.name) : [];

        setClasses(filteredClasses);

        const eventCategoryResponse = await axios.get('http://localhost:8080/eventCategory/getEventCatList');
        const eventCategoriesData = eventCategoryResponse.data.data;

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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 transform transition-all duration-300 border-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times; {/* This represents the "X" */}
        </button>

        <h2 className="text-4xl font-bold mb-4" style={{ color: catColor }}>{event.eventTitle}</h2>

        <div className="overflow-y-auto max-h-80"> {/* Make this div scrollable */}
          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Date:</p>
              <p className="text-gray-700">{event.startDate} - {event.endDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Time:</p>
              <p className="text-gray-700">{event.startTime} - {event.endTime}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Message:</p>
              <p className="text-gray-700">{event.message}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">User Names:</p>
              <p className="text-gray-700">{users.length > 0 ? users.join(', ') : 'No data for you'}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Class Names:</p>
              <p className="text-gray-700">{classes.length > 0 ? classes.join(', ') : 'No data for you'}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Event Category:</p>
              <p className="text-gray-700">{eventCategoryTitle || 'No data for you'}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm" style={{ borderLeft: `5px solid ${catColor}` }}>
              <p className="text-gray-800 font-semibold">Status:</p>
              <StatusButton isActive={event.isActive} />
            </div>
          </div>
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
