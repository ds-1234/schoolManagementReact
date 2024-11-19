import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Button from "../../../../Reusable_components/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from "../../../../conf/conf";

const AddExamResult = ({ isOpen, onClose }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchData();
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        reset();
        setClasses([]);
        setFilteredStudents([]);
        setFilteredSubjects([])
        setSelectedClassId(null)
        setSelectedSubjectId(null)
        setSelectedStudentId(null)
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const fetchData = async () => {
    try {
      const studentResponse = await axios.get(`${BASE_URL}/user/getUserList`);
      const classResponse = await axios.get(`${BASE_URL}/class/getClassList`);
      const subjectResponse = await axios.get(`${BASE_URL}/subject/getSubjectList`);

      setStudents(studentResponse.data.data);
      setClasses(classResponse.data.data);
      setSubjects(subjectResponse.data.data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  // Filter subjects based on the selected class
  useEffect(() => {
    if (selectedClassId) {
      // Find the selected class
      const selectedClass = classes.find((cls) => cls.id === selectedClassId);

      if (selectedClass && selectedClass.subject) {
        // Filter subjects based on the subjects available for the selected class
        const filteredSubjects = subjects.filter(subject => 
          selectedClass.subject.includes(subject.id)
        );
        setFilteredSubjects(filteredSubjects);
        console.log(filteredSubjects,'filteredSubjects')
      }
    }
  }, [selectedClassId, classes,]);

  useEffect(() => {
    if (selectedClassId && selectedSubjectId) {
console.log(students,'students')
    //   const filtered = students
    //     .filter(student => student.role === 3) // Filter by students
    //     // .filter(student => student.className && student.className.id === selectedClassId) // Filter by selected class
    //     .filter(student => student.className && student.className.some(classItem => classItem.id === selectedClassId)) // Filter by selected class
    //     // .filter(student => student.subjects && student.subjects.some(subject => subject.id === selectedSubjectId));
        console.log(selectedClassId,'stdselectedClassId')
        console.log(selectedSubjectId,'stdselectedSubjectId')
        
        const filtered = students.filter(student => {
            return student.role === 3 && Array.isArray(student.className) && student.className.includes(selectedClassId);
        });
        console.log(filtered,'stdfiltered')

      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [students, selectedClassId, selectedSubjectId]);

  const handleClassChange = (classId) => {
    setSelectedClassId(classId);
    setClassDropdownOpen(false); // Close class dropdown after selection
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubjectId(subjectId);
    setSubjectDropdownOpen(false); // Close subject dropdown after selection
  };
  const handleStudentChange = (studentId) => {
    setSelectedStudentId(studentId);
    setStudentDropdownOpen(false); // Close subject dropdown after selection
  };

  

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter(id => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSubmitExamResults = async (data) => {
    console.log(selectedClassId,selectedSubjectId,selectedStudentId,'class,sub,std')
    try {
      const payload = {
        teacherid:user.id,
        className: selectedClassId,
        subject: selectedSubjectId,
        studentId: selectedStudentId,
        subjectMarks: data.marks,
        remarks: data.review,
        isActive:true
      };
      console.log(payload,'payload')

      await axios.post(`${BASE_URL}/exam/saveExamResult`, payload);
      toast.success("Exam results submitted successfully");
      reset();
      setClasses([]);
      setFilteredStudents([]);
      setFilteredSubjects([])
      setSelectedClassId(null)
      setSelectedSubjectId(null)
      setSelectedStudentId(null)
      onClose();
    } catch (error) {
      toast.error("Error submitting exam results");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>
        <form onSubmit={handleSubmit(handleSubmitExamResults)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Exam Results</h2>

          {/* Class Dropdown */}
          <div className="mb-4 relative">
            <label htmlFor="classDropdown" className="block text-gray-700 font-semibold mb-2">Select Class</label>
            <div 
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => {
                setClassDropdownOpen((prev) => !prev);
                setSubjectDropdownOpen(false); // Close subject dropdown if class is opened
                setStudentDropdownOpen(false); // Close subject dropdown if class is opened
              }}
            >
              <p>{selectedClassId ? classes.find(c => c.id === selectedClassId)?.name : "Select Class"}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {classDropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 w-full flex flex-col z-50">
                {classes.map(classItem => (
                  <div 
                    key={classItem.id} 
                    onClick={() => handleClassChange(classItem.id)} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {classItem.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subject Dropdown */}
          <div className="mb-4 relative">
            <label htmlFor="subjectDropdown" className="block text-gray-700 font-semibold mb-2">Select Subject</label>
            <div 
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => {
                setSubjectDropdownOpen((prev) => !prev);
                setClassDropdownOpen(false); // Close class dropdown if subject is opened
                setStudentDropdownOpen(false); // Close class dropdown if subject is opened
              }}
            >
              <p>{selectedSubjectId ? filteredSubjects.find(s => s.id === selectedSubjectId)?.subject : "Select Subject"}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {subjectDropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 w-full flex flex-col z-50">
                {filteredSubjects.map(subject => (
                  <div 
                    key={subject.id} 
                    onClick={() => handleSubjectChange(subject.id)} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {subject.subject}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display Filtered Students */}
          {/* {filteredStudents.length > 0 ? (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Students</h3>
              {filteredStudents.map((student) => (
                <div key={student.id} className="mb-2 p-2 border rounded-lg flex justify-between items-center">
                  <div>{student.firstName}</div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Marks"
                      {...register(`marks[${student.id}]`)}
                      className="w-24"
                    />
                    <Input
                      type="text"
                      placeholder="Review"
                      {...register(`review[${student.id}]`)}
                      className="w-24"
                    />
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentSelect(student.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No students found for the selected class and subject.</p>
          )} */}

                    {/* Student Dropdown */}
                    <div className="mb-4 relative">
            <label htmlFor="subjectDropdown" className="block text-gray-700 font-semibold mb-2">Select Student</label>
            <div 
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
              onClick={() => {
                setStudentDropdownOpen((prev) => !prev);
                setClassDropdownOpen(false); // Close class dropdown if subject is opened
                setSubjectDropdownOpen(false); // Close class dropdown if subject is opened
              }}
            >
              <p>{selectedStudentId ? filteredStudents.find(s => s.id === selectedStudentId)?.firstName : "Select Student"}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {studentDropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 w-full flex flex-col z-50">
                {filteredStudents.map(student => (
                  <div 
                    key={student.id} 
                    onClick={() => handleStudentChange(student.id)} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {student.firstName}
                  </div>
                ))}
              </div>
            )}
          </div>

                    {/* Exam Marks */}
                    <div className="mb-4">
            <label htmlFor="marks" className="block text-gray-700 font-semibold mb-2">Exam Marks</label>
            <input
              id="marks"
              type="number"
              {...register("marks", { required: "Marks are required" })}
              className="border rounded-lg p-2 w-full"
              min="0"
            />
            {errors.marks && <span className="text-red-500 text-sm">{errors.marks.message}</span>}
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label htmlFor="review" className="block text-gray-700 font-semibold mb-2">Remarks</label>
            <textarea
              id="review"
              {...register("review", { required: "Review is required" })}
              className="border rounded-lg p-2 w-full"
              rows="4"
            />
            {errors.review && <span className="text-red-500 text-sm">{errors.review.message}</span>}
          </div>


          <Button type="submit" className="w-full text-center" label="Submit Results" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddExamResult;



