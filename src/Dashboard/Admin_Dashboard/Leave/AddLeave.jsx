import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../Reusable_components/CkEditor.css';

const AddLeave = ({ isOpen, onClose }) => {

    const [value, setValue] = useState(true);
    const [editorData, setEditorData] = useState('');



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (isOpen) {
      setEditorData('')
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
  }, [isOpen, onClose]);

  // Handle form submission
  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: `${BASE_URL}/leaves/saveLeaves`,
      data: {
        leaveType: data.leave,
        leaveDescription: editorData,
        isActive:value
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Leave');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Leave');
        onClose();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Leave</h2>

          {/* holidayTitle Input */}
          <div className="mb-4">
            <label htmlFor="leave" className="block text-gray-700 font-semibold mb-2">Leave Type</label>
            <input
              type="text"
              id="leave"
              className={`w-full px-3 py-2 border ${errors.leave ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('leave', { required: 'holidayTitle is required' })}
            />
            {errors.leave && <p className="text-red-500 text-sm mt-1">{errors.leave.message}</p>}
          </div>

          {/* Date
                      <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-black">Date </label>
              <input
                {...register('date', { required: 'Date is required' })}
                className="block h-11 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-[#f3f4f6] py-2 px-3"
                placeholder="Select Date"
                onFocus={(e) => {
                  e.target.type = 'date';
                  e.target.placeholder = '';
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  e.target.type = 'text';
                  e.target.placeholder = 'Select Date';

                  if (value) {
                    const [year, month, day] = value.split('-');
                    e.target.value = `${day}/${month}/${year}`;
                  }
                }}
                aria-invalid={errors.date ? 'true' : 'false'}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div> */}

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            {/* <textarea
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('description', { required: 'Description is required' })}
            ></textarea> */}
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
              onReady={(editor) => {
                editor.ui.view.editable.element.style.minHeight = "100px";
            }}
            config={{
              toolbar: [
                'heading','bold', 'italic', 'underline', 'bulletedList', 'numberedList', 
                'link', 'blockQuote', 'undo', 'redo'
                // Exclude 'imageUpload' to remove the icon
              ],
            }}

            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center" 
          />

        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddLeave;
