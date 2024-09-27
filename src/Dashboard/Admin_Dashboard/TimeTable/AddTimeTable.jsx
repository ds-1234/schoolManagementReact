import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const AddTimeTable = ({ isOpen, onClose, classItem }) => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
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

  const [subjects, setSubjects] = useState([]);
  const [teachers , setTeachers] = useState([]) ;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subject/getSubjectList', {
          headers: { 'Content-Type': 'application/json' },
        });
        setSubjects(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getUserList', {
          headers: { 'Content-Type': 'application/json' },
        });
        const filteredTeachers = response.data.data.filter(user => user.role.name === 'Teacher' )
        console.log(filteredTeachers);
        
        setTeachers(filteredTeachers);
        
      }catch(error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSubjects();
    fetchTeachers();
  }, []);

  const [activeDay, setActiveDay] = useState('Monday');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${activeDay}`,
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const onSubmit = (data) => {
    const payload = {
      className: {
        id: classItem.id,
        name: classItem.name,
        section: classItem.section,
        subject: [JSON.parse(data.days[activeDay][0].subject)],
      },
      weekDay: activeDay,
      startTime: data.days[activeDay][0].timeFrom,
      endTime: data.days[activeDay][0].timeTo,
      teacherName: JSON.parse(data.days[activeDay][0].teacher),
    };
  
    // Send the payload directly to the API
    axios({
      method: 'POST',
      url: 'http://localhost:8080/timeTable/addTimeTable',
      data: payload,
    })
    .then((response) => {
      console.log(response);
      toast.success('Successfully added Time Table!');
      reset();
      onClose();
    })
    .catch((err) => {
      console.error(err);
      toast.error('Error adding new Time Table!');
      onClose();
    });
  };

  if (!isOpen) return null;

  const handleDayChange = (day) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDay(day);
      setIsTransitioning(false);
    }, 300);
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
  <div className="bg-white p-4 rounded-xl w-full max-w-4xl relative shadow-lg animate-fadeIn">
    <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
      &times;
    </button>

    <h2 className="text-2xl font-bold mb-6 text-[#042954]">Add Time Table</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-t border-gray-200 bg-gray-200 p-2 rounded-lg">
        <div className="mb-4">
          <ul className="flex space-x-4">
            {daysOfWeek.map((day) => (
              <li key={day}>
                <button
                  type="button"
                  className={`px-4 relative transition-all duration-500 ease-in-out ${
                    activeDay === day ? 'border-b-2 border-blue-900 text-black' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleDayChange(day)}
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 pt-1"></div>
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Subject</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" {...register(`days.${activeDay}.${index}.subject`)}>
                  <option value="" disabled>Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={JSON.stringify(sub)}>
                      {sub.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Teacher</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" {...register(`days.${activeDay}.${index}.teacher`)}>
                  <option value="" disabled>Select Teacher</option>
                  {teachers.map((tch) => (
                    <option key={tch.id} value={JSON.stringify(tch)}>
                      {tch.firstName} - {tch.userName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Time From</label>
                <input type="time" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" {...register(`days.${activeDay}.${index}.timeFrom`)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Time To</label>
                <input type="time" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" {...register(`days.${activeDay}.${index}.timeTo`)} />
              </div>
              <div className="flex items-end">
                <Button onClick={() => remove(index)} label={<FontAwesomeIcon icon={faTrashCan} />} className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10" />
              </div>
            </div>
          ))}
          <button type="button" className="text-blue-500 hover:text-blue-700 p-2 transition-colors duration-150" onClick={() => append({ subject: '', teacher: '', timeFrom: '', timeTo: '' })}>
            + Add New
          </button>
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

export default AddTimeTable;


