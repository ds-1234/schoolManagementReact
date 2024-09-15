// ToggleButton.js
import React from 'react';
import './Switch.css';

const ToggleButton = ({ id, label, isOn, handleToggle, register, ...rest }) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="mr-3 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id} // Use the id prop here
          defaultChecked={isOn}
          {...register(id)} // Use the register method from react-hook-form
          onChange={handleToggle}
          className="react-switch-checkbox"
          type="checkbox"
          {...rest}
        />
        <label
          style={{ background: isOn ? '#06D6A0' : 'grey' }}
          className="react-switch-label"
          htmlFor={id} // Use the id prop for label association
        >
          <span className={`react-switch-button`} />
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;