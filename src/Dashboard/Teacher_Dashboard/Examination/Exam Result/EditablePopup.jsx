import React, { useEffect, useState } from "react";
import Button from "../../../../Reusable_components/Button";

const EditablePopup = ({ examResultId, marks, remarks, onSave, onClose }) => {
  const [updatedMarks, setUpdatedMarks] = useState(marks || "");
  const [updatedRemarks, setUpdatedRemarks] = useState(remarks || "");

  const handleSave = () => {
    onSave(examResultId, updatedMarks, updatedRemarks);
    onClose(); // Close the popup after saving
  };

  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (onSave) {
      document.body.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = 'auto';
    }

    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Clean up scrolling style
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Marks & Remarks
        </h2>

        {/* Marks Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marks
          </label>
          <input
            type="number"
            value={updatedMarks}
            onChange={(e) => setUpdatedMarks(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter marks"
          />
        </div>

        {/* Remarks Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remarks
          </label>
          <textarea
            value={updatedRemarks}
            onChange={(e) => setUpdatedRemarks(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter remarks"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditablePopup;
