import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { useNavigate } from 'react-router-dom';

const AddExamType = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

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

  // const navigate = useNavigate()

//   const onSubmit = (data) => {
//     axios({
//         method:"POST",
//         url : `http://localhost:8080/subject/createSubject`,
//         data: {
//             subject : data.subject ,
//             description : data.description 
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
    
//       })
//       .then((response)=>{
//         console.log('response' , response.data)
//         toast.success("Successfully Add Subject");
//         reset()
//         onClose(); 
//     })
//     .catch(err=>{
//         console.log(err,'error:')
//         toast.error("Error to add new Subject");
//         onClose();
//     })
//   }

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
        // onSubmit={handleSubmit(onSubmit)} 
        className=""
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Exam</h2>

        {/* Exam Name Input */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Exam Name</label>
          <input
            type="text"
            id="subject"
            className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register('subject', { required: 'Subject name is required' })}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>

        {/* Exam Date Input */}
        <div className="flex flex-col mb-5 px-1 w-1/2 rounded-lg bg-gray-100">
              {/* <label htmlFor="Dtae">Exam Date  *</label>
              <input
                type="date"
                id="date"
                className={`py-1 px-3 mb-5 rounded-lg bg-gray-100 border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>} */}
                  <label htmlFor="Dtae" className="block text-gray-700 font-semibold mb-2">Exam Date  *</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
    <DatePicker
      //  className={`py-1 px-3 mb-5 rounded-lg bg-gray-100 border ${errors.date ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}   
      label = 'Select Date'
       {...register('date', { required: 'Date is required' })}
       id="date"

       />
  </LocalizationProvider>
            </div>

        {/* Submit Button */}
        <Button 
        type='submit'
        className='w-full text-center'
        // label={"Add new Exam Type"}
        />
      </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddExamType;
