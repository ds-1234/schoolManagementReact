import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../Reusable_components/CkEditor.css';

function EditHolidays({ isOpen, onClose, holidayId, onSuccess }) {
  const [holiday, setHoliday] = useState({ title: '',holidayDate: '', description: '' });
  const [value,setValue] =useState(true)
  const [editorData, setEditorData] = useState('');


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/holidays/getHolidayById/${holidayId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const holidayData = response.data.data;
        // Populate the holiday state with the API response
        setHoliday({
          title: holidayData.holidayName,
          holidayDate: holidayData.holidayDate,
          description: holidayData.description,
        });
        setEditorData(holidayData.description)

        setValue(holidayData.isActive); // Set active status based on API response
      })
      .catch((error) => {
        console.error('Error fetching Holiday:', error);
      });
  }, [holidayId]);

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
    setHoliday({ ...holiday, [name]: value });
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/holidays/saveholidays`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        id : `${holidayId}`,
        holidayName:holiday.title,
        holidayDate:holiday.holidayDate,
        description:holiday.description,
        isActive:value,
        },
    })
      .then((response) => {
        console.log('holiday updated:', response.data);
        toast.success('holiday updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating holiday:', error);
        toast.error('Failed to update holiday.');
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Holiday</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Holiday</label>
            <input
              type="text"
              name="title"
              value={holiday.title}  
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title name"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-2 text-black">Date </label>
              <input
                  defaultValue={holiday.holidayDate}
                  onChange={handleChange}
                // {...register('date', { required: 'Date is required' })}
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
            </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            {/* <textarea
              name="description"
              value={holiday.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter holiday description"
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

export default EditHolidays;
