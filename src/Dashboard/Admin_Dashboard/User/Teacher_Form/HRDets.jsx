import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HRDets({ handlePrevious, handleNext, userId, currentStep, selectedRole }) {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
  const [teacherData , setTeacherData] = useState(null) ;
  const [documents , setDocuments] = useState([]) ;

  const aadharPath = documents.find(doc => doc.documentName === "Aadhar Card")?.attachmentPath || "";
  const panPath = documents.find(doc => doc.documentName === "Pan Card")?.attachmentPath || "";

  const uploadDocument = async (file, fileName) => {
    const formData = new FormData();
    
    
    const existingDocs = documents.find(doc => doc.documentName === fileName) ;
    formData.append('id' , existingDocs? existingDocs.id : null);
    formData.append('file', file);
    formData.append('filesName', fileName);

    try {
      const response = await axios.post(`${BASE_URL}/document/saveDocument/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Document uploaded successfully:");
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
    }
  };

  const onSubmit = async (data) => {
    try {
      // Save the teacher info
      const response = await axios.post(`${BASE_URL}/teacherInfo/createTeacherInfo`, {
        ...data,
        ...teacherData ,
        teacherId: userId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("User Updated Successfully!");

      // Upload the Aadhar and PAN card documents
      if (data.aadharFile[0]) await uploadDocument(data.aadharFile[0], 'Aadhar Card');
      if (data.panFile[0]) await uploadDocument(data.panFile[0], 'Pan Card');

      handleNext();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
        const data = response.data.data;
        setTeacherData(data) ;
        if (data) reset(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchDetails();

    const getDocuments = async () => {
      await axios({
        method: "GET" ,
        url: `${BASE_URL}/document/getDocument/${userId}` ,
        headers:{ 'Content-Type': 'application/json' }
      })
      .then((res) => {
        console.log(res.data.data);
        setDocuments(res.data.data);
      })
      .catch((err) => console.log("error in get Documents" , err));
    }
    getDocuments() ;
  }, [reset, userId]);

  const navigate = useNavigate();


  return (
    <div className='space-y-2 mb-5'>
      <h3 className="font-semibold text-gray-900 text-xl">HR Information</h3>
      <div className='grid grid-cols-2 gap-5'>
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="aadhar">Aadhar Card</label>
          <input
            type="text"
            id="aadhar"
            placeholder='Enter Aadhar Number'
            {...register('aadhar', { required: 'Aadhar Number is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {errors.aadhar && <span className="text-red-500 text-sm">{errors.aadhar.message}</span>}
          <input
            type="file"
            id="aadharFile"
            {...register('aadharFile', { required: !aadharPath && 'Aadhar Card is required' })}
            className="py-2 px-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          {aadharPath && <span className="text-sm text-blue-500">Current document: {aadharPath}</span>}
          {!aadharPath && errors.aadharFile && <span className="text-red-500 text-sm">{errors.aadharFile.message}</span>}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="pan">PAN Card</label>
          <input
            type="text"
            id="pan"
            placeholder='Enter Pan Card Number'
            {...register('pan', { required: 'Pan Card Number is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
          <input
            type="file"
            id="panFile"
            {...register('panFile', { required: !panPath && 'PAN Card is required' })}
            className="py-2 px-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          {panPath && <span className="text-sm text-blue-500">Current document: {panPath}</span>}
          {!panPath && errors.panFile && <span className="text-red-500 text-sm">{errors.panFile.message}</span>}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
          <button
            onClick={handleSubmit(onSubmit)}
            hidden={selectedRole !== 4}
            className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
          >
            Save & Continue
          </button>
          <Button onClick={() => navigate('/admin/pendingUser')} label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]' />
        </div>
      </div>
    </div>
  );
}

export default HRDets;
