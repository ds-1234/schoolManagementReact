import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import  '../../../Reusable_components/CkEditor.css';
import BASE_URL from '../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Circles } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Reusable_components/Loader';


const AddSubject = ({ isOpen, onClose }) => {
  const [value, setValue] = useState(true);
  const [editorData, setEditorData] = useState('');
    const [loading, setLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setEditorData('')
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const onSubmit = (data) => {
    setLoading(true); // Start loader
    axios({
      method: 'POST',
      url: `${BASE_URL}/subject/createSubject`,
      data: {
        subject: data.subject,
        description: editorData,
        isActive: value,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added subject');
        reset();
        onClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error adding new subject');
        onClose();
      }).finally(()=> {
        setLoading(false); // Stop loader
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Subject</h2>

          {/* Subject Input */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Subject Name
            </label>
            <input
              id="subject"
              {...register('subject', { required: 'Subject name is required' })}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Enter subject name"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>

          {/* CKEditor for Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
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


          </div>

          {/* Toggle Button for isActive */}
          <div className="mb-4">
            <ToggleButton isOn={value} onChange={setValue} />
          </div>

          {/* Submit Button */}
          <Button type="submit" text="Add Subject" />
        </form>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default AddSubject;
