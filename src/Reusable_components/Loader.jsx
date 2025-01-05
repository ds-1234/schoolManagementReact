import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-b-green-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-red-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;

/* CSS Classes in Tailwind */
// Add the following classes in your Tailwind setup if not already present:
// .animate-spin { animation: spin 1s linear infinite; }
