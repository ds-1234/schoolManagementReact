
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

const AddLeave = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset , formState: { errors } } = useForm();

  const [editorData, setEditorData] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('')
  const [leaveTypeList , setLeaveTypeList] = useState([])
  const [admins , setAdmins] = useState([])
  const [selectedAdmin , setSelectedAdmin] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))   

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchLeaveType() ;
      fetchAdmins() ;
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

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      setAdmins(response.data.data.filter((tch) => ( tch.role === 2 && tch.isActive == true))) ;
      
    } catch (error) {
      toast.error("Error fetching teachers");
    }
  };


  const handleOnClose = () => {
    onClose() ;
    reset()
    setSelectedLeaveType('')
      setSelectedAdmin('') 
      setEditorData('')
      setDropdownOpen(false)
  }

  const onSubmit = async (data) => {
    try {
      await axios.post(`${BASE_URL}/leaves/applyLeaves`, {
        senderId: user.id,
        leaveAuthoriserId: parseInt(selectedAdmin),
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
      setSelectedAdmin('') 
      setEditorData('')
      onClose();

    } catch (error) {
      toast.error("Error adding new Leave");
      console.error(error);
      reset()
      setSelectedLeaveType('')
      setSelectedAdmin('') 
      setEditorData('')
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-800">
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
            <label htmlFor="Authority" className="block text-gray-700 font-semibold mb-2">Authority *</label>
            <select  
              id="Authority" 
              value={selectedAdmin}
              className={`w-full ${errors.leaveAuthoriserId ? 'border-red-500' : 'border-gray-300'} rounded-lg border py-2 px-2`}
              onChange={(e) => setSelectedAdmin(e.target.value)}
            >
              <option value="">Select Authority</option>
              {admins.map((auth) => (
                <option key={auth.id} value={auth.id}>{auth.firstName} {auth.lastName}</option>
              ))}
            </select>
            {errors.leaveAuthoriserId && <p className="text-red-500 text-sm mt-1">{errors.leaveAuthoriserId.message}</p>}
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
