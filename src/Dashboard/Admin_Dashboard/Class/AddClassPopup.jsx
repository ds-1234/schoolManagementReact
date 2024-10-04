import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable_components/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AddClassPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset , formState: { errors } } = useForm();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchSubjects();
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

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/subject/getSubjectList');
      setSubjects(response.data.data);
    } catch (error) {
      toast.error("Error fetching subjects");
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

  const onSubmit = async (data) => {
    const subjectDetails = selectedSubjects.map(id => {
      console.log(subjects , id);
      
      const subject = subjects.find(sub => sub.id === id);
      return subject.id
    });

    try {
      await axios.post('http://localhost:8080/class/createClass', {
        name: data.name,
        section: data.section,
        subject: subjectDetails,
        isActive: true 
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Successfully added class");
      reset()
      setSelectedSubjects([])
      setSubjects([])
      onClose();

    } catch (error) {
      toast.error("Error adding new class");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Class</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <Input type="text" id="name" className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`} {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="section" className="block text-gray-700 font-semibold mb-2">Section</label>
            <Input type="text" id="section" className={`w-full ${errors.section ? 'border-red-500' : 'border-gray-300'} rounded-lg`} {...register('section', { required: 'Section is required' })} />
            {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>}
          </div>

          {/* Subject Input */}
          <div className="mb-4 relative">
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
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
      <ToastContainer />
    </div>
  );
};

export default AddClassPopup;
