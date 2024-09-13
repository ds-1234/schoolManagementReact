// ToggleButton.js
import React from 'react';

const ToggleButton = ({ id, label, defaultChecked = true, register, ...rest }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="mr-3 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        {...register(id)} // Use the register method from react-hook-form
        defaultChecked={defaultChecked} // Default value
        {...rest}
        className="toggle-checkbox"
      />
      <style jsx>{`
        .toggle-checkbox {
          appearance: none;
          background-color: #e5e7eb; /* Gray background */
          cursor: pointer;
          border-radius: 9999px;
          position: relative;
          width: 2.5rem;
          height: 1.5rem;
          transition: background-color 0.2s ease-in-out;
        }
        .toggle-checkbox:checked {
          background-color: #4ade80; /* Green when active */
        }
        .toggle-checkbox::before {
          content: '';
          position: absolute;
          top: 0.25rem;
          left: 0.25rem;
          width: 1.25rem;
          height: 1.25rem;
          background-color: white;
          border-radius: 9999px;
          transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked::before {
          transform: translateX(1rem); /* Move knob to the right */
        }
      `}</style>
    </div>
  );
};

export default ToggleButton;
