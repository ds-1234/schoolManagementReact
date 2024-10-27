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
<<<<<<< Updated upstream
=======
import Button from '../../../../Reusable_components/Button';
import BASE_URL from '../../../../conf/conf';
>>>>>>> Stashed changes

function Event() {
  const [attendanceMap, setAttendanceMap] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]); // New state for event dates
  const [view, setView] = useState('month'); // Track the active view

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

<<<<<<< Updated upstream
  // Dummy event data for now, later to be replaced by API data
  const dummyEvents = [
    { id: 1, title: "Sports Day", date: "2024-11-15", time: "9:00 AM - 12:00 PM" },
    { id: 2, title: "Annual Celebration", date: "2024-12-20", time: "10:00 AM - 1:00 PM" },
    { id: 3, title: "Workshop", date: "2024-10-25", time: "2:00 PM - 5:00 PM" },
    { id: 4, title: "Work", date: "2024-10-5", time: "2:00 PM - 4:00 PM" },
    { id: 5, title: "Seminar", date: "2024-10-25", time: "2:00 PM - 5:00 PM" },
  ];
=======
  // Fetch event categories
  
  const fetchEventCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventCategory/getEventCatList`);
      if (response.data.success) {
        const activeCategories = response.data.data.filter((cat) => cat.isActive === true);
        setEventCategories(activeCategories);
      }
    } catch (error) {
      console.error("Error fetching event categories:", error);
    }
  };
>>>>>>> Stashed changes

  const fetchData = async () => {
    try {
<<<<<<< Updated upstream
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8080/attendance/getAttendanceList',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const filterClass = response.data.data.filter(data => data.className === user.className[0]);
      console.log(filterClass);

      const newAttendanceMap = {};

      filterClass.forEach((data) => {
        const attendanceStatus = data.attendenceStatus
          .replace(/(\d+)=/g, '"$1":')  
          .replace(/([a-zA-Z]+)/g, '"$1"'); 

        const attendanceObject = JSON.parse(attendanceStatus);
        const formattedDate = new Date(data.attendanceDate).toLocaleDateString();

        if (attendanceObject[user.id]) {
          newAttendanceMap[formattedDate] = attendanceObject[user.id];
        }
      });

      setAttendanceMap(newAttendanceMap);
      console.log(newAttendanceMap);

=======
      const response = categoryId 
        ? await axios.get(`${BASE_URL}/events/getEventListByCatId/${categoryId}`)
        : await axios.get(`${BASE_URL}/events/getEventList`); // Fetch all events
      
      if (response.data.success) {
        setEvents(response.data.data);
        // Extract event dates for the calendar
        const dates = response.data.data.map(event => event.startDate);
        setEventDates(dates); // Set the event dates
      }
>>>>>>> Stashed changes
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

    // Function to handle view change
    const handleViewChange = (newView) => {
      setView(newView);
      // navigate(`/events/${newView}`); // Example of navigation based on the selected view
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
          className={`py-2 px-4 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black '}`}
          onClick={() => handleViewChange('month')}
        >
          Month
        </Button>
        <Button
                label='Week'
          className={`py-2 px-4 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handleViewChange('week')}
        >
          Week
        </Button>
        <Button
        label='day'
          className={`py-2 px-4 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handleViewChange('day')}
        >
          Day
        </Button>
      </div>
          <EventCalendar events={events} /> {/* Render EventCalendar */}
        </div>
        {console.log(eventDates,'events date')}

        <div className="w-5/12 bg-white rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className='text-lg md:text-xl font-semibold text-black'>Events</h2>
            <div className="relative" ref={dropdownRef}>
  <button
    onClick={toggleDropdown}
    className="p-2 border border-gray-300 rounded-lg focus:outline-none flex items-center justify-between w-48 bg-gray-100" // Use justify-between for space between items
  >
    <span>
      {selectedCategoryId === null ? 'All Categories' : eventCategories.find(cat => cat.id === selectedCategoryId)?.eventCategoryTitle}
    </span>
    <FontAwesomeIcon icon={faAngleDown} />
  </button>

  {isDropdownOpen && (
    <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-48 z-10"> {/* Set a fixed width */}
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
