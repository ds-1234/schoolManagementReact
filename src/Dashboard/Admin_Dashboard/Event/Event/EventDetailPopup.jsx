// EventDetailPopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventDetailPopup({ event, onClose }) {
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

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{event.eventTitle}</h2>
        <p><strong>Date:</strong> {event.startDate} - {event.endDate}</p>
        <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
        <p><strong>Message:</strong> {event.message}</p>
        <p><strong>User Names:</strong> {users.length > 0 ? users.join(', ') : 'No data for you'}</p>
        <p><strong>Class Names:</strong> {classes.length > 0 ? classes.join(', ') : 'No data for you'}</p>
        <p><strong>Event Category:</strong> {eventCategoryTitle || 'No data for you'}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
      </div>
    </div>
  );
}

export default EventDetailPopup;
