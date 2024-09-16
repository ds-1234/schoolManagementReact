import { Input, Select } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable_components/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddClassPopup = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [subjects, setSubjects] = useState([]); // Store subjects fetched from the API

    useEffect(() => {
      // Disable scrolling on background when the popup is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      // Add event listener for ESC key press
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto'; // Clean up scrolling style
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
            toast.error("Error to fetched subject");
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
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
         <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className=""
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add New Class</h2>
  
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <Input
              type="text"
              id="name"
              className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('name', { required: ' Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Section Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Section</label>
            <Input
              type="text"
              id="section"
              className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('section', { required: ' Section is required' })}
            />
            {errors.section && <p className="text-red-500 text-sm mt-1">{errors.section.message}</p>}
          </div>
  
          {/* Subject Input */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>

            <select
              id="subject"
              className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              {...register('subject', { required: 'Subject is required' })}
            >
                        <option value="" disabled>Select a subject</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.subject} 
            </option>
          ))}
            </select>
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>
  
          {/* Submit Button */}
          <Button 
          // onClick={handleSubmit}
          type='submit'

          className='w-full text-center'
          // label={"Add new Class"}
          />
        </form>
        </div>
        <ToastContainer/>
      </div>
    );
  };
  
  export default AddClassPopup;
  