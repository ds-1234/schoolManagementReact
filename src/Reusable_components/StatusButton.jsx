import React from 'react';

const StatusButton = ({ isActive }) => {
  return (
    <button 
      className={`flex items-center justify-center px-3 py-1 rounded-full bg-[#f1f0f3] font-semibold ${isActive ? 'text-green-500' : 'text-red-500'}`}
      disabled
    >
      <span 
        className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} mr-2`}
      ></span>
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
};

export default StatusButton;