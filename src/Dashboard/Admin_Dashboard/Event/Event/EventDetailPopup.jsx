// EventDetailPopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusButton from '../../../../Reusable_components/StatusButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../../conf/conf';

function EventDetailPopup({ event, onClose, catColor }) {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eventCategoryTitle, setEventCategoryTitle] = useState('');
  const [roleNames, setRoleNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/user/getUserList`);
        const usersData = userResponse.data.data;

        const filteredUsers = event.user 
          ? usersData.filter(user => event.user.includes(user.id)).map(user => user.firstName) 
          : [];

        setUsers(filteredUsers);

        const classResponse = await axios.get(`${BASE_URL}/class/getClassList`);
        const classesData = classResponse.data.data;

        const filteredClasses = event.className 
          ? classesData.filter(cls => event.className.includes(cls.id)).map(cls => cls.name) 
          : [];

        setClasses(filteredClasses);

        const eventCategoryResponse = await axios.get(`${BASE_URL}/eventCategory/getEventCatList`);
        const eventCategoriesData = eventCategoryResponse.data.data;

        const filteredEventCategory = eventCategoriesData.find(category => category.id === event.eventCategory);
        setEventCategoryTitle(filteredEventCategory ? filteredEventCategory.eventCategoryTitle : '');

        const roleResponse = await axios.get(`${BASE_URL}/role/getRoleList`);
        const rolesData = roleResponse.data.data;
        const filteredRoles = event.role 
          ? event.role.includes(0) 
            ? ['All'] 
            : rolesData.filter(role => event.role.includes(role.id)).map(role => role.name) 
          : [];
        setRoleNames(filteredRoles);
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 md:p-0 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 transform transition-all duration-300 border-4 relative md:text-xl text-base">
        <button
          className="absolute top-5 right-14  font-bold text-gray-600 hover:text-gray-800 focus:outline-none flex items-center"
          onClick={() => {
            console.log("Download event details");
          }}
        >
          <span className="mr-2 md:block hidden">Download</span>
          <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
        </button>

        <button
          onClick={onClose}
          className="absolute top-5 right-4 font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
        </button>

        <div className="flex items-center mb-4">
          <span 
            className="inline-block w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: catColor }}
          ></span>
          <h2 className="md:text-2xl text-medium font-bold">{eventCategoryTitle}</h2>
        </div>

        <div className="mb-4">
          <h2 className="md:text-4xl text-2xl  font-bold mb-2">{event.eventTitle}</h2>
          <div className="flex md:items-center justify-between md:flex-row flex-col text-sm text-gray-700">
            <div className='flex items-center'>
              <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-5 4h5M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>

              <span className="mr-4">{event.startDate} to {event.endDate}</span>
            </div>
           <div className='flex items-center'>
            <svg
                className="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-5 4h5M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>{event.startTime} - {event.endTime}</span>
           </div>
          </div>
        </div>

        <div className="mt-4 h-[110px] mb-40 bg-gray-200 p-3 rounded-lg shadow-sm">
          <p className="text-gray-800 mt-2">{event.message}</p>
        </div>

        <div className="absolute mt-10 bottom-4 right-4 bg-gray-100 p-3 rounded-lg shadow-md" style={{ width: '200px' }}>
          <p className="text-gray-800 font-semibold">Event For:</p>
          {classes.length > 0 || users.length > 0 ? (
            <>
              <p className="text-gray-700">
                {classes.length > 0 ? `Classes: ${classes.join(', ')}` : ''}
              </p>
              <p className="text-gray-700">
                {users.length > 0 ? `Users: ${users.join(', ')}` : ''}
              </p>
            </>
          ) : (
            <p className="text-gray-700">
              {roleNames.length > 0 ? roleNames.join(', ') : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailPopup;
