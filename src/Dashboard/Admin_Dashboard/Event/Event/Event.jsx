import React, { useEffect, useRef, useState } from 'react';
// import Calendar from '../../../../Reusable_components/Calendar';
// import EventCalendar from './EventCalendar'; // Import EventCalendar
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import CategoryTiles from './CategoryTiles';
import AddBtn from '../../../../Reusable_components/AddBtn';
import EventCalendar from '../../../../Reusable_components/EventCalendar';
import AddEvent from './AddEvent';

function Event() {
  const [attendanceMap, setAttendanceMap] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]); // New state for event dates

  const dropdownRef = useRef(null);

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
        const activeCategories = response.data.data.filter((cat) => cat.isActive === true);
        setEventCategories(activeCategories);
      }
    } catch (error) {
      console.error("Error fetching event categories:", error);
    }
  };

  // Fetch events based on selected category ID or all events
  const fetchEventsByCategoryId = async (categoryId) => {
    try {
      const response = categoryId 
        ? await axios.get(`http://localhost:8080/events/getEventListByCatId/${categoryId}`)
        : await axios.get('http://localhost:8080/events/getEventList'); // Fetch all events
      
      if (response.data.success) {
        setEvents(response.data.data);
        // Extract event dates for the calendar
        const dates = response.data.data.map(event => event.startDate);
        setEventDates(dates); // Set the event dates
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEventCategories();
  }, []);

  useEffect(() => {
    // Fetch events when selected category changes
    fetchEventsByCategoryId(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategorySelect = (categoryId, colorCode) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryColor(colorCode);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Event</h1>
      <p className='mt-2'>
        Dashboard / <NavLink to='/admin'> Admin </NavLink> /
        <span className='text-[#ffae01] font-semibold'> Event</span>
      </p>

      <div className="flex items-start w-full mt-10">
      <div className="w-7/12 mr-5 bg-white rounded-xl p-4 border-l-4 shadow-md ]"> {/* Set a specific height */}          {/* <Calendar attendanceMap={attendanceMap} /> */}
          <AddBtn onAddClick={openAddPopup} />
          <EventCalendar eventDates={eventDates} /> {/* Render EventCalendar */}
        </div>

        <div className="w-5/12 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className='text-lg md:text-xl font-semibold text-black'>Events</h2>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none flex items-center gap-2 bg-gray-100"
              >
                {selectedCategoryId === null ? 'All Categories' : eventCategories.find(cat => cat.id === selectedCategoryId)?.eventCategoryTitle}
                <FontAwesomeIcon icon={faAngleDown} />
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => handleCategorySelect(null, '#000')}
                  >
                    All Categories
                  </div>
                  {eventCategories.map(category => (
                    <div
                      key={category.id}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => handleCategorySelect(category.id, category.eventCatColorCode)}
                      style={{ color: category.eventCatColorCode }}
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
              events.map((event) => {
                const categoryColor = eventCategories.find((cat) => cat.id === event.eventCategory)?.eventCatColorCode || "#000"; // Fallback color

                return (
                  <CategoryTiles
                    key={event.id}
                    title={event.eventTitle}
                    date={event.startDate}
                    time={`${event.startTime} - ${event.endTime}`}
                    borderColor={categoryColor} // Pass color to CategoryTiles
                  />
                );
              })
            ) : (
              <p>No events found for this category.</p>
            )}
          </div>
        </div>
      </div>

      <AddEvent
        isOpen={isAddPopupOpen} 
        onClose={closeAddPopup}
      />
    </div>
  );
}

export default Event;
