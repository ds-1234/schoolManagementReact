import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';


function EditEventCategory({ isOpen, onClose, EventCatId, onSuccess }) {
  const [eventCat, setEventCat] = useState({ eventCategoryTitle: ''});
  const [value, setValue] = useState(true);


  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/eventCategory/getEventCatById/${EventCatId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        let data = response.data.data
        setEventCat(response.data.data);
        console.log(eventCat,'eventCat')
        setValue(data.isActive)
      })
      .catch((error) => {
        console.error('Error fetching Event Category:', error);
      });
  }, [EventCatId]);

  useEffect(() => {
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventCat({ ...eventCat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/eventCategory/saveEventCategory`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{id : '${EventCatId}', ...eventCat,isActive:value},
    })
      .then((response) => {
        console.log('Event Category updated:', response.data);
        toast.success('Event Category updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating Event Category:', error);
        toast.error('Failed to update Event Category.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Event Category</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Event Category Title</label>
            <input
              type="text"
              name="eventCategoryTitle"
              value={eventCat.eventCategoryTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Event Category Title"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={roomTy.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Room Type Description"
              rows="4"
              required
            />
          </div> */}

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">Status *</label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
              />
            </div>

          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditEventCategory;
