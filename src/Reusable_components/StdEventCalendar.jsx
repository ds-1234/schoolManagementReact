import React, { useEffect, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import StdEventDetailPopup from '../Dashboard/Student_Dashboard/Event/StdEvent/StdEventDetailPopup';
import BASE_URL from '../conf/conf';


const StdEventCalendar = ({ events, initialView = "month" }) => {
  const [eventCategories, setEventCategories] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

console.log(events,'events in calendar')

  // Fetch event categories only
  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const categoryRes = await axios.get(`${BASE_URL}/eventCategory/getEventCatList`);
        if (categoryRes.data.success) {
          const categoryColorMap = categoryRes.data.data.reduce((map, category) => {
            map[category.id] = category.eventCatColorCode;
            return map;
          }, {});
          setEventCategories(categoryColorMap);
        }
      } catch (error) {
        console.error("Error fetching event categories:", error);
      }
    };
    fetchEventCategories();
  }, []);

  // Create a map to store events by date, including their color codes
  const eventMap = events.reduce((map, event) => {
    const dateStr = new Date(event.startDate).toDateString();
    const color = eventCategories[event.eventCategory];
    if (color) {
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push({ ...event, color });
    }
    return map;
  }, {});

  // Add background for event dates
  const tileClassName = ({ date }) => {
    return eventMap[date.toDateString()] ? 'border border-black' : null;
  };

  // Render colored dots based on events per date
  const tileContent = ({ date }) => {
    const colors = eventMap[date.toDateString()] || [];
    return (
      <div className="flex justify-center mt-1">
        {colors.map((event, i) => (
          <span
            key={i}
            style={{ backgroundColor: event.color }}
            className="w-2 h-2 rounded-full mx-0.5"
          ></span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDate(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDate]);

  // Handle date click to show events
  const handleDateClick = (date) => {
    const dateStr = date.toDateString();
    if (eventMap[dateStr]) {
      setSelectedDate(dateStr);
    }
  };

  // Function to close the date popup
  const closeDatePopup = () => {
    setSelectedDate(null);
  };

  // Function to open the event detail popup
  const openEventDetail = (event) => {
    setSelectedDate(null); // Close date popup
    setSelectedEvent(event); // Open event detail popup
  };

  return (
    <div className="mt-5 h-full">
      <ReactCalendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        onClickDay={handleDateClick}
        view={initialView}
        minDate={new Date(new Date().getFullYear(), 3)}
        // maxDate={new Date()}
        className="h-full w-full"
      />

      {/* Popup to display events on the selected date */}
      {selectedDate && eventMap[selectedDate].length>1 &&(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

        <button
          onClick={closeDatePopup}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times; {/* This represents the "X" */}
        </button>
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Events on {selectedDate}</h2>
            <ul>
              {eventMap[selectedDate].map((event, i) => (
                <div
                  key={i}
                  onClick={() => openEventDetail(event)}
                  className="flex items-center bg-gray-100 rounded-lg p-4 my-2 cursor-pointer"
                  style={{ borderLeft: `4px solid ${event.color}` }}
                >
                  {event.eventTitle}
                  {console.log(event,'Selected Event from calendar')}
                </div>
              ))}
            </ul>
            <button onClick={closeDatePopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}

{console.log(selectedDate,'selectedDate')}
      {/* Popup to display events on the selected date */}
      {selectedDate && eventMap[selectedDate].length === 1 &&(
    // <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div>
          
        <button
          // onClick={closeDatePopup}
          onClick={ openEventDetail(eventMap[selectedDate][0])}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times; {/* This represents the "X" */}
        </button>
        {console.log(eventMap[selectedDate][0],'eventMap[selectedDate]')}
          {/* <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Events on {selectedDate}</h2>
            {console.log(eventMap[selectedDate],'event on date')}
            <ul>
              {eventMap[selectedDate].map((event, i) => (
                <div
                  key={i}
                  onClick={() => openEventDetail(event)}
                  className="flex items-center bg-gray-100 rounded-lg p-4 my-2 cursor-pointer"
                  style={{ borderLeft: `4px solid ${event.color}` }}
                >
                  {event.eventTitle}
                  {console.log(event,'Selected Event from calendar')}
                </div>
              ))}
            </ul>
            <button onClick={closeDatePopup} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div> */}
        </div>
      )}

      {/* EventDetailPopup for the selected event */}
      {selectedEvent && (
        <StdEventDetailPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          catColor={eventCategories[selectedEvent.eventCategory]}
        />
      )}
    </div>
  );
};

export default StdEventCalendar;
