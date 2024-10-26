import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar'; // Importing react-calendar library
import 'react-calendar/dist/Calendar.css'; // Importing default CSS for the calendar

const EventCalendar = ({ eventDates }) => {
  // Convert eventDates to a Set for easier checking
  const eventDateSet = new Set(eventDates.map(date => new Date(date).toDateString()));

  // Function to tile the events
  const tileClassName = ({ date }) => {
    if (eventDateSet.has(date.toDateString())) {
      return 'bg-blue-300 rounded-full'; // Tailwind classes for event dates
    }
    return null;
  };

  return (
    <div className="mt-5 w-full">
      {/* <h2 className="text-lg md:text-xl font-semibold text-black mb-4">Event Calendar</h2> */}
      <ReactCalendar
        tileClassName={tileClassName}
        view="month" // Set the initial view to month
      />
    </div>
  );
};

export default EventCalendar;
