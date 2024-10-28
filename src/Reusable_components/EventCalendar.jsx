import React, { useEffect, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const EventCalendar = ({ events, initialView = "month" }) => {
  const [eventCategories, setEventCategories] = useState({});

  // Fetch event categories only
  useEffect(() => {
    const fetchEventCategories = async () => {
      try {
        const categoryRes = await axios.get('http://localhost:8080/eventCategory/getEventCatList');
        if (categoryRes.data.success) {
          // Create a lookup map for category colors
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

  console.log(eventCategories,'eventCategories')
  console.log(events,'events')

  // Create a map to store events by date, including their color codes
  const eventMap = events.reduce((map, event) => {
    const dateStr = new Date(event.startDate).toDateString(); // Assuming events use startDate for the calendar
    const color = eventCategories[event.eventCategory]; // Get the color code using the event's category ID
    if (color) {
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(color);
    }
    return map;
  }, {});

  // Function to add background for event dates
  const tileClassName = ({ date }) => {
    return eventMap[date.toDateString()] ? 'border border-black' : null;
  };

  // Function to render colored dots based on events per date
  const tileContent = ({ date }) => {
    const colors = eventMap[date.toDateString()] || [];
    return (
      <div className="flex justify-center mt-1">
        {colors.map((color, i) => (
          <span
            key={i}
            style={{ backgroundColor: color }}
            className="w-2 h-2 rounded-full mx-0.5"
          ></span>
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
