import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const ColorPicker = ({ initialColor = '#cccccc', onChange, label }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  // Handle color change
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (onChange) onChange(newColor);
  };

  return (
    <div className="relative flex items-center space-x-3 mb-2">
      {label && <label className="mb-2 text-sm font-semibold text-gray-700">{label}</label>}

        {/* Display Selected Color */}
        <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className='w-10 h-10 rounded-xl'
          />
        <span className="text-gray-700">{selectedColor}</span>
      </div>
  );
};

ColorPicker.propTypes = {
  initialColor: PropTypes.string, // Initial color value
  onChange: PropTypes.func,      // Callback to handle color changes
  label: PropTypes.string,       // Optional label for the color picker
};

export default ColorPicker;
