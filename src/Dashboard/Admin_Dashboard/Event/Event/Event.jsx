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
  const [view, setView] = useState('month'); // Track the active view
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const searchOptions = ["Option 1", "Option 2", "Option 3"]; // Example dropdown options

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  useEffect(() => {
    if (isAddPopupOpen ) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen]);

  // Close dropdown when clicking outside
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

  // Dummy event data for now, later to be replaced by API data
  const dummyEvents = [
    { id: 1, title: "Sports Day", date: "2024-11-15", time: "9:00 AM - 12:00 PM" },
    { id: 2, title: "Annual Celebration", date: "2024-12-20", time: "10:00 AM - 1:00 PM" },
    { id: 3, title: "Workshop", date: "2024-10-25", time: "2:00 PM - 5:00 PM" },
    { id: 4, title: "Work", date: "2024-10-5", time: "2:00 PM - 4:00 PM" },
    { id: 5, title: "Seminar", date: "2024-10-25", time: "2:00 PM - 5:00 PM" },
  ];

  const fetchData = async () => {
    try {
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

    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

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
      
      {/* View selection buttons (Month, Week, Day) */}


      <div className="flex items-start bg-white mt-10">
        {/* Calendar section with 2/3 width */}
        <div className="w-2/3 bg-white rounded-xl p-4 border-l-4 shadow-md">
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
          <Calendar attendanceMap={attendanceMap} />
          <AddBtn onAddClick={openAddPopup} />
        </div>

        {/* Section with 1/3 width and scrollable tiles */}
        <div className="w-1/3 bg-white rounded-xl p-4">
        
          {/* Static Search Section */}
          <div className="flex justify-between items-center mb-4">
            {/* Event title aligned to the left */}
            <h2 className='text-lg md:text-xl font-semibold text-black'>Events</h2>

            {/* Dropdown aligned to the right */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center gap-2 bg-gray-100"
              >
                All Category
                <FontAwesomeIcon icon={faAngleDown} />
              </button>

              {isDropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  Celebration
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                >
                  Training
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Scrollable category tiles list */}
          <div className="max-h-[calc(100vh-18rem)] overflow-y-auto">
            {dummyEvents.map((event, index) => (
              <CategoryTiles
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                borderColor={index % 2 === 0 ? 'red' : 'blue'} // Alternate red and blue
              />
            ))}
          </div>
        </div>
      </div>

      <AddEvent
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          // fetchData(); // Refresh data when add popup closes
        }} 
      />
    </div>
  );
}

export default Event;
