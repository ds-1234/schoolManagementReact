import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../../Reusable_components/CkEditor.css';

function EditGrade({ isOpen, onClose, gradeId, onSuccess }) {
  const [grade, setGrade] = useState({ grade: '', percentageFrom: '', percentageUpto: '', gradePoints: '', description: '',isActive:true });
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [value, setValue] = useState(true);
  const [editorData, setEditorData] = useState('');


  useEffect(() => {
    if (isOpen) {
      axios({
        method: 'GET',
        url: `${BASE_URL}/gradePoints/getGradePoints/${gradeId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          let data = response.data.data
          setGrade(response.data.data);
          // Reset the form with the fetched data
          reset({
            Grade: response.data.data.grade,
            marksfrom: response.data.data.percentageFrom,
            marksupto: response.data.data.percentageUpto,
            gradepoints: response.data.data.gradePoints,
            description: response.data.data.description,
          });
          // Update the toggle button value
          setValue(data.isActive);
          setEditorData(response.data.data.description)

        })
        .catch((error) => {
          console.error('Error fetching Grade:', error);
        });
    }
  }, [gradeId, isOpen, reset]);

  useEffect(() => {
      // Disable scrolling on background when the popup is open
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    setValue(true)

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
    };
  }, [onClose,isOpen]);

  const onSubmit = (data, e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `${BASE_URL}/gradePoints/updateGradePoints`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: `${gradeId}`,
        grade: data.Grade,
        percentageFrom: data.marksfrom,
        percentageUpto: data.marksupto,
        gradePoints: data.gradepoints,
        description: data.description,
        isActive: value ? 'true' : 'false',
      },
    })
      .then((response) => {
        toast.success('Grade updated successfully!');
        onSuccess();
        onClose();
        setValue(true);
      })
      .catch((error) => {
        toast.error('Failed to update Grade.');
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

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Edit Grade Points</h2>

          {/* Grade Input */}
          <div className="mb-2">
            <label htmlFor="Grade" className="block text-gray-700 font-semibold mb-2">Grade</label>
            <input
              type="text"
              id="Grade"
              className={`w-full px-3 py-2 border ${errors.Grade ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('Grade')}
              defaultValue={grade.grade}
            />
            {errors.Grade && <p className="text-red-500 text-sm mt-1">{errors.Grade.message}</p>}
          </div>

          {/* Marks from */}
          <div className="mb-2">
            <label htmlFor="marksfrom" className="block text-gray-700 font-semibold mb-2">Marks From(%)</label>
            <input
              type="text"
              id="marksfrom"
              className={`w-full px-3 py-2 border ${errors.marksfrom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('marksfrom')}
              defaultValue={grade.percentageFrom}
            />
            {errors.marksfrom && <p className="text-red-500 text-sm mt-1">{errors.marksfrom.message}</p>}
          </div>

          {/* Marks Upto */}
          <div className="mb-2">
            <label htmlFor="marksupto" className="block text-gray-700 font-semibold mb-2">Marks Upto(%)</label>
            <input
              type="text"
              id="marksupto"
              className={`w-full px-3 py-2 border ${errors.marksupto ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('marksupto')}
              defaultValue={grade.percentageUpto}
            />
            {errors.marksupto && <p className="text-red-500 text-sm mt-1">{errors.marksupto.message}</p>}
          </div>

          {/* Grade Points */}
          <div className="mb-2">
            <label htmlFor="gradepoints" className="block text-gray-700 font-semibold mb-2">Grade Points</label>
            <input
              type="text"
              id="gradepoints"
              className={`w-full px-3 py-2 border ${errors.gradepoints ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('gradepoints')}
              defaultValue={grade.gradePoints}
            />
            {errors.gradepoints && <p className="text-red-500 text-sm mt-1">{errors.gradepoints.message}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            {/* <textarea
              id="description"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="2"
              {...register('description')}
              defaultValue={grade.description}
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
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditGrade;
