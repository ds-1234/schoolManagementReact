import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';

function EditClass({ isOpen, onClose, GradeId, onSuccess }) {
  const [grade, setGrade] = useState({ name: '', section: '', subject: '' });
  const [subjects, setSubjects] = useState([]);

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

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/subject/getSubjectList`);
        setSubjects(response.data.data);
      } catch (error) {
        toast.error("Error fetching subjects");
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (GradeId) {
      axios.get(`http://localhost:8080/class/getClass/${GradeId}`)
        .then(response => {
          setGrade(response.data.data);
        })
        .catch(error => {
          console.error("Error fetching Class:", error);
        });
    }
  }, [GradeId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT", // Use PUT method for updating resources
      url: `http://localhost:8080/class/updateClass/${GradeId}`, // Changed URL to reflect update
      headers: {
        "Content-Type": "application/json",
      },
      data: grade,
    })
      .then((response) => {
        console.log("Class updated:", response.data);
        toast.success("Class updated successfully!");
        onSuccess();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating Class:", error);
        toast.error('Failed to update Class.');
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

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Class</h2>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={grade.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter class name"
              required
            />
          </div>

          {/* Section Input */}
          <div className="mb-4">
            <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={grade.section}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter section"
              required
            />
          </div>

          {/* Subject Input */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
            <select
              id="subject"
              name="subject"
              value={grade.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <Button 
            type='submit'
            className='w-full text-center'
          />

        </form>
      </div>
    </div>
  );
}

export default EditClass;