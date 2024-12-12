import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import BASE_URL from '../../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditHostel({ isOpen, onClose, hostelId, onSuccess }) {
  const [hostel, setHostel] = useState({ hostelName: '',hostelType: '',intakeBedCount: '',hostelAddress: '', description: '' });
  const [editorData, setEditorData] = useState('');


  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/hostel/getHostelById/${hostelId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setHostel(response.data.data);
        setEditorData(response.data.data.description)

      })
      .catch((error) => {
        console.error('Error fetching Hostel:', error);
      });
  }, [hostelId]);

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
    setHostel({ ...hostel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/hostel/saveHostel`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{id : '${hostelId}', ...hostel,isActive:true,description:editorData},
    })
      .then((response) => {
        console.log('Hostel updated:', response.data);
        toast.success('Hostel updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating Hostel:', error);
        toast.error('Failed to update Hostel.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Hostel</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Hostel Name</label>
            <input
              type="text"
              name="hostelName"
              value={hostel.hostelName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Hostel name"
              required
            />
          </div>



<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Hostel Type</label>
  <select
    name="hostelType"
    value={hostel.hostelType}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  >
    <option value="">Select Hostel Type</option>
    <option value="Boys">Boys</option>
    <option value="Girls">Girls</option>
  </select>
</div>



          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Intake</label>
            <input
              type="text"
              name="intakeBedCount"
              value={hostel.intakeBedCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Intake"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              name="hostelAddress"
              value={hostel.hostelAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Hostel Address"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            {/* <textarea
              name="description"
              value={hostel.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Hostel description"
              rows="2"
              required
            /> */}
                                                            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
              config={{
                toolbar: [
                  'heading','bold', 'italic', 'underline', 'bulletedList', 'numberedList', 
                  'link', 'blockQuote', 'undo', 'redo'
                  // Exclude 'imageUpload' to remove the icon
                ],
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditHostel;
