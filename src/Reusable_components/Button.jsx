import React from 'react';

const Button = ({ label='Submit', onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#042954] hover:bg-[#ffae01] text-white font-bold py-2 px-4 rounded-lg  transition ease-in-out duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
