import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function EditClass({ isOpen, onClose, GradeId, onSuccess }) {
  const [grade, setGrade] = useState({ name: '', section: '', subject: [] });
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
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
    axios.get('http://localhost:8080/subject/getSubjectList')
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => {
        toast.error('Error fetching subjects');
      });
  }, []);

  useEffect(() => {
    if (GradeId) {
      axios.get(`http://localhost:8080/class/getClass/${GradeId}`)
        .then((response) => {
          const classData = response.data.data;
          setGrade(classData);
          setSelectedSubjects(classData.subject.map(sub => sub.id)); // Pre-check subjects from API
        })
        .catch((error) => {
          console.error('Error fetching class:', error);
        });
    }
  }, [GradeId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: value });
  };

  const handleCheckboxChange = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter(subjectId => subjectId !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the subject array in the required format
    const selectedSubjectObjects = selectedSubjects.map(id => {
      const subjectData = subjects.find(sub => sub.id === id);
      return {
        id: subjectData.id,
        subject: subjectData.subject,
        description: subjectData.description
      };
    });

    axios({
      method: 'post',
      url: `http://localhost:8080/class/updateClass`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: `{$GradeId}`,
        ...grade,
        subject: selectedSubjectObjects, // Pass selected subjects in the required format
      },
    })
      .then((response) => {
        toast.success('Class updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to update class.');
        console.error('Error updating class:', error);
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center"
          />
        </form>
      </div>
    </div>
  );
}

export default EditClass;
