
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable_components/Button";
import { toast} from "react-toastify";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import FutureDates from '../../../Reusable_components/FutureDates';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  '../../../Reusable_components/CkEditor.css';
import Loader from "../../../Reusable_components/Loader";

const AddLeave = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset , formState: { errors } } = useForm();

  const [editorData, setEditorData] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('')
  const [leaveTypeList , setLeaveTypeList] = useState([])
  const [selectedTeacher , setSelectedTeacher] = useState({})
  const user = JSON.parse(sessionStorage.getItem('user'))   
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchLeaveType() ;
      fetchClass() ;
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

  const fetchLeaveType = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves/getLeavesList`);
      setLeaveTypeList(response.data.data);
    } catch (error) {
      toast.error("Error fetching Leave Types");
    }
  };

  const fetchClass = async() => {
    try {
      const response = await axios.get(`${BASE_URL}/class/getClassList`);
      const userClass = response.data.data.find((cls) => cls.id === user.className[0])
      fetchTeacher(userClass?.primaryTeacher)
    } catch (error) {
      toast.error("Error fetching class!");
    }
  }

  const fetchTeacher =  async(id) => {
    try {
      console.log("fetch teacher" , id);
      
      const response = await axios.get(`${BASE_URL}/user/getUser/${id}`);
      setSelectedTeacher(response.data.data) ;
      console.log("teacher" , selectedTeacher);
      
    } catch (error) {
      toast.error("Error fetching teacher");
    }
  };


  const handleOnClose = () => {
    onClose() ;
    reset()
    setSelectedLeaveType('')
      setSelectedTeacher('') 
      setDropdownOpen(false)
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/leaves/applyLeaves`, {
        senderId: user.id,
        leaveAuthoriserId: parseInt(selectedTeacher?.id),
        rollOrEmployeeId: user.rollNumber,
        leaveType: parseInt(selectedLeaveType) , 
        leaveStartDate : data.leaveStartDate ,
        leaveEndDate: data.leaveEndDate ,
        leaveReason : editorData 
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Successfully added Leave Application");
      reset()
      setSelectedLeaveType('')
      setSelectedTeacher('') 
      setEditorData('')
      onClose();

    } catch (error) {
      toast.error("Error adding new Leave");
      console.error(error);
      reset()
      setSelectedLeaveType('')
      setSelectedTeacher('') 
      setEditorData('')
    }finally{
      setLoading(false); // Stop loader
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-800">
                  <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 py-2 rounded-lg w-full max-w-md relative">
        <button onClick={handleOnClose} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-2 text-center text-[#042954]">Add New Leave</h2>

          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name *</label>
            <input 
            type="text" 
            id="name" 
            value={user.firstName + " " + user.lastName} 
            className={`w-full rounded-lg border py-2 px-2`}
            readOnly/>
          </div>

          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name *</label>
            <input 
            type="text" 
            id="name" 
            value= {selectedTeacher ? selectedTeacher.firstName + " " + selectedTeacher.lastName : ''}
            className={`w-full rounded-lg border py-2 px-2`}
            readOnly/>
          </div>

          <div className="mb-2">
            <label htmlFor="leaveType" className="block text-gray-700 font-semibold mb-2">Leave Type *</label>
            <select  
              id="leaveType" 
              value={selectedLeaveType}
              className={`w-full ${errors.leaveType ? 'border-red-500' : 'border-gray-300'} rounded-lg border py-2 px-2`}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
            >
              <option value="">Select Leave Type</option>
              {leaveTypeList.map((leave) => (
                <option key={leave.id} value={leave.id}>{leave.leaveType}</option>
              ))}
            </select>
            {errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType.message}</p>}
          </div>

          <FutureDates 
          label={"Start Date"} 
          labelClass={"block text-gray-700 font-semibold mb-1"} 
          name={"leaveStartDate"}
          required={"true"}
          register={register}
          className={"border py-2 px-2 rounded-md mb-2"}
          />

        <FutureDates 
          label={"End Date"} 
          labelClass={"block text-gray-700 font-semibold mb-1"} 
          name={"leaveEndDate"}
          required={"true"}
          register={register}
          className={"border py-2 px-2 rounded-md mb-2"}
          />


    <div className="mb-2">
    <label htmlFor="leaveReason" className="block text-gray-700 font-semibold mb-2">Leave Reason *</label>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
          onReady={(editor) => {
            editor.ui.view.editable.element.style.minHeight = "100px";
        }}
        config={{
          toolbar: [
            'heading','bold', 'italic', 'underline', 'bulletedList', 'numberedList', 
            'link', 'blockQuote', 'undo', 'redo'
          ],
        }}

        />
        {errors.leaveReason && <p className="text-red-500 text-sm mt-1">{errors.leaveReason.message}</p>}
      </div>

          <Button type='submit' className='w-full text-center' label="Add Leave" />
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddLeave;
