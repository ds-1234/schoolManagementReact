import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ eventDates, initialView = "month" }) => {
  // Create a map to count the number of events per date
  const eventCountMap = eventDates.reduce((map, date) => {
    const dateStr = new Date(date).toDateString();
    map[dateStr] = (map[dateStr] || 0) + 1;
    return map;
  }, {});

  // Function to tile the events with background for event dates
  const tileClassName = ({ date }) => {
    return eventCountMap[date.toDateString()] ? 'bg-blue-300 rounded-full' : null;
  };

  // Function to render larger dots based on the number of events on that date
  const tileContent = ({ date }) => {
    const eventCount = eventCountMap[date.toDateString()] || 0;
    return (
      <div className="flex justify-center mt-1">
        {Array.from({ length: eventCount }).map((_, i) => (
          <span key={i} className="w-2 h-2 bg-blue-500 rounded-full mx-0.5"></span> // Increased dot size
        ))}
      </div>
    );
  };

  return (
    <div className="mt-5 h-full">
      <ReactCalendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        view={initialView}
        minDate={new Date(new Date().getFullYear(), 3)} // April of the current year
        maxDate={new Date()} // Present month
        className="h-full w-full"
      />
    </div>
  );
};

export default EventCalendar;
