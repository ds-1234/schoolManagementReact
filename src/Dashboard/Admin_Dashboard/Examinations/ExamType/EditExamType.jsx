import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import BASE_URL from '../../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditExamType({ isOpen, onClose, examtypeId, onSuccess }) {
  const [examType, setExamType] = useState({ ExamName: '', description: '', });
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [editorData, setEditorData] = useState('');


  useEffect(() => {
    if (isOpen) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/examType/getExamType/${examtypeId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setExamType(response.data.data);
          setEditorData(response.data.data.examTypeDescription)

          // Reset the form with the fetched data
          reset({
            ExamName: response.data.data.examTypeName,
            description: response.data.data.examTypeDescription,

          });

        })
        .catch((error) => {
          console.error('Error fetching Exam Type:', error);
        });
    }
  }, [examtypeId, isOpen, reset]);

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

  const onSubmit = (data, e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `${BASE_URL}/examType/updateExamType`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: `${examtypeId}`,
        examTypeName: data.ExamName,
        examTypeDescription: data.description,

      },
    })
      .then((response) => {
        toast.success('Exam Type updated successfully!');
        onSuccess();
        onClose();
        setValue(true);
      })
      .catch((error) => {
        toast.error('Failed to update Exam Type.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Edit Exam Type</h2>

        {/* Exam Name Input */}
        <div className="mb-4">
          <label htmlFor="ExamName" className="block text-gray-700 font-semibold mb-2">Exam Type *</label>
          <input
            type="text"
            id="ExamName"
            className={`w-full px-3 py-2 border ${errors.ExamName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('ExamName', { required: 'Exam name is required' })}
            defaultValue={examType.ExamName}

          />
          {errors.ExamName && <p className="text-red-500 text-sm mt-1">{errors.ExamName.message}</p>}
        </div>

        {/* Description Input */}
        <div className="mb-2">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          {/* <textarea
            id="description"
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
            {...register('description', { required: 'Description is required' })}
            defaultValue={examType.description}

          ></textarea> */}
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
          {/* {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>} */}
        </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditExamType;
