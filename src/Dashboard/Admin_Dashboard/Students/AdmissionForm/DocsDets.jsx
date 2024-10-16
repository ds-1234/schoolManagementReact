import React from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';

function DocsDets() {
  const { currentStep, handleNextStep } = useStepContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleFileChange = (event, documentName) => {
      const file = event.target.files[0];
      console.log(`File for ${documentName}: `, file);
    };

    const columns = [
      {
        name: 'SR.No',
        selector: (row, index) => index + 1, // Display the row number starting from 1
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
      { documentName: 'Student Photo', onFileChange: handleFileChange  , field: 'photo'},
      { documentName: 'Transfer Certificate', onFileChange: handleFileChange , field: 'transferCertificate'},
      { documentName: 'ID Proof', onFileChange: handleFileChange , field: 'idProof'},
    ];
    
    
    

    const navigate = useNavigate()
    const onSubmit = (data) => {
      console.log(data);
      if (handleNextStep) {
        handleNextStep();
      } else {
        console.error("handleNextStep is not defined");
      }
    };
  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>

      <ProgressIndicator currentStep={currentStep} />
         <h2 className="col-span-4  mt-8 text-xl font-semibold text-black">Documents Required</h2>
         <form onSubmit={handleSubmit(onSubmit)} >

          <Table 
          columns={columns}
          data={documentEntries}
          className={"hidden"}
          />

          <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin/allStudents')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
        </form>
    </div>
  )
}

export default DocsDets