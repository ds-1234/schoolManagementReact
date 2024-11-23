import React, { useState } from 'react';

function Schedules() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Functions to navigate between months
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  // Get the formatted month and year
  const formattedMonthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Generate the dates for the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const dates = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    dates.push(null); // Empty slots for days of the previous month
  }
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(day);
  }

  // Render the calendar
  return (
    <div className="p-6 w-full bg-gray-100 rounded-lg shadow-lg">

    <div className="flex  flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Schedules</h1>
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          &lt;
        </button>
        <span className="text-lg font-semibold">{formattedMonthYear}</span>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center w-full max-w-md">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`${
              date
                ? 'py-2 rounded cursor-pointer hover:bg-blue-100'
                : 'py-2 bg-gray-100'
            }`}
            onClick={() =>
              date && alert(`Selected date: ${date} ${formattedMonthYear}`)
            }
          >
            {date}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Schedules;
