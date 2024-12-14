import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../conf/conf';
import BasicDetails from './Teacher_Form/BasicDetails';
import Qualifications from './Teacher_Form/Qualifications';
import ExtraDets from './Teacher_Form/ExtraDets';
import HRDets from './Teacher_Form/HRDets';
import BankDets from './Teacher_Form/BankDets';
import HostelInfo from './Teacher_Form/HostelInfo';
import TransportInfo from './Teacher_Form/TransportInfo';
import Documents from './Teacher_Form/Documents';
// import Button from '../../../Reusable_components/Button';

function EditUser() {
  const location = useLocation();
  const { userId } = location.state || {};


  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName , setUserName] = useState('') ;
  const [stds , setStds] = useState([]) ;

useEffect(() => {
    axios.get(`${BASE_URL}/role/getRoleList`)
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
        const userData = response.data.data;
        setSelectedRole(userData.role);
        setUserName(userData.userId) ;
        if (userData.dateOfBirth === null && userData.role == 4) setCurrentStep(0);

        // Additional check for teacher info if role is 4
        if (userData.role == 4) {
          const res = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfo/${userId}`);
          const teacherInfo = res.data.data ;
          if (teacherInfo.maritalStatus === null) setCurrentStep(1);
          else if (teacherInfo.qualificationList.length === 0) setCurrentStep(2);
          else if (teacherInfo.aadhar === null) setCurrentStep(3);
          else if (teacherInfo.bankName === null) setCurrentStep(4);
          else if (userData.roomNumber === null) setCurrentStep(5);
          else if (userData.routeName === null) setCurrentStep(6);
          else setCurrentStep(7);
        }

        if(userData.role != 4){
          setCurrentStep(0) ;
        }
      } catch (error) {
        console.error("Error fetching user or teacher info:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (role) => {
    console.log(role);
    
    setSelectedRole(role); 
    setDropdownOpen(false);
    if(role == 4){
        setCurrentStep(0) ; 
    }
  };

  const handleNext = () => {
    if (selectedRole == 4 && currentStep < sections.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const sections = [
    { component: <BasicDetails handleNext={handleNext} handlePrevious={handlePrevious} currentStep={currentStep} selectedRole = {selectedRole} userId={userId}/>},
    {component: <ExtraDets   handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole}  /> } , 
    { component: <Qualifications  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole}  /> },
    { component: <HRDets  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} /> },
    { component: <BankDets  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} /> } ,
    {component : <HostelInfo handleNext={handleNext} handlePrevious={handlePrevious}  userName = {userName} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />},
    {component: <TransportInfo handleNext={handleNext} handlePrevious={handlePrevious}  userName = {userName} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />} ,
    {component: <Documents  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />}
  ];

  return (
    <div className=" mx-auto rounded-xl space-y-2 my-10">
      <h2 className="text-2xl font-bold text-[#042954]">Edit User</h2>
      <p> <NavLink to='/admin'>Dashboard</NavLink> /<NavLink to='/admin/activeUser'> Users / </NavLink> <span className='text-[#ffae01] font-semibold'>Edit User</span></p>

    <div className="bg-white rounded-lg w-full mb-10 p-10 mt-5">
        {/* Role Input */}
        <div className="mt-4 mb-5" hidden = {currentStep != 0}>
        <label htmlFor="role" className="block text-gray-900 font-semibold">Role <span className='text-red-700 font-bold'>*</span></label>

        <div
          className="border rounded-lg cursor-pointer  flex justify-between items-center md:w-1/2 w-full p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <p>{selectedRole ? roles.find(role => role.id === parseInt(selectedRole))?.name : "Select Role"}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        {dropdownOpen && (
          <div className="absolute z-10 bg-white border rounded-lg flex flex-col md:w-1/3 w-2/3 max-h-24 overflow-y-auto shadow-md">
            {roles.map(role => (
            <div
            key={role.id}
            className="p-2 pt-0 cursor-pointer hover:bg-gray-100"
            onClick={() => handleChange(role.id)}
          >
              {role.name}
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Render selected section */}
      <div className='mt-5'>{sections[currentStep].component}</div>

    </div>
      
    </div>
  );
}

export default EditUser;
