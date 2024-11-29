import React, {useState , useEffect} from 'react';
import BasicDets from './AdmissionForm/BasicDets';
import AcademicDets from './AdmissionForm/AcademicDets';
import OfficeDets from './AdmissionForm/OfficeDets';
import TransportDets from './AdmissionForm/TransportDets';
import HostelDets from './AdmissionForm/HostelDets';
import DocsDets from './AdmissionForm/DocsDets';
import PrevSchlDets from './AdmissionForm/PrevSchlDets';
import { useStepContext } from '../../../hooks/StepContext';
import { useUserContext } from '../../../hooks/UserContext';
import axios from 'axios';
import BASE_URL from '../../../conf/conf';

function AdmissionForm() {
  const { currentStep, handleNextStep , setCurrentStep } = useStepContext();
  const {id} = useUserContext()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUser/${id}`);
        const userData = response.data.data;
        if (userData.dateOfBirth === null && userData.role == 3) setCurrentStep(0);

        // Additional check for student info if role is 3
        if (userData.role == 3) {
          const res = await axios.get(`${BASE_URL}/user/getStudentDetails/${userData.userId}`);
          const details = res.data.data ;
          if (details.school === null) {
            setCurrentStep(2);
          } else if (details.admissionDate === null) {
            setCurrentStep(3);
          } else if (details.routeName === null) {
            setCurrentStep(4);
          } else if (details.buildingName === null) {
            setCurrentStep(5);
          } else if (details.previousSchoolName === null) {
            setCurrentStep(6);
          }else if (details.isActive === null || details.isActive === false) {
            setCurrentStep(7);
          }
        }
      } catch (error) {
        console.error("Error fetching Student info:", error);
      }
    };
    fetchUserData();
  }, [id]);

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
