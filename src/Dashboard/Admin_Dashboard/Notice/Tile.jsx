import React from 'react';

const Tile = ({ title, details, date, postedBy,index }) => {

    const titlePillColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];

  return (
    <div className="relative group">
      {/* Tile Container */}
      <div className="relative bg-white shadow-lg p-6 rounded-lg transition-all duration-300 transform group-hover:translate-x-2 group-hover:scale-105">
        <div className="flex flex-col gap-4">
          {/* Title pill */}
          <div className={`${titlePillColors[index % titlePillColors.length]} text-white px-3 py-2 rounded-full text-base inline-block w-max`}>
             {title}
          </div>
          {/* <div className={`${titlePillColors[index % titlePillColors.length]} text-white px-3 py-2 rounded-full text-base inline-block w-max`}>
            {new Date(date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div> */}

          {/* Notice Details */}
          <h1 className="absolute top-0 right-0 p-2 text-ls font-bold">
          {new Date(date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}            </h1>

          {/* Notice Details */}
          <h1 className="text-2xl font-bold">{details}</h1>

          {/* Notice Details */}
          {/* <p className="text-black">{details}</p> */}

          {/* Posted By */}
          <span className="text-gray-500 text-sm">{postedBy}</span>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gray-100 opacity-0  transition-opacity duration-300"></div>
    </div>
  );
};

export default Tile;
