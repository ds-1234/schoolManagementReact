import React from 'react';

function CategoryTiles({ title, date, time, borderColor }) {
  return (
    <div className="w-full p-4 bg-white shadow-md mb-4" style={{ borderLeft: `4px solid ${borderColor}` }}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{date}</p>
      <div className="flex justify-between pt-10">
        <p className="text-sm text-gray-500">{time}</p> 
      </div>
    </div>
  );
}

export default CategoryTiles;
