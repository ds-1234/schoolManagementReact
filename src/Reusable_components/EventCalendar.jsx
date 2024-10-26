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
    <div className="mt-5 h-full">
      <ReactCalendar
        tileClassName={tileClassName}
        view="month" // Set the initial view to month
        className="h-full w-full" // Adjust height here (example: 500px)
      />
    </div>
  );
};

export default EventCalendar;
