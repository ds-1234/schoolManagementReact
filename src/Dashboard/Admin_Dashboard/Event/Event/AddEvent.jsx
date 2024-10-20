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
    const eventCategoryDropdownRef = useRef(null); // Ref for the Event Category dropdown
    const [dropdownOpen2, setDropdownOpen2] = useState(false); // Event Category dropdown
  
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
      defaultValues: {
        days: {
          Monday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Tuesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Wednesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Thursday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Friday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Saturday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
        },
        noticeFor: "All" // Pre-select "All"
      },
    });
    
    // Your other useEffect and logic remains the same...
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
        <div className="bg-white p-4 rounded-xl w-full max-w-xl relative shadow-lg animate-fadeIn">
          <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
            &times;
          </button>
  
          <h2 className="text-2xl font-bold mb-6 text-[#042954]">New Event</h2>
  
          <form >
            {/* Radio buttons for "Event For" */}
            <div className="col-span-2">
              <label htmlFor="designationName" className="block text-gray-700 font-semibold mb-2">Event For</label>
              <div className="mt-2 space-y-2">
                <div className="inline ml-4">
                  <input
                    {...register('noticeFor', { required: true })}
                    type="radio"
                    value="All"
                    id="all"
                    className="mr-2"
                    defaultChecked // Pre-select "All"
                  />
                  <label htmlFor="all" className="text-sm font-medium text-gray-700">All</label>
                </div>
                <div className="inline ml-4">
                  <input
                    {...register('noticeFor', { required: true })}
                    type="radio"
                    value="Student"
                    id="student"
                    className="mr-2"
                  />
                  <label htmlFor="student" className="text-sm font-medium text-gray-700">Student</label>
                </div>
                <div className="inline ml-4">
                  <input
                    {...register('noticeFor', { required: true })}
                    type="radio"
                    value="Staff"
                    id="staff"
                    className="mr-2"
                  />
                  <label htmlFor="staff" className="text-sm font-medium text-gray-700">Staff</label>
                </div>
              </div>
            </div>
  
            {/* Event Title Input */}
            <div className="mb-4">
              <label htmlFor="designationName" className="block text-gray-700 font-semibold mb-2">Event Title</label>
              <input
                type="text"
                id="eventtitle"
                className={`w-full px-3 py-2 border ${errors.eventtitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register('eventtitle', { required: 'Event Title is required' })}
              />
              {errors.eventtitle && <p className="text-red-500 text-sm mt-1">{errors.eventtitle.message}</p>}
            </div>
  
            {/* Event Category Input */}
            <div className="mb-2 relative" ref={eventCategoryDropdownRef}>
              <label htmlFor="feesGroup" className="block text-gray-700 font-semibold mb-2">Event Category</label>
              <div
                className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
                onClick={() => setDropdownOpen2(!dropdownOpen2)} // Toggle dropdown for Event Category
              >
                <p>{'Select Event Category'}</p>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {dropdownOpen2 && (
                <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full z-10">
                  {/* Dropdown content */}
                </div>
              )}
            </div>
  
            {/* Date and Time inputs */}
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
  


