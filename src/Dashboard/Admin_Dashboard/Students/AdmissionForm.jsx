import React, {useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProgressIndicator from './AdmissionForm/ProgressIndicator';
import BasicDets from './AdmissionForm/BasicDets';
import AcademicDets from './AdmissionForm/AcademicDets';
import OfficeDets from './AdmissionForm/OfficeDets';
import TransportDets from './AdmissionForm/TransportDets';
import HostelDets from './AdmissionForm/HostelDets';
import DocsDets from './AdmissionForm/DocsDets';
import PrevSchlDets from './AdmissionForm/PrevSchlDets';


function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep+1) ;
    console.log(currentStep);
    
  };
  

  // const handlePreviousStep = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  const renderStepComponent = () => {
    console.log(currentStep);
    
    switch (currentStep) {
      case 1:
        return <BasicDets handleNextStep={handleNextStep} currentStep={currentStep} />
      case 2:
        return <AcademicDets handleNextStep={handleNextStep} currentStep={currentStep} />
      case 3:
        return <OfficeDets handleNextStep={handleNextStep} currentStep={currentStep} />
      case 4:
        return <TransportDets handleNextStep={handleNextStep} currentStep={currentStep}/>
      case 5:
        return <HostelDets handleNextStep={handleNextStep} currentStep={currentStep} />
      case 6:
        return <DocsDets handleNextStep={handleNextStep} currentStep={currentStep} />
      case 7:
        return <PrevSchlDets handleNextStep={handleNextStep} currentStep={currentStep} />
      default:
        return <BasicDets handleNextStep={handleNextStep} currentStep={currentStep} />
    }
  };
  
  return (
    <div className='h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>

    <ProgressIndicator currentStep={currentStep}/>
    {renderStepComponent()}
    </div>
  );
}

export default AdmissionForm;
