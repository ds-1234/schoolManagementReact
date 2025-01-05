import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import BASE_URL from '../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../Reusable_components/CkEditor.css';

import { Circles } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Reusable_components/Loader';

function EditSubject({ isOpen, onClose, subjectId, onSuccess }) {
  const [subject, setSubject] = useState({ subject: '', description: '' });
  const [editorData, setEditorData] = useState('');
  const [loading, setLoading] = useState(false);
  


  useEffect(() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/subject/getSubject/${subjectId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setSubject(response.data.data);
        setEditorData(response.data.data.description)
      })
      .catch((error) => {
        console.error('Error fetching subject:', error);
      });
  }, [subjectId]);

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
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true); // Start loader
    console.log(editorData,'editorData')
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${BASE_URL}/subject/createSubject`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:{id : `${subjectId}`, ...subject ,description:editorData, isActive: true},
    })
      .then((response) => {
        console.log('Subject updated:', response.data);
        toast.success('Subject updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error('Error updating subject:', error);
        toast.error('Failed to update subject.');
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

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Subject</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={subject.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter subject name"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={subject.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter subject description"
              rows="4"
              required
            />
          </div> */}

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

export default EditSubject;
