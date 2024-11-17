import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditRoomType({ isOpen, onClose, roomtyId, onSuccess }) {
  const [roomTy, setRoomTy] = useState({ roomTypeName: '', description: '' });
  const [value, setValue] = useState(true);
  const [editorData, setEditorData] = useState('');



  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/roomType/getRoomTypeById/${roomtyId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        data = response.data.data
        setRoomTy(response.data.data);
        setValue(data.isActive)
        setEditorData(data.description)

      })
      .catch((error) => {
        console.error('Error fetching room type:', error);
      });
  }, [roomtyId]);

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
    setRoomTy({ ...roomTy, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/roomType/saveRoomType`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{id : '${roomtyId}', ...roomTy,isActive:value,description:editorData},
    })
      .then((response) => {
        console.log('Room Type updated:', response.data);
        toast.success('Room Type updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating Room Type:', error);
        toast.error('Failed to update Room Type.');
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
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Room Type</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room Type</label>
            <input
              type="text"
              name="roomTypeName"
              value={roomTy.roomTypeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Room Type name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            {/* <textarea
              name="description"
              value={roomTy.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Room Type Description"
              rows="4"
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
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditRoomType;
