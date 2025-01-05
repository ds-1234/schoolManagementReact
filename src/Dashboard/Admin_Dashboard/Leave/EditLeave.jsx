import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../Reusable_components/CkEditor.css';
import Loader from '../../../Reusable_components/Loader';

function EditLeave({ isOpen, onClose, leaveId, onSuccess }) {
  const [leave, setLeave] = useState({ leaveType: '', leaveDescription: '' });
  const [value,setValue] =useState(true)
  const [editorData, setEditorData] = useState('');
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/leaves/getLeaveById/${leaveId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const leaveData = response.data.data;
        setLeave({
            leaveType: leaveData.leaveType,
            leaveDescription: leaveData.leaveDescription,
        });
        setEditorData(leaveData.leaveDescription)
        setValue(leaveData.isActive); // Set active status based on API response
      })
      .catch((error) => {
        console.error('Error fetching Leave:', error);
      });
  }, [leaveId]);

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
    setLeave({ ...leave, [name]: value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    // e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/leaves/saveLeaves`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        id : `${leaveId}`,
        leaveType:leave.leaveType,
        leaveDescription:editorData,
        isActive:value,
        },
    })
      .then((response) => {
        console.log('leave updated:', response.data);
        toast.success('Leave updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating leave:', error);
        toast.error('Failed to update Leave.');
      }).finally(() => {
        setLoading(false); // Stop loader
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                              <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Leave</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Leave Type</label>
            <input
              type="text"
              name="leaveType"
              value={leave.leaveType}  
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Leave Type name"
              required
            />
          </div>



          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            {/* <textarea
              name="leaveDescription"
              value={leave.leaveDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Leave description"
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
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
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

export default EditLeave;
