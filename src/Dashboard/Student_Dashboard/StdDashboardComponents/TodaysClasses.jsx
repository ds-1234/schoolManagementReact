import React, { useState } from 'react';

function TodaysClasses() {
  const [date, setDate] = useState(new Date());
  const [classes, setClasses] = useState([
    { subject: 'English', status: 'Completed' },
    { subject: 'Chemistry', status: 'Completed' },
    { subject: 'Physics', status: 'Incompleted' },
  ]);

  // Format date to a readable string
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle date navigation
  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  return (
    <div className="p-5 font-sans   bg-gray-100 rounded-lg shadow-lg">
      {/* Heading with Date and Navigation */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Today's Classes</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDateChange(-1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            &lt;
          </button>
          <span className="text-lg font-medium">{formatDate(date)}</span>
          <button
            onClick={() => handleDateChange(1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Line Separator */}
      <hr className="my-5 border-gray-300" />

      {/* Classes List */}
      <ul className="space-y-3">
        {classes.map((classItem, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 border-b border-gray-200"
          >
            <span className="text-lg">{classItem.subject}</span>
            <span
              className={`text-lg font-medium ${
                classItem.status === 'Completed' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {classItem.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodaysClasses;
