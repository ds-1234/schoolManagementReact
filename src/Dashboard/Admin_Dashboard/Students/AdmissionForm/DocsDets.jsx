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
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function DocsDets() {
  const { id , userId} = useUserContext();
  const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  // State to hold the files
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

  const onSubmit = async () => {
    const formData = new FormData();
    
    // Append files to formData
    Object.keys(files).forEach((key) => {
      formData.append('files', files[key]);
    });

    // formData.append('id' , userId) ;

    try {
      const response = await axios.post(`${BASE_URL}/document/saveDocument/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Docs submitted: ", response);
      toast.success('Form Uploaded Successfully!')
      navigate('/admin/allStudents')
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to Upload Docs!");
    }
  };

  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>Dashboard /<NavLink to='/admin'> Admin </NavLink>/ <NavLink to='/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>

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
            <Button type='submit' label="Submit" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
    </div>
      <ToastContainer/>
    </div>
  );
}

export default DocsDets;
