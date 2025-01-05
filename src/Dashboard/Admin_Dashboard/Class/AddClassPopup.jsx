import { Input } from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable_components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from "../../../conf/conf";
import Loader from "../../../Reusable_components/Loader";


const AddClassPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
    const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchSubjects();
      fetchTeachers();
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Close the dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subject/getSubjectList`);
      setSubjects(response.data.data);
    } catch (error) {
      toast.error("Error fetching subjects");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      setTeachers(response.data.data.filter((tch) => (tch.role === 4 && tch.isActive == true)));
    } catch (error) {
      toast.error("Error fetching teachers");
    }
  };

  const handleCheckboxChange = (subjectId) => {
    setSelectedSubjects((prevSelected) => {
      if (prevSelected.includes(subjectId)) {
        return prevSelected.filter(id => id !== subjectId);
      } else {
        return [...prevSelected, subjectId];
      }
    });
  };

  const handleOnClose = () => {
    onClose();
    reset()
    setSelectedSubjects([])
    setSelectedTeacher('')
    setDropdownOpen(false)
  }

  const onSubmit = async (data) => {
    setLoading(true); // Start loader
    const subjectDetails = selectedSubjects.map(id => {
      const subject = subjects.find(sub => sub.id === id);
      return subject.id
    });

    try {
      await axios.post(`${BASE_URL}/class/createClass`, {
        name: data.name,
        section: data.section,
        subject: subjectDetails,
        primaryTeacher: parseInt(selectedTeacher),
        isActive: true
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Successfully added class");
      reset()
      setSelectedSubjects([])
      setSelectedTeacher('')
      setSubjects([])
      onClose();

    } catch (error) {
      toast.error("Error adding new class");
      console.error(error);
      reset()
      setSelectedSubjects([])
      setSelectedTeacher('')
    }finally {
      setLoading(false); // Stop loader
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={handleOnClose} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Class</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name  <span className='text-red-700 font-bold'>*</span></label>
            <Input type="text" id="name" className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`} {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="section" className="block text-gray-700 font-semibold mb-2">Section  <span className='text-red-700 font-bold'>*</span></label>
            <Input type="text" id="section" className={`w-full ${errors.section ? 'border-red-500' : 'border-gray-300'} rounded-lg`} {...register('section', { required: 'Section is required' })} />
            {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="classTeacher" className="block text-gray-700 font-semibold mb-2">Class Teacher</label>
            <select
              id="classTeacher"
              value={selectedTeacher}
              className={`w-full ${errors.primaryTeacher ? 'border-red-500' : 'border-gray-300'} rounded-lg border py-2 px-2`}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers.map((tch) => (
                <option key={tch.id} value={tch.id}>{tch.firstName} {tch.lastName}</option>
              ))}
            </select>
            {errors.primaryTeacher && <p className="text-red-500 text-sm mt-1">{errors.primaryTeacher.message}</p>}
          </div>

          {/* Subject Input */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject  <span className='text-red-700 font-bold'>*</span> </label>
            <div
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>{selectedSubjects.length === 0 ? 'Select subjects' : selectedSubjects.map(id => subjects.find(sub => sub.id === id)?.subject).join(', ')}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full">
                {subjects.map(subject => (
                  <label key={subject.id} className="px-4 py-2 hover:bg-gray-100 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleCheckboxChange(subject.id)}
                      className="mr-2"
                    />
                    {subject.subject}
                  </label>
                ))}
              </div>
            )}
          </div>

          <Button type='submit' className='w-full text-center' label="Add Class" />
        </form>
      </div>
    </div>
  );
};

export default AddClassPopup;
