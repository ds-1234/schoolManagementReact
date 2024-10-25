import React, { useEffect, useRef, useState } from 'react';
import Calendar from '../../../../Reusable_components/Calendar';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import CategoryTiles from './CategoryTiles';
import AddBtn from '../../../../Reusable_components/AddBtn';
import AddEvent from './AddEvent';
import Button from '../../../../Reusable_components/Button';

function Event() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [attendanceMap, setAttendanceMap] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [view, setView] = useState('month');
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [events, setEvents] = useState([]);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  useEffect(() => {
    if (isAddPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddPopupOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Fetch event categories
  const fetchEventCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/eventCategory/getEventCatList');
      if (response.data.success) {
        const cat = response.data.data
        let eventcat = cat.filter((cat) => cat.isActive==true);

        setEventCategories(eventcat);
      }
    } catch (error) {
      console.error("Error fetching event categories:", error);
    }
  };

  // Fetch events based on selected category ID
  const fetchEventsByCategoryId = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/events/getEventListByCatId/${categoryId}`);
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEventCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchEventsByCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Event</h1>
      <p className='mt-2'>
        Dashboard / <NavLink to='/admin'> Admin </NavLink> / 
        <span className='text-[#ffae01] font-semibold'> Event</span>
      </p>

      <div className="flex items-start bg-white mt-10">
        <div className="w-2/3 bg-white rounded-xl p-4 border-l-4 shadow-md">
          <Calendar attendanceMap={attendanceMap} />
          <AddBtn onAddClick={openAddPopup} />
        </div>

        <div className="w-1/3 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className='text-lg md:text-xl font-semibold text-black'>Events</h2>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2 bg-gray-100"
              >
                {selectedCategoryId ? eventCategories.find(cat => cat.id === selectedCategoryId)?.eventCategoryTitle : 'All Categories'}
                <FontAwesomeIcon icon={faAngleDown} />
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                  {eventCategories.map(category => (
                    <div
                      key={category.id}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.eventCategoryTitle}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="max-h-[calc(100vh-18rem)] overflow-y-auto">
            {events.length > 0 ? (
              events.map((event, index) => (
                <CategoryTiles
                  key={event.id}
                  title={event.eventTitle}
                  date={event.startDate}
                  time={`${event.startTime} - ${event.endTime}`}
                  borderColor={index % 2 === 0 ? 'red' : 'blue'}
                />
              ))
            ) : (
              <p>No events found for this category.</p>
            )}
          </div>
        </div>
      </div>

      <AddEvent
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
        }} 
      />
    </div>
  );
}

export default Event;
