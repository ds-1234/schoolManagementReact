// ToggleButton.js
import React from 'react';
// import './Switch.css';

const ToggleButton = ({ id, label, isOn, handleToggle, register, ...rest }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="relative cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={isOn}
          onChange={handleToggle}
          className="sr-only"
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
            isOn ? 'bg-green-500' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 transform ${
            isOn ? 'translate-x-6' : ''
          }`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleButton;