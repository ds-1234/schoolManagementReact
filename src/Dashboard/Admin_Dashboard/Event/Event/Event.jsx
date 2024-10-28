import React, { useEffect, useRef, useState } from 'react';
// import Calendar from '../../../../Reusable_components/Calendar';
// import EventCalendar from './EventCalendar'; // Import EventCalendar
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CategoryTiles from './CategoryTiles';
import AddBtn from '../../../../Reusable_components/AddBtn';
import EventCalendar from '../../../../Reusable_components/EventCalendar';
import AddEvent from './AddEvent';
import Button from '../../../../Reusable_components/Button';
import EventDetailPopup from './EventDetailPopup';

function Event() {
  const [attendanceMap, setAttendanceMap] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupColor, setPopupColor] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const dropdownRef = useRef(null);

  const openEventPopup = (event,categoryColor) => {
    setSelectedEvent(event); // Set the selected event
    setPopupColor(categoryColor)
  };

  const closeEventPopup = () => {
    setSelectedEvent(null); // Clear the selected event
    setPopupColor(null)
  };


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

  const fetchEventsByDate = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8080/events/getEventByCalandarType?type=date&date=${date}`);
      if (response.data.success) {
        setTodaysEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching today's events:", error);
    }
  };

  const handleDayClick = (date) => {
    setShowCalendar(false);
    setSelectedDate(date);
    fetchEventsByDate(date);
  };
  
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
  }, [isAddPopupOpen]);

  useEffect(() => {
    // Fetch events when selected category changes
    fetchEventsByCategoryId(selectedCategoryId);
  }, [selectedCategoryId,isAddPopupOpen]);

  const handleCategorySelect = (categoryId, colorCode) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryColor(colorCode);
    setIsDropdownOpen(false);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === 'day') {
      setShowCalendar(false);
      fetchEventsByDate(selectedDate);
    } else {
      setShowCalendar(true);
    }
  };

  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1)));
    const formattedDate = newDate.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    fetchEventsByDate(formattedDate);
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
          <div className="flex space-x-2  mb-4 mt-4">
          <Button
              label='Month'
              className={`py-2 px-4 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => handleViewChange('month')}
            />
            <Button
              label='Week'
              className={`py-2 px-4 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => handleViewChange('week')}
            />
            <Button
              label='Day'
              className={`py-2 px-4 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => handleViewChange('day')}
            />
          </div>
          {showCalendar ? (
            <EventCalendar events={events} onDayClick={handleDayClick} />
          ) : (
            <div className="text-center">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => handleDateChange('prev')}>
                  <FontAwesomeIcon icon={faChevronLeft} className="text-lg text-gray-500" />
                </button>
                <h2 className="text-xl font-semibold">
                  Events on {new Date(selectedDate).toLocaleDateString()}
                </h2>
                <button onClick={() => handleDateChange('next')}>
                  <FontAwesomeIcon icon={faChevronRight} className="text-lg text-gray-500" />
                </button>
              </div>
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => {
                  const categoryColor = eventCategories.find(cat => cat.id === event.eventCategory)?.eventCatColorCode || "#000";
                  return (
                    <div key={event.id} className="flex items-center p-2 my-2 cursor-pointer" onClick={() => openEventPopup(event, categoryColor)} style={{ borderLeft: `4px solid ${categoryColor}` }}>
                      <span className="flex-grow">{event.eventTitle}</span>
                    </div>
                  );
                })
              ) : (
                <p>No events found for this date.</p>
              )}
            </div>
          )}
       </div>
        {console.log(eventDates,'events date')}

        <div className="w-5/12 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className='text-lg md:text-xl font-semibold text-black'>Events</h2>
            <div className="relative" ref={dropdownRef}>
  <button
    onClick={toggleDropdown}
    className="p-2 border border-gray-300 rounded-lg focus:outline-none flex items-center justify-between w-48 bg-gray-100"
    style={{
      color: selectedCategoryId === null ? '#000' : selectedCategoryColor || '#000', // Apply selected color or default to black
    }}
  >
    <span>
      {selectedCategoryId === null
        ? 'All Categories'
        : eventCategories.find(cat => cat.id === selectedCategoryId)?.eventCategoryTitle}
    </span>
    <FontAwesomeIcon icon={faAngleDown} />
  </button>

  {isDropdownOpen && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-48 z-10">
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
                    date={`${event.startDate} - ${event.endDate}`}
                    time={`${event.startTime} - ${event.endTime}`}
                    message = {event.message}
                    borderColor={categoryColor} // Pass color to CategoryTiles
                    onClick={() => openEventPopup(event,categoryColor)} // Pass click handler

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
            {/* Event Detail Popup */}
            <EventDetailPopup event={selectedEvent} catColor={popupColor} onClose={closeEventPopup} />
    </div>
  );
}

export default Event;
