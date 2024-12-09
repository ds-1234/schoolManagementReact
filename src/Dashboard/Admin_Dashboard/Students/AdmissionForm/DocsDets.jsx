import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../../conf/conf';
import axios from 'axios';
import { useUserContext } from '../../../../hooks/UserContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function DocsDets() {
  const { id } = useUserContext();
  const { currentStep, handlePrevStep } = useStepContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const [files, setFiles] = useState({});

  const handleFileChange = (event, documentName) => {
    const file = event.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [documentName]: file,
    }));
    console.log(`File for ${documentName}: `, file);
  };

  const columns = [
    {
      name: 'SR.No',
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: 'Document Name',
      selector: (row) => row.documentName,
      sortable: false,
    },
    {
      name: 'Upload Document',
      cell: (row) => (
        <input
          type="file"
          {...register(row.field)}
          onChange={(e) => row.onFileChange(e, row.documentName)}
          className="border border-gray-300 rounded p-1"
        />
      ),
      sortable: false,
    },
  ];

  const documentEntries = [
    { documentName: 'Student Photo', onFileChange: handleFileChange, field: 'photo' },
    { documentName: 'Transfer Certificate', onFileChange: handleFileChange, field: 'transferCertificate' },
    { documentName: 'ID Proof', onFileChange: handleFileChange, field: 'idProof' },
  ];

  const uploadDocuments = async () => {
    for (const [documentName, file] of Object.entries(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filesName', documentName);
      formData.append('moduleName' , documentName) ;
      formData.append('moduleId' , 0)

      try {
        await axios.post(`${BASE_URL}/document/saveDocument/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(`Document ${documentName} uploaded successfully.`);
      } catch (error) {
        console.error(`Error uploading ${documentName}:`, error);
        throw new Error(`Failed to upload ${documentName}`);
      }
    }
  };

  const fetchUserDetailsAndUpdate = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUser/${id}`);
      const userData = {
        ...res.data.data , 
        isActive : true 
      }

      axios.post(`${BASE_URL}/user/updateUser` , userData);
      console.log("User updated successfully");
      toast.success('Documents and user data updated successfully!');
      navigate('/admin/activeUser');
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user details!");
    }
  };

  const onSubmit = async () => {
    try {
      await uploadDocuments();
      await fetchUserDetailsAndUpdate();
    } catch (error) {
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className='mt-2'><NavLink to='/admin'> Dashboard </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span></p>

      <ProgressIndicator currentStep={currentStep} />
      <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Documents Required</h2>

      <Table 
        columns={columns}
        data={documentEntries}
        className={"hidden"}
      />

      <div className='flex justify-between items-center'>
        <button onClick={() => handlePrevStep()}>
          <h1 className='mt-6 font-semibold text-medium cursor-pointer'>
            <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
            Back
          </h1>
        </button>
        <div className="col-span-2 flex justify-end space-x-4 mt-5">
          <Button type='submit' label="Submit" onClick={handleSubmit(onSubmit)} />
          <Button onClick={() => {
            reset();
            navigate('/admin/allStudents');
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default DocsDets;
