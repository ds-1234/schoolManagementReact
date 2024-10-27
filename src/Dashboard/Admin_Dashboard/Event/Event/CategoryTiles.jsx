import React from 'react';

function CategoryTiles({ title, date, time, borderColor, message }) {
  // Function to truncate the message to 15 words
  const truncateMessage = (msg) => {
    return msg.split(' ').slice(0, 15).join(' ') + (msg.split(' ').length > 15 ? '...' : '');
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
