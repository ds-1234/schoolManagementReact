import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../../conf/conf';
import Loader from '../../../../Reusable_components/Loader';


const AddExamSchedule = ({ isOpen, onClose, classItem }) => {
  const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      classId: '',
      examTypeId: '',
      days: {
        Monday: [{ subject: "", examDate: "", timeFrom: "", timeTo: "", duration: "" }],

      },
    },
  });

  const [teachers, setTeachers] = useState([]);
  const [classList, setClassList] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [subjects, setSubjects] = useState([]); // State for all subjects
  const [filteredSubjects, setFilteredSubjects] = useState([]); // State for filtered subjects based on selected class
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (!isOpen) {
      reset();
      setFilteredSubjects([]);
      setClassList([]);
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      fetchClassList()
      fetchExamTypes()
      fetchSubjects()
      }
  }, [isOpen]);
  

  // Fetch class list from the API
  useEffect(() => {
    if (isOpen) {
            // Reset the form when the modal is closed
fetchClassList    // setFilteredSubjects([])
    // setClassList([])
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
            // Reset the form when the modal is closed
    reset();
    setFilteredSubjects([])
    setClassList([])

    // Close the modal
    onClose();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // useEffect(() => {
    // Fetch Class List from API
    const fetchClassList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/class/getClassList`);
        setClassList(response.data.data);
      } catch (error) {
        console.error('Error fetching class list:', error);
      }finally {
        setLoading(false); // Stop loader
      };
    };
    // fetchClassList();

    // Fetch Exam Type List from API
    const fetchExamTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/examType/getExamTypeList`);
        setExamTypes(response.data.data);
      } catch (error) {
        console.error('Error fetching exam types:', error);
      }
    };
    // fetchExamTypes();

    // Fetch Subjects from API
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
        setSubjects(response.data.data); // Populate all subjects
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    // fetchSubjects();
  // }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.Monday`, // Replace with the correct dynamic day
  });

  const handleClassChange = (e) => {
    const selectedClassId = e.target.value;
    const selectedClass = classList.find((classItem) => classItem.id == selectedClassId);

    if (selectedClass) {
      setFilteredSubjects(subjects.filter((subject) => selectedClass.subject.includes(subject.id)));
    }

    // Reset form to reflect the selected class
    reset({ classId: selectedClassId, examTypeId: '', days: {} });
  };

  const handleTimeChange = (index, field, value) => {
    const otherField = field === 'timeFrom' ? 'timeTo' : 'timeFrom';
    const otherValue = getValues(`days.Monday.${index}.${otherField}`);
    
    if (field === 'timeFrom' && value && otherValue && value >= otherValue) {
      toast.error('Start time must be earlier than end time');
      setValue(`days.Monday.${index}.timeTo`, ''); 
      setValue(`days.Monday.${index}.duration`, ''); 
      return;
    }
  
    if (field === 'timeTo' && value && otherValue && otherValue >= value) {
      toast.error('Start time must be earlier than end time');
      setValue(`days.Monday.${index}.${field}`, ''); 
      setValue(`days.Monday.${index}.duration`, ''); 
      return;
    }
  
    if (field === 'timeFrom' || field === 'timeTo') {
      const startTime = field === 'timeFrom' ? value : otherValue;
      const endTime = field === 'timeTo' ? value : otherValue;
  
      if (startTime && endTime) {
        const duration = calculateDuration(startTime, endTime);
        setValue(`days.Monday.${index}.duration`, duration);
      }
    }
  };
  
  

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    
    const diff = end - start; // Difference in milliseconds
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data, 'data');
    // Transform data into the required payload format before sending to API
    const payload = {
      className: data.classId,
      examName: data.examTypeId,
      subjectWiseExamList: data.days.Monday.map((item) => ({
        examDate: item.examDate,
        subject: item.subject,
        startTime: item.timeFrom,
        endTime: item.timeTo,
        duration: item.duration,
        maxMarks: item.maxMarks,
        minMarks: item.minMarks,
      })),
    };
    console.log(payload,'payload')

    // Submit to API
    axios
      .post(`${BASE_URL}/exam/saveExam`, payload)
      .then((response) => {
        toast.success('Exam schedule saved successfully!');
    // Reset the form after submission
    reset();
    setFilteredSubjects([])
    setClassList([])

    // Close the modal after submission
    onClose();      })
      .catch((error) => {
        console.error('Error saving exam schedule:', error);
        toast.error('Failed to save exam schedule');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300 ease-in-out p-4">
                  <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      
      <div className="bg-white p-4 rounded-xl w-full max-w-4xl relative shadow-lg animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#042954]">Add Exam Schedule</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Fixed dropdowns for Class and Exam Type */}
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Class Dropdown */}
              <div>
                <label className="block text-sm font-semibold mb-1">Class</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  {...register('classId')}
                  onChange={handleClassChange} // Handle class change
                >
                  <option value="">Select Class</option>
                  {classList.map((classItem) => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name} - {classItem.section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold mb-1">Exam Type</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  {...register('examTypeId')}
                >
                  <option value="">Select Exam Type</option>
                  {examTypes.map((examType) => (
                    <option key={examType.id} value={examType.id}>
                      {examType.examTypeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-200 p-2 rounded-lg max-h-[60vh] overflow-y-auto"> {/* Scrollable Area */}
          <div className="mb-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Subject</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.subject`)}
                    >
                      <option value="" disabled>Select Subject</option>
                      {filteredSubjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Exam Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]}
                      {...register(`days.Monday.${index}.examDate`)}
                    />
                  </div>





                  <div>
                    <label className="block text-sm font-semibold mb-1">Start Time</label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.timeFrom`)}
                        onChange={(e) => {
                       setValue(`days.Monday.${index}.timeFrom`, e.target.value); 
                       handleTimeChange(index, 'timeFrom', e.target.value); 
                      }} 
                       />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">End Time</label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.timeTo`)}
                       onChange={(e) => {
                        setValue(`days.Monday.${index}.timeTo`, e.target.value); 
                        handleTimeChange(index, 'timeTo', e.target.value); 
                        }} 
                        />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Duration</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.duration`)}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Max Marks</label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.maxMarks`)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Min Marks</label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      {...register(`days.Monday.${index}.minMarks`)}
                    />
                  </div>

                  <div className="flex justify-center items-center mt-8">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <Button
              label='Add New Exam'
                onClick={() =>
                  append({
                    subject: '',
                    examDate: '',
                    timeFrom: '',
                    timeTo: '',
                    duration: '',
                    maxMarks: '',
                    minMarks: '',
                  })
                }
              >
                Add Exam
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} label='Cancel'></Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExamSchedule;
