import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

const AddFeesGrp = ({ isOpen, onClose }) => {

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
      url: 'http://localhost:8080/feesGroup/saveFeesGroup',
      data: {
        feesGroupName: data.feesGroupName,
        description: editorData,
        isActive:value
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Fees Group');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Fees Group');
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
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Fees Group</h2>

          {/* fee grp Input */}
          <div className="mb-4">
            <label htmlFor="feesGroupName" className="block text-gray-700 font-semibold mb-2">Fees Group</label>
            <input
              type="text"
              id="feesGroupName"
              className={`w-full px-3 py-2 border ${errors.feesGroupName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('feesGroupName', { required: 'feesGroupName is required' })}
            />
            {errors.feesGroupName && <p className="text-red-500 text-sm mt-1">{errors.feesGroupName.message}</p>}
          </div>



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

export default AddFeesGrp;
