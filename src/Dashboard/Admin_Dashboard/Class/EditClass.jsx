import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../conf/conf';
import Loader from '../../../Reusable_components/Loader';


function EditClass({ isOpen, onClose, GradeId, onSuccess }) {
  const [grade, setGrade] = useState({ name: '', section: '', subject: [] });
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [teachers , setTeachers] = useState([])
  const [selectedTeacher , setSelectedTeacher] = useState('')
  const [loading, setLoading] = useState(false);
  

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
    axios.get(`${BASE_URL}/subject/getSubjectList`)
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => {
        toast.error('Error fetching subjects');
      });
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      setTeachers(response.data.data.filter((tch) => (tch.role === 4 && tch.isActive == true))) ;
      
    } catch (error) {
      toast.error("Error fetching teachers");
    }
  };

  useEffect(() => {
    if (GradeId) {
      axios.get(`${BASE_URL}/class/getClass/${GradeId}`)
        .then((response) => {
          const classData = response.data.data;
          setGrade(classData);
          console.log(classData.subject);
          setSelectedTeacher(classData.primaryTeacher) ;
          setSelectedSubjects(classData.subject); // Pre-check subjects from API
        })
        .catch((error) => {
          console.error('Error fetching class:', error);
        });
    }

    fetchTeachers()
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
    setLoading(true); // Start loader
    // Construct the subject array in the required format
    const selectedSubjectObjects = selectedSubjects.map(id => {
      const subjectData = subjects.find(sub => sub.id === id);
      return subjectData.id
    });

    axios({
      method: 'post',
      url: `${BASE_URL}/class/createClass`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: `${GradeId}`,
        ...grade,
        primaryTeacher: parseInt(selectedTeacher) ,
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
      }).finally(()=> {
        setLoading(false); // Stop loader
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative py-5 px-5 ">
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

          <div className="mb-4">
            <label htmlFor="classTeacher" className="block text-gray-700 font-semibold mb-2">Class Teacher</label>
            <select  
              id="classTeacher" 
              value={selectedTeacher}
              className={`w-full rounded-lg border py-2 px-2`}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers.map((tch) => (
                <option key={tch.id} value={tch.id}>{tch.firstName} {tch.lastName}</option>
              ))}
            </select>
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
