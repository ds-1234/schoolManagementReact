import React, { useState } from 'react';
import './AddSchoolPopup.css'; // Import the CSS file for styling

const AddSchoolPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('School Data:', formData);
    onClose(); // Close the popup after submission
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>Add School</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">School Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add School</button>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolPopup;
