import React , {useState} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashCan } from '@fortawesome/free-solid-svg-icons';

const AddTimeTable = ({ isOpen, onClose }) => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
        days: {
          Monday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Tuesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Wednesday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Thursday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Friday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }],
          Saturday: [{ subject: '', teacher: '', timeFrom: '', timeTo: '' }]
        }
    }
  });

  const [activeDay, setActiveDay] = useState('Monday');
  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${activeDay}`
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const onSubmit = (data) => {
    axios({
      method: 'POST',
      // url: `http://localhost:8080/subject/createSubject`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Time Table!');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Time Table!');
        onClose();
      });
  };

  if (!isOpen) return null;

  const addNewRow = () => {
    append({ subject: '', teacher: '', timeFrom: '', timeTo: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white p-4 rounded-xl w-full max-w-4xl relative shadow-lg animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#042954] ">Add Time Table</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-6 mb-4 text-gray-700">
            <div>
              <label className="block text-sm font-semibold mb-1">Class</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 " 
                {...register('class')}
              >
                <option value="">Select class</option>
                <option value="class1">Class 1</option>
                <option value="class2">Class 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Section</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 " 
                {...register('section')}
              >
                <option value="">Select </option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Subject Group</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register('subjectGroup')}
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Period Start Time</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register('startTime')}
              >
                <option value="">Select Start Time</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                {/* Add other times as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duration (min)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...register('duration')}
                placeholder="Enter Duration"
              />
            </div>
          </div>

        
          {/* Dynamic Table Rows */}
          <div className="border-t border-gray-200  bg-gray-200 p-2 rounded-lg ">
            {/* Day Selection */}
            <div className="mb-4">
            <ul className="flex space-x-4">
              {daysOfWeek.map((day) => (
                <li key={day}>
                <button
                type="button"
                className={` px-4 relative transition-all duration-500 ease-in-out 
                  ${activeDay === day ? 'border-b-2 border-blue-900 text-black' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </button>
                </li>
              ))}
            </ul>
            </div>
            <div className='border-t border-gray-200 pt-1'></div>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Subject</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    {...register(`days.${activeDay}.${index}.subject`)}
                  >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    {/* Add more subjects as needed */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Teacher</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    {...register(`days.${activeDay}.${index}.teacher`)}
                  >
                    <option value="">Select Teacher</option>
                    <option value="Mr. Smith">Mr. Smith</option>
                    <option value="Ms. Johnson">Ms. Johnson</option>
                    {/* Add more teachers */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Time From</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    {...register(`days.${activeDay}.${index}.timeFrom`)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Time To</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    {...register(`days.${activeDay}.${index}.timeTo`)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                  onClick={() => remove(index)}
                  label={<FontAwesomeIcon icon={faTrashCan} />}
                  className='bg-red-500 text-white hover:bg-white hover:text-red-700 h-10'/>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 p-2 transition-colors duration-150"
              onClick={addNewRow}
            >
              + Add New
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button type='submit'/>
            <Button label='Cancel' className='bg-[#ffae01]' onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimeTable;

