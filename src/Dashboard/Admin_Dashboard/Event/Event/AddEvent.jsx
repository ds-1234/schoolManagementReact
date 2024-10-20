import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';



const AddEvent = ({ isOpen, onClose }) => {
  const [subjectMap, setSubjectMap] = useState({});
  const [dropdownOpen2, setDropdownOpen2] = useState(false); // Event Category dropdown
  const [showClassAndSection, setShowClassAndSection] = useState(false); // To show/hide Class and Section dropdowns
  const eventCategoryDropdownRef = useRef(null); // Ref for the Event Category dropdown

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
        noticeFor: 'All', // Set "All" as the default selected value
      days: {
        Monday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        Tuesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        Wednesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        Thursday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        Friday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        Saturday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
      },
    },
  });

  const [teachers, setTeachers] = useState([]);

  // Handle closing on clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen2 && eventCategoryDropdownRef.current && !eventCategoryDropdownRef.current.contains(e.target)) {
        setDropdownOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen2]);

  // Handle popup visibility and scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowClassAndSection(false)
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

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getUserList', {
          headers: { 'Content-Type': 'application/json' },
        });
        const filteredTeachers = response.data.data.filter(user => user.role === 4);
        setTeachers(filteredTeachers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSub = () => {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/subject/getSubjectList',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const subjects = {};
          response.data.data.forEach((sub) => {
            subjects[sub.id] = sub.subject;
          });
          setSubjectMap(subjects);
        })
        .catch((error) => {
          console.error('Error fetching subjects:', error);
        });
    };

    fetchSub();
    fetchTeachers();
  }, []);

  const onSubmit = (data) => {
    // your form submit logic
    console.log(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white p-4 rounded-xl w-full max-w-xl relative shadow-lg animate-fadeIn overflow-y-auto max-h-screen">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#042954]">New Event</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Radio buttons for "Event For" */}
          <div className="col-span-2">
            <label htmlFor="designationName" className="block text-gray-700 font-semibold mb-2">Event For</label>
            <div className="mt-2 space-y-2">
              <div className='inline ml-4'>
              <input {...register('noticeFor', { required: true })} type="radio" value="All" id="all" className="mr-2" onChange={() => setShowClassAndSection(false)} defaultChecked />
              <label htmlFor="all" className="text-sm font-medium text-gray-700">All</label>
              </div>
              <div className='inline ml-4'>
                <input {...register('noticeFor', { required: true })} type="radio" value="Student" id="student" className="mr-2" onChange={() => setShowClassAndSection(true)} />
                <label htmlFor="student" className="text-sm font-medium text-gray-700">Student</label>
              </div>
              <div className='inline ml-4'>
                <input {...register('noticeFor', { required: true })} type="radio" value="Staff" id="staff" className="mr-2" onChange={() => setShowClassAndSection(false)} />
                <label htmlFor="staff" className="text-sm font-medium text-gray-700">Staff</label>
              </div>
            </div>
          </div>

          {/* Conditional Dropdowns for Class and Section */}
          {showClassAndSection && (
            <>
              <div className="mb-4">
                <label htmlFor="class" className="block text-gray-700 font-semibold mb-2">Class</label>
                <select id="class" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('class', { required: 'Class is required' })}>
                  {/* Dummy options for now */}
                  <option value="">Select Class</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="section" className="block text-gray-700 font-semibold mb-2">Section</label>
                <select id="section" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" {...register('section', { required: 'Section is required' })}>
                  {/* Dummy options for now */}
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            </>
          )}

          {/* Event Title Input */}
          <div className="mb-4">
            <label htmlFor="eventtitle" className="block text-gray-700 font-semibold mb-2">Event Title</label>
            <input
              type="text"
              id="eventtitle"
              className={`w-full px-3 py-2 border ${errors.eventtitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('eventtitle', { required: 'Event Title is required' })}
            />
            {errors.eventtitle && <p className="text-red-500 text-sm mt-1">{errors.eventtitle.message}</p>}
          </div>

          {/* Date and Time Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Date From</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Date To</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Time From</label>
              <input type="time" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Time To</label>
              <input type="time" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>

                    {/* Event Category Input */}
                    <div className="mb-2 relative" ref={eventCategoryDropdownRef}>
          <label htmlFor="feesGroup" className="block text-gray-700 font-semibold mb-2">Event Category</label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for Fees Group
            >
              {/* <p>{selectedFeesGrp ? selectedFeesGrp.feesGroupName : 'Select Event Category'}</p> */}
              <p>{ 'Select Event Category'}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen2 && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                {/* {feesGrp.map(feesGroup => (
                  <div
                    key={feesGroup.id}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={() => {
                      setSelectedFeesGrp(feesGroup);
                      setDropdownOpen2(false);
                    }}
                  >
                    {feesGroup.feesGroupName}
                  </div>
                ))} */}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-2">
        <Button type="submit" />
        <Button label="Cancel" className="bg-[#ffae01]" onClick={onClose} />
      </div>
              </form>
      </div>
    </div>
  );
};

export default AddEvent;



