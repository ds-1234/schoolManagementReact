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

function EditUser() {
  const location = useLocation();
  const { userId } = location.state || {};


  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
useEffect(() => {
    axios.get(`${BASE_URL}/role/getRoleList`)
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/user/getUser/${userId}`, // API to get specific user by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const userData = response.data.data ;
        setSelectedRole(userData.role)

        if(userData.fatherName == null){
          setCurrentStep(0) ;
        }else if(userData.martialStatus == null){
          setCurrentStep(1) ;
        }else if(userData.qualificationList.course == null){
          setCurrentStep(2) ;
        }else if(userData.aadhar == null){
          setCurrentStep(3) ;
        }else if(userData.bankName == null){
          setCurrentStep(4) ;
        }else if(userData.buildingName == null){
          setCurrentStep(5) ;
        }else if(userData.routeName == null){
          setCurrentStep(6) ;
        }else{
          setCurrentStep(7) ;
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
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
    { component: <BasicDetails handleNext={handleNext} handlePrevious={handlePrevious} currentStep={currentStep} selectedRole = {selectedRole}  userId={userId}/>},
    {component: <ExtraDets   handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole}  /> } , 
    { component: <Qualifications  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole}  /> },
    { component: <HRDets  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} /> },
    { component: <BankDets  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} /> } ,
    {component : <HostelInfo handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />},
    {component: <TransportInfo handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />} ,
    {component: <Documents  handleNext={handleNext} handlePrevious={handlePrevious} userId={userId} currentStep={currentStep} selectedRole = {selectedRole} />}
  ];

  return (
    <div className=" mx-auto rounded-xl space-y-2 my-10">
      <h2 className="text-2xl font-bold text-[#042954]">Edit User</h2>
      <p>Dashboard / <NavLink to='/admin'>Admin</NavLink> / <span className='text-[#ffae01] font-semibold'>Edit User</span></p>

    <div className="bg-white rounded-lg w-full mb-10 p-10 mt-5">
        {/* Role Input */}
        <div className="mt-4 mb-5" hidden = {currentStep != 0}>
        <label htmlFor="role" className="block text-gray-900 font-semibold">Role</label>

        <div
          className="border rounded-lg cursor-pointer  flex justify-between items-center w-1/2 p-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <p>{selectedRole ? roles.find(role => role.id === parseInt(selectedRole))?.name : "Select Role"}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        {dropdownOpen && (
          <div className="absolute bg-white border rounded-lg flex flex-col w-1/3 overflow-y-scroll h-24">
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
