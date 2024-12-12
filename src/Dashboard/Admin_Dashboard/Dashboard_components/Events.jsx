import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Reusable_components/Button';
import EventCalendar from '../../../Reusable_components/EventCalendar';
import axios from 'axios';

function Events({ userTypeImages }) {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/getEventList`);
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const today = new Date();

  // Filter upcoming events
  const upcomingEvents = events.filter((event) => {
    const startDate = new Date(event.startDate);
    const endDate = event.endDate ? new Date(event.endDate) : null;

    return (
      startDate >= today || (endDate && endDate >= today) // Future or ongoing events
    );
  });

  // Paginate upcoming events into chunks of 1 item per page
  const itemsPerPage = 1; // Number of events to display per page
  const pages = Math.ceil(upcomingEvents.length / itemsPerPage);
  const currentEvent = upcomingEvents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )[0];

  // Handle navigation
  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : pages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < pages - 1 ? prevPage + 1 : 0));
  };

  return (
    <div className="bg-white flex flex-col p-5 rounded-md mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg text-blue-950 font-bold">Schedules</h1>
        <Button label="View More" className="text-sm py-0 px-0" onClick={() => navigate('/admin/Event')} />
      </div>

      <EventCalendar events={events} />

      {/* Upcoming Events */}
      <div className="mt-2">
        <h1 className="text-xl text-black font-semibold mb-5">Upcoming Events</h1>
        {currentEvent ? (
          <div>
            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevious}
                className="p-1 bg-gray-300 hover:bg-gray-400 rounded-full text-sm"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              {/* Render current event */}
            <div className="bg-gray-50 shadow-md rounded-lg p-2 flex flex-col border-l-2 w-full mx-4">
              <h2 className="text-lg font-semibold text-gray-800">{currentEvent.eventTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">
                <i className="fas fa-calendar"></i>{' '}
                {new Date(currentEvent.startDate).toLocaleDateString()} -{' '}
                {currentEvent.endDate ? new Date(currentEvent.endDate).toLocaleDateString() : ''}
              </p>
              <p className="text-sm text-gray-500">
                <i className="fas fa-clock"></i> {currentEvent.startTime} - {currentEvent.endTime}
              </p>
              <p className="text-sm text-gray-600 mt-2">{currentEvent.message}</p>
              <div className="flex mt-3 space-x-2">
                {currentEvent.role.map((role, index) => (
                  <img
                    key={index}
                    src={userTypeImages[role === 3 ? 'Student' : 'Teacher']}
                    alt="role"
                    className="w-8 h-8 rounded-full"
                  />
                ))}
              </div>
            </div>
              <button
                onClick={handleNext}
                className="p-1 bg-gray-300 hover:bg-gray-400 rounded-full"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-1">
                {Array.from({ length: pages }).map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    onClick={() => setCurrentPage(pageIndex)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      pageIndex === currentPage ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No upcoming events.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
