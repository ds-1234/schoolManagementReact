import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable_components/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import down from "./arrow drop down.png";

const AddClassPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);


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
        const response = await axios.get('http://localhost:8080/subject/getSubjectList');
        setSubjects(response.data.data);
      } catch (error) {
        toast.error("Error fetching subjects");
      }
    };
    
    fetchSubjects();
  }, []);

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
      const subject = subjects.find(sub => sub.id === id);
      return {
        id: subject.id,
        subject: subject.subject,
        description: subject.description // Assuming description is available
      };

    }, [isOpen, onClose]);

    useEffect(() => {
        const fetchSubjects = async () => {
        axios({
            method:"get",
            url : `http://localhost:8080/subject/getSubjectList`,
            // data: formData,
            
            headers: {
              "Content-Type": "application/json",
            },
        
          })
          .then((response)=>{
              console.log('response' , response.data)
              setSubjects(response.data.data);
            // toast.success("Successfully fetched subjects");
            onClose(); 
        })
        .catch(err=>{
            console.log(err,'error:')
            // toast.error("Error to fetched subject");
            onClose();
        })

        };
    
        fetchSubjects();
      }, []);
  
  
    const onSubmit = async (data) => {
        const selectedSubject = subjects.find(subject => subject.id === parseInt(data.subject));
        // const formData = {
        //   name: data.name,
        //   section: data.section,
        //   subject: selectedSubject // Sending the selected subject object
        // };

      axios({
          method:"post",
          url : `http://localhost:8080/class/createClass`,
          data: {
            name: data.name,
            section: data.section,
            subject: [selectedSubject]
          },
          
          headers: {
            "Content-Type": "application/json",
          },
      
        })
        .then((response)=>{
          console.log('response' , response.data)
          toast.success("Successfully Add class");
          onClose(); 
      })
      .catch(err=>{
          console.log(err,'error:')
          toast.error("Error to add new class");
          onClose();
      })
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
              <span>{selectedSubjects.length === 0 ? 'Select subjects' : selectedSubjects.map(id => subjects.find(sub => sub.id === id)?.subject).join(', ')}</span>
              <img 
                src={dropdownOpen ? {down} : '/images/dropdown-arrow.png'} 
                alt="Dropdown Arrow"
                className="w-4 h-4 ml-2"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1">
                {subjects.map(subject => (
                  <label key={subject.id} className="block px-4 py-2 hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleCheckboxChange(subject.id)}
                    />
                    {subject.subject}
                  </label>
                ))}
              </div>
            )}
          </div>


          <Button type='submit' className='w-full text-center' />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddClassPopup;
