import React from 'react';

function CategoryTiles({ title, date, time, borderColor, message }) {
  // Function to truncate the message to 30 characters
  const truncateMessage = (msg) => {
    if (!msg) return ''; // Handle case where msg is undefined or null
    return msg.length > 30 ? msg.slice(0, 30) + '...' : msg; // Truncate to 30 characters
  };

  return (
    <div className="w-full p-4 bg-white shadow-md mb-4" style={{ borderLeft: `4px solid ${borderColor}` }}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <div className="flex justify-between pt-10">
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      {message && (
        <p className="text-sm text-gray-700 mt-5">{truncateMessage(message)}</p>
      )}
    </div>
  );
}

export default CategoryTiles;
