import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import TodayDate from '../../../Reusable_components/TodayDate';
import FutureDates from '../../../Reusable_components/futureDates';

const AddHomework = ({ isOpen, onClose }) => {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const [value, setValue] = useState(true);
  const [classes, setClasses] = useState([]);
  const [subjects , setSubjects] = useState([]) ;
  const [file , setFile] = useState(null) ;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues ,
    reset ,
    setValue: setFormValue,
  } = useForm();


  // Fetch class and subject data
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setValue(true);
      setClasses(user.className)
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

  const submitHomework = (data) => {
    // Extract only necessary fields for className and subjectName
    const selectedClass = JSON.parse(data.className);  // Parse className to get the selected class object
    const selectedSubject = JSON.parse(data.subjectName);  // Parse subjectName to get the selected subject object
  
    const homeworkRequest = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role, // include only required fields here
        isActive: user.isActive,
      },
      className: {
        id: selectedClass.id,
        name: selectedClass.name,
        section: selectedClass.section,
      },
      subjectName: {
        id: selectedSubject.id,
        subject: selectedSubject.subject,
      },
      homeworkDate: data.homeworkDate,
      submissionDate: data.submissionDate,
      isActive: value, 
    };
  
    const formData = new FormData();
    formData.append('homeworkRequest', new Blob([JSON.stringify(homeworkRequest)], { type: 'application/json' }));
    formData.append('file', file); 
  
    axios({
      method: 'post',
      url: 'http://localhost:8080/homework/saveHomework',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log('Response:', res.data.data);
        toast.success('Homework added successfully!');
        setValue(true);
        reset(); 
        onClose(); 
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add homework.');
        setValue(true);
        onClose();
      });
  };

  if (!isOpen) return null;

  const handleClassChange = (e) => {
    const selectedClass = JSON.parse(e.target.value);
    if (selectedClass && selectedClass.subject) {
      setSubjects(selectedClass.subject);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // store the selected file
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Add Homework</h2>
        <form onSubmit={handleSubmit(submitHomework)} className="space-y-4">
          {/* Grid to place two fields together */}
          <div className="grid grid-cols-2 gap-4">
            {/* Class */}
            <div>
              <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <select
                {...register('className', { required: 'Class is required' })}
                className="w-full py-2 border rounded-xl bg-gray-100 px-2"
                onChange={handleClassChange}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={JSON.stringify(cls)}>
                    {cls.name}-{cls.section}
                  </option>
                ))}
              </select>
              {errors.className && <span className="text-red-500 text-sm">{errors.className.message}</span>}
            </div>

          </div>

          {/* Grid to place Subject and Homework Date together */}
          <div className="grid grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                {...register('subjectName', { required: 'Subject is required' })}
                className="w-full py-2 border rounded-xl bg-gray-100 px-2"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={JSON.stringify(sub)}>
                    {sub.subject}
                  </option>
                ))}
              </select>
              {errors.subjectName && <span className="text-red-500 text-sm">{errors.subjectName.message}</span>}
            </div>

            {/* Homework Date */}
            <div>
              <TodayDate 
              labelClass={"block text-sm font-medium text-gray-700"}
              name={"homeworkDate"}
              label={"Homework Date"}
              register={register}
              required={true} 
              className={'w-full py-2 border rounded-xl bg-gray-100 px-2'}
              />
              {errors.homeworkDate && (
                <span className="text-red-500 text-sm">{errors.homeworkDate.message}</span>
              )}
            </div>
          </div>

          {/* Grid to place Submission Date and Attachments together */}
          <div className="grid grid-cols-2 gap-4">
            {/* Submission Date */}
            <div>
              <FutureDates
              labelClass="block text-sm font-medium text-gray-700"
              label="Submission Date"
              name={"submissionDate"}
              className="w-full border rounded-xl bg-gray-100 py-2 px-2 "
              register={register}
              required={true}
              // currentDate={homeworkDate}
              />

              {errors.submissionDate && (
                <span className="text-red-500 text-sm">{errors.submissionDate.message}</span>
              )}
            </div>

            {/* Attachments */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full py-2 border rounded-xl bg-gray-100"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2 text-black" htmlFor="status">
              Status
            </label>
            <ToggleButton
              isOn={value}
              handleToggle={() => setValue(!value)}
              id="status"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-center" />
        </form>
      </div>
    </div>
  );
};

export default AddHomework;
