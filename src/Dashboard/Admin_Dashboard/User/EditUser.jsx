import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {useForm , useFieldArray} from 'react-hook-form';
import DatePicker from '../../../Reusable_components/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown , faTrashCan} from '@fortawesome/free-solid-svg-icons';
import SelectDropdown from '../../../Reusable_components/SelectDropdown';
import BASE_URL from '../../../conf/conf';

function EditUser() {
  const location = useLocation();
  const { userId } = location.state || {};
  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      qualifications: [{ degree: "", institution: "", yearOfPassing: "" }],
      workExperiences: [{ companyName: "", designation: "", joining: "" , relieving: ""  }],
    },
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: 'qualifications',
  });

  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: 'workExperiences',
  });


  const [toggleValue, setToggleValue] = useState(true);
  const [roles , setRoles] = useState([]) ;
  const [selectedRole, setSelectedRole] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const [dropdownIsVisible , setDropdownIsVisible] = useState(false)
  const [hostels , setHostels] = useState([])
  const [hostelRoom , setHostelRoom] = useState([])
  const [transports , setTransports] = useState([])
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [selectedRoute, setSelectedRoute] = useState('')

  useEffect(() => {
    const fetchRoles = async() =>{
      axios({
        method:"GET" , 
        url:`${BASE_URL}/role/getRoleList` , 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setRoles(res.data.data) ;
      })
      .catch(err => {
        console.log(err , 'error:');
      })
    }

    fetchRoles() ;

  const fetchHostelOptions = () => {
      axios({
        method: "GET",
        url: `${BASE_URL}/hostel/getHostelList`,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then((response) => {
          setHostels(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const fetchData = () => {
      axios({
        method: "GET",
        url: `${BASE_URL}/hostelRooms/getHostelRoomsList`,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then((response) => {
          setHostelRoom(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const fetchTransportOptions = async() => {
      await axios({
          method: 'GET',
          url: `${BASE_URL}/transport/getTransportList`,
          headers: {
          'Content-Type': 'application/json',
          },
      })
          .then((response) => {
          setTransports(response.data.data);
          })
          .catch((error) => {
          console.error('Error fetching data:', error);
          });
      };

      


    fetchData() ;
    fetchHostelOptions() ;
    fetchTransportOptions() ;
} , []);

const fetchVehicleNum = async(routeId) => {
  console.log(routeId);
  
  if (!routeId) return;

  await axios({
      method: "GET",
      url: `${BASE_URL}/transport/getTransport/${routeId}`,
      headers: {
      "Content-Type": "application/json",
      },
  })
      .then((response) => {
      // console.log(response.data.data);
      
      const { vehicleNumber } = response.data.data;
      setVehicleNumber(vehicleNumber);
      // console.log(vehicleNumber);
      
      setValue('vehicleNumber', vehicleNumber); // Set the value in the form
      })
      .catch((error) => {
      console.error("Error fetching vehicle number:", error);
      });
  };

const handleRouteChange = (e) => {    
  const selectedRouteId = e.target.value;
  setSelectedRoute(selectedRouteId)
  fetchVehicleNum(selectedRouteId);
};

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/user/getUser/${userId}`, // API to get specific user by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const userData = response.data.data;
        const formattedData = {
          ...userData,
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleString().split(',')[0] : ''
        };
      
        // Reset the form with the prefilled data
        reset(formattedData);
        setToggleValue(userData.isActive);
        setSelectedRole(userData.role)
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [userId, reset]);

  const handleChange = (role) => {
    setSelectedRole(role); 
    setDropdownOpen(false);
    if(role == 4){
      setDropdownIsVisible(true) ;
    }else{
      setDropdownIsVisible(false) ;
    }
  };
  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}/user/updateUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        role :  selectedRole ,
        isActive: toggleValue ? 'True' : 'False' },
    })
    .then((response) => {
        toast.success("User updated successfully!");
        navigate('/admin/activeUser')
    })
    .catch((error) => {
        console.error("Error updating user:", error);
        toast.error('Failed to update user.');
      });
  };

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Mandarin', label: 'Mandarin' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'French', label: 'French' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'German', label: 'German' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Urdu', label: 'Urdu' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Persian', label: 'Persian' },
    { value: 'Swahili', label: 'Swahili' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Malay', label: 'Malay' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Greek', label: 'Greek' },
  ];

  
  return (
    <div className=" mx-auto ml-19.5 rounded-xl space-y-2 my-10">
      <h2 className="text-2xl font-bold text-[#042954]">Edit User</h2>
      <p>Dashboard / <NavLink to='/admin'>Admin</NavLink> / <span className='text-[#ffae01] font-semibold'>Edit User</span></p>
      
      <div className="bg-white rounded-lg w-full mb-10 p-10 pt-1 ">
        <h2 className="text-xl font-semibold text-black  mt-10">Basic Details</h2>
        <form  className='grid grid-cols-4 mt-5 gap-6'>
        <div className="flex flex-col px-1">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            placeholder=""
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('firstName', { required: 'First Name is required' })}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span> }
        </div>
          
        <div className="flex flex-col px-1 ">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            placeholder=""
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('lastName', { required: 'Last Name is required' })}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span> }
        </div>
          
        <div className="flex flex-col px-1 ">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder=""
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Email is not valid',
              },
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col px-1 ">
            <label htmlFor="phone">Mobile Number *</label>
            <input
              type="phone"
              id="phone"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <div className="flex flex-col px-1 ">
            <label htmlFor="gender">Gender * </label>
            <select
              id="gender"
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="" className='hidden'>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
          </div>
            <div className="flex flex-col px-1">
                  <DatePicker 
                  name={'dateOfBirth'}
                  label={"Date of Birth"}
                  register={register}
                  required={true}
                  className={`py-1 px-4  rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                  />
          {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                </div>

          <div className="flex flex-col px-1 ">
            <label htmlFor="fatherName">Father's Name *</label>
            <input
              type="text"
              id="fatherName"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('fatherName', { required: 'Father\'s Name is required' })}
            />
            {errors.fatherName && <span className="text-red-500 text-sm">{errors.fatherName.message}</span>}
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="motherName">Mother's Name *</label>
            <input
              type="text"
              id="motherName"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('motherName', { required: 'Mother\'s Name is required' })}
            />
            {errors.motherName && <span className="text-red-500 text-sm">{errors.motherName.message}</span>}
          </div>


          {/* House Number */}
          <div className="flex flex-col  px-1">
            <label htmlFor="houseNumber">House Number *</label>
            <input
              type="text"
              id="houseNumber"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.houseNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('houseNumber', { required: 'House Number is required' })}
            />
            {errors.houseNumber && <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>}
          </div>

          {/* Street */}
          <div className="flex flex-col px-1 ">
            <label htmlFor="street">Street *</label>
            <input
              type="text"
              id="street"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('street', { required: 'Street is required' })}
            />
            {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
          </div>

          {/* City */}
          <div className="flex flex-col px-1 ">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
          </div>

          <div className="flex flex-col px-1 ">
            <label htmlFor="pinCode">Pincode *</label>
            <input
              type="text"
              id="pinCode"
              placeholder=''
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.pinCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('pinCode', { 
                required: 'Pincode is required'  , 
                pattern: {
                  value: /^[0-9]/,
                  message: 'Pincode must be digits',
                },
              })}
            />
            {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode.message}</span>}
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('country', { required: 'Country is required' })}
            />
            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
          </div>

          <div className="mb-2">
            <label className="mb-2" htmlFor="active">Status</label>
            <ToggleButton
              isOn={toggleValue}
              handleToggle={() => setToggleValue(!toggleValue)}
              id="active"
            />
          </div>
        </form>

        <h2 className="text-xl font-semibold text-black mt-10 ">Role Details</h2>
        {/* Role Input */}
        <div className="mt-4 mb-5">
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
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      {dropdownIsVisible && (
        <div>
          <div className="flex flex-col px-1 mt-2 mb-5">
            <label htmlFor="maritalStatus " className='text-gray-900 font-semibold '>Marital Status</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Unmarried"
                  className="mr-2"
                  {...register('maritalStatus', { required: 'Marital Status is required' })}
                />
                Unmarried
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Married"
                  className="mr-2"
                  {...register('maritalStatus', { required: 'Marital Status is required' })}
                />
                Married
              </label>
            </div>
            {errors.maritalStatus && <span className="text-red-500 text-sm">{errors.maritalStatus.message}</span>}
          </div>

        <div className="flex flex-col px-1 mt-2 mb-5">
        <label htmlFor="languages" className='text-gray-900 font-semibold '>Languages</label>
        <SelectDropdown
          name="languagesKnown"
          control={control}
          options={languageOptions} 
          isMulti={true}         
          placeholder="Select languages..."
        />
        {errors.languages && <span className="text-red-500 text-sm">{errors.languages.message}</span>}
        </div>

          {/* Qualifications Section */}
          <div className="space-y-2 mb-7 ">
            <h3 className=" font-semibold text-gray-900">Qualifications</h3>
            {qualificationFields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-5 gap-2">
                <div className='flex flex-col gap-1'>
                  <label htmlFor={`qualifications[${index}].degree`}>Degree</label>
                  <input
                    type="text"
                    {...register(`qualifications[${index}].degree`, { required: true })}
                    className="border p-2 rounded-lg"
                    placeholder="Enter Degree"
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor={`qualifications[${index}].institution`}>Institution</label>
                  <input
                    type="text"
                    {...register(`qualifications[${index}].institution`, { required: true })}
                    className="border p-2 rounded-lg"
                    placeholder="Enter Institution"
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor={`qualifications[${index}].yearOfPassing`}>Year of Passing</label>
                  <input
                    type="text"
                    {...register(`qualifications[${index}].yearOfPassing`, { required: true })}
                    className="border p-2 rounded-lg"
                    placeholder="Enter Year"
                  />
                </div>

                <div className="flex flex-col  gap-1">
                <label htmlFor="file">Upload Marksheets/Degree</label>
                <input
                  type="file"
                  id="file"
                  className={`py-2 px-2 rounded-lg border  ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                  {...register('file', { required: 'work experience is required' })}
                />
                </div>

              <div className='flex items-center justify-center mt-7'>
              <Button onClick={() => removeQualification(index)} 
              label={<FontAwesomeIcon icon={faTrashCan} />} 
              className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10 w-20" />
              </div>
            </div>
            ))}
              <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
              onClick={() => appendQualification({ degree: "", institution: "", yearOfPassing: "" })}>
                  + Add New
              </button>
          </div>

      {/* Work Experience Section */}
      <div className="space-y-2 mb-7">
        <h3 className=" font-semibold text-gray-900">Work Experience</h3>
        {workExperienceFields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-4 gap-5">
            <div className='flex flex-col gap-1'>
              <label htmlFor={`workExperiences[${index}].companyName`}>School/Institute Name</label>
              <input
                type="text"
                {...register(`workExperiences[${index}].companyName`, { required: true })}
                className="border p-2 rounded-lg"
                placeholder="Enter Company Name"
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor={`workExperiences[${index}].designation`}>Designation</label>
              <input
                type="text"
                {...register(`workExperiences[${index}].designation`, { required: true })}
                className="border p-2 rounded-lg"
                placeholder="Enter Designation"
              />
            </div>
            <div className='flex flex-col gap-1'>
              <DatePicker 
              name={`workExperiences[${index}].joining`}
              label={'Joining'} 
              register={register}
              className={"border p-2 rounded-lg mt-1"}
              />
            </div>

            <div className='flex flex-col'>
              <DatePicker 
              name={`workExperiences[${index}].relieving`}
              label={'Relieving'} 
              register={register}
              className={"border p-2 rounded-lg mt-1"}
              />
            </div>

          <div className="flex flex-col  gap-1">
          <label htmlFor="">Upload Experience Letter</label>
          <input
            type="file"
            id="file"
            className={`py-2 px-2 rounded-lg border  ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('file', { required: 'work experience is required' })}
          />
          </div>

            <div className='flex items-center justify-center mt-7'>
              <Button onClick={() => removeWorkExperience(index)}
              label={<FontAwesomeIcon icon={faTrashCan} />} 
              className="bg-red-500 text-white hover:bg-white hover:text-red-700 h-10 w-20" />
            </div>
          </div>
        ))}
         <button type="button" className="text-blue-500 hover:text-blue-700 transition-colors duration-150" 
          onClick={() => appendWorkExperience({ companyName: "", designation: "", duration: "" })}>
              + Add New
          </button>
      </div>

      <h3>Total Experience:</h3>

        {/*HR information*/}
      <div className='space-y-2 mb-5'>
        <h3 className=" font-semibold text-gray-900">HR Information</h3>
        <div className='grid grid-cols-2 gap-5'>
        <div className="flex flex-col  mb-5">
          <label htmlFor="aadhar">Aadhar Card </label>
          <input
            type="file"
            id="aadhar"
            className={`py-2 px-2 rounded-lg border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('aadhar', { required: 'Aadhar Card is required' })}
          />
          {errors.aadhar && <span className="text-red-500 text-sm">{errors.aadhar.message}</span>}
        </div>

        <div className="flex flex-col  mb-5">
          <label htmlFor="pan">PAN Card</label>
          <input
            type="file"
            id="pan"
            className={`py-2 px-2 rounded-lg border ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('pan', { required: 'PAN Card is required' })}
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
        </div>
        </div>
      </div>

      {/* Bank Details*/}
      <div className="space-y-2 mb-5">
      <h3 className="font-semibold text-gray-900">Bank Information</h3>
      
      <div className="grid grid-cols-3 gap-5 ">
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountName" className="text-sm font-medium">Account Name</label>
          <input
            type="text"
            id="accountName"
            {...register('accountName', { required: 'Account Name is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="accountNumber" className=" text-sm font-medium">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            {...register('accountNumber', { required: 'Account Number is required' })}
            className="border border-gray-300 p-2 rounded-lg "
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="bankName" className=" text-sm font-medium">Bank Name</label>
          <input
            type="text"
            id="bankName"
            {...register('bankName', { required: 'Bank Name is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div  className='flex flex-col gap-1'>
          <label htmlFor="ifscCode" className=" text-sm font-medium">IFSC Code</label>
          <input
            type="text"
            id="ifscCode"
            {...register('ifscCode', { required: 'IFSC Code is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="branchName" className=" text-sm font-medium">Branch Name</label>
          <input
            type="text"
            id="branchName"
            {...register('branchName', { required: 'Branch Name is required' })}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>
      </div>

      <div className='space-y-2 mb-5 '>
        <h2 className="font-semibold text-gray-900">Hostel Information</h2>
        <div className="grid grid-cols-5 gap-2">
          <div className="flex flex-col px-1">
            <label htmlFor="buildingName">Building Name</label>
            <select
              id="buildingName"
              className="py-1 px-3 rounded-lg  border focus:outline-none"
              {...register('buildingName')}
            >
              <option value="" hidden>Select Hostel </option>
              {hostels.map(option => (
                <option key={option.hostelId} value={option.id}>{option.hostelName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="roomNumber">Room Number</label>
            <select
             type="text"
             id="roomNumber"
             placeholder=""
             className="py-1 px-3 rounded-lg border focus:outline-none"
              {...register('roomNumber')}
            >
              <option value="" hidden>Select Room </option>
              {hostelRoom.map(option => (
                <option key={option.hostelRoomId} value={option.id}>{option.hostelRoomNumber}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='space-y-2 mb-5 '> 
      <h2 className="font-semibold text-gray-900">Transport Information</h2>
      <div className="grid grid-cols-4 gap-5">
     
          <div className="flex flex-col px-1">
          <label htmlFor="route">Route Name</label>
          <select
          id="route"
          className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
          onMouseLeave={handleRouteChange}
          {...register('routeName')}
          >
          <option value="" hidden>Select Route</option>
          {transports.map((option) => (
            <option key={option.id} value={option.id}>
              {option.routeName}
            </option>
          ))}
          </select>
          </div>

          <div className="flex flex-col px-1">
          <label htmlFor="vehicleNumber">Vehicle Number</label>
          <input
          type="text"
          id="vehicleNumber"
          value={vehicleNumber} // Bind the state value here
          readOnly // Make the field read-only
          className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
          />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="pickupPoint">Pickup Point</label>
            <input
              type="text"
              id="pickupPoint"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('pickupPoint')}
            />
          </div>
      </div>
      </div>

       {/*Documents*/}
       <div className='space-y-2 mb-5'>
        <h3 className=" font-semibold text-gray-900">Upload Documents</h3>
        <div className='grid grid-cols-2 gap-5'>
        <div className="flex flex-col  mb-5">
          <label htmlFor="resume">Resume </label>
          <input
            type="file"
            id="resume"
            className={`py-2 px-2 rounded-lg border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('resume', { required: 'Resume is required' })}
          />
          {errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}
        </div>

        <div className="flex flex-col  mb-5">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            className={`py-2 px-2 rounded-lg border ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('photo', { required: 'Photo is required' })}
          />
          {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
        </div>
        </div>
      </div>
      </div>
      )}

        <Button  className='p-0 text-center mt-10' onClick={handleSubmit(onSubmit)} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditUser;
