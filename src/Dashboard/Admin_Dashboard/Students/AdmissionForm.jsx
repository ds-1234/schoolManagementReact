import React, {useState } from 'react';
import BasicDets from './AdmissionForm/BasicDets';
import AcademicDets from './AdmissionForm/AcademicDets';
import OfficeDets from './AdmissionForm/OfficeDets';
import TransportDets from './AdmissionForm/TransportDets';
import HostelDets from './AdmissionForm/HostelDets';
import DocsDets from './AdmissionForm/DocsDets';
import PrevSchlDets from './AdmissionForm/PrevSchlDets';
import { useStepContext } from '../../../hooks/StepContext';

function AdmissionForm() {
  const { currentStep, handleNextStep } = useStepContext();

  const renderStepComponent = () => {
    console.log(currentStep);
    
    switch (currentStep) {
      case 1:
        return <BasicDets />
      case 2:
        return <AcademicDets />
      case 3:
        return <OfficeDets  />
      case 4:
        return <TransportDets />
      case 5:
        return <HostelDets  />
      case 6:
        return <PrevSchlDets/>
      case 7:
        return <DocsDets/>
      default:
        return <BasicDets />
    }
  };
  
  return (
    <div className='h-full mb-10'>
    {renderStepComponent()}
    </div>
  );
}

export default AdmissionForm;
