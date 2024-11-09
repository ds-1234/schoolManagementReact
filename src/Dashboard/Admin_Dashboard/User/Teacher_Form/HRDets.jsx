import React, { useEffect } from 'react';
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

  const uploadDocument = async (file, fileName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filesName', fileName);

    try {
      const response = await axios.post(`${BASE_URL}/document/saveDocument/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Document uploaded successfully:", response.data);
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
        teacherId: userId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("User Updated Successfully!");

      // Upload the Aadhar and PAN card documents
      if (data.aadharFile[0]) await uploadDocument(data.aadharFile[0], 'AadharCard');
      if (data.panFile[0]) await uploadDocument(data.panFile[0], 'PanCard');

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
        if (data) reset(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchDetails();
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
          <input
            type="file"
            id="aadharFile"
            {...register('aadharFile', { required: 'Aadhar Card is required' })}
            className="py-2 px-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          {errors.aadhar && <span className="text-red-500 text-sm">{errors.aadhar.message}</span>}
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
          <input
            type="file"
            id="panFile"
            {...register('panFile', { required: 'PAN Card is required' })}
            className="py-2 px-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
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
