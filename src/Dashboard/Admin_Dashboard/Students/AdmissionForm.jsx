import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button'
import { NavLink } from 'react-router-dom';
import DatePicker from '../../../Reusable_components/DatePicker';
import axios from 'axios';

function AdmissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const [classes , setClasses] = useState([]) 
  const [hostels , setHostels] = useState([])
  const [transports , setTransports] = useState([])
  const [hostelRoom , setHostelRoom] = useState([])
  const [schools , setSchools] = useState([]) 
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [selectedRoute, setSelectedRoute] = useState('')

  const fetchClassOptions = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/class/getClassList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        setClasses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchHostelOptions = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/hostel/getHostelList`,
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

  const fetchTransportOptions = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/transport/getTransportList',
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

  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/hostelRooms/getHostelRoomsList`,
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

  const fetchSchoolOptions = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/school/getSchoolList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        setSchools(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchVehicleNum = (routeId) => {
    console.log(routeId);
    
    if (!routeId) return;

    axios({
      method: "GET",
      url: `http://localhost:8080/transport/getTransport/${routeId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.data);
        
        const { vehicleNumber } = response.data.data;
        setVehicleNumber(vehicleNumber);
        console.log(vehicleNumber);
        
        setValue('vehicleNumber', vehicleNumber); // Set the value in the form
      })
      .catch((error) => {
        console.error("Error fetching vehicle number:", error);
      });
  };

  useEffect(() => {
    fetchClassOptions() 
    fetchHostelOptions()
    fetchTransportOptions() 
    fetchData()
    fetchSchoolOptions()
    fetchVehicleNum(selectedRoute)
  } , [])

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); 
  };

  const handleRouteChange = (e) => {    
    const selectedRouteId = e.target.value;
    setSelectedRoute(selectedRouteId)
    fetchVehicleNum(selectedRouteId);
  };
  return (
    <div className='h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/admin/user'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'>All Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>

    <div className='bg-white mt-10 p-5 rounded-xl'>
         <h2 className="text-xl font-semibold text-black ">Basic Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">

          {/* Input Fields */}
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
              <div className="flex flex-col  px-1 ">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  placeholder=""
                  autoComplete='new-password'
                  className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
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

              <div className="flex flex-col px-1 ">
                <DatePicker 
                name={'dateOfBirth'}
                label={"Date of Birth"}
                register={register}
                required={true}
                className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                />
        {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
              </div>

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

              <div className="flex flex-col px-1 ">
                <label htmlFor="street">Street *</label>
                <input
                  type="text"
                  id="street"
                  placeholder=""
                  className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                  {...register('street')}
                />
              </div>

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

         {/* Blood Group Select */}
         <div className="flex flex-col px-1">
            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('bloodGroup')}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Religion Select */}
          <div className="flex flex-col px-1">
            <label htmlFor="religion">Religion</label>
            <select
              id="religion"
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.religion ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('religion')}
            >
              <option value="">Select Religion</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Jainism">Jainism</option>
              <option value="Zoroastrianism">Zoroastrianism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Caste Category Select */}
          <div className="flex flex-col px-1">
            <label htmlFor="caste">Caste Category</label>
            <select
              id="caste"
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.caste ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('caste')}
            >
              <option value="">Select Caste Category</option>
              <option value="General">General</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
              <option value="OBC">Other Backward Class (OBC)</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Student Photo (150px X 150px)</label>
          <input {...register('photo')} type="file" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base py-1 px-1"/>
        </div>

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Academic Details</h2>

          <div className="flex flex-col px-1">
            <label htmlFor="school">School Branch</label>
            <select
              id="school"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('school')}
              placeholder = "Select School Branch "
            >
              <option value="" hidden>Select Branch </option>
              {schools.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="class">Class</label>
            <select
              id="class"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('class')}
            >
              <option value="" hidden>Select Class </option>
              {classes.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="academicYear">Academic Year</label>
            <input
              type="text"
              id="academicYear"
              placeholder="e.g., 2014-2015"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('academicYear')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('rollNumber')}
            />
          </div>

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Office Details</h2>
          <div className="flex flex-col px-1">
            <DatePicker 
              name={'admissionDate'}
              label={"Admission Date"}
              register={register}
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.admissionDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="admissionNumber">Admission Number</label>
            <input
              type="text"
              id="admissionNumber"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('admissionNumber')}
            />
          </div>

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Transport Information</h2>
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
          {...register('vehicleNumber')}
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

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Hostel Information</h2>
          <div className="flex flex-col px-1">
            <label htmlFor="building">Building Name</label>
            <select
              id="building"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('building')}
            >
              <option value="" hidden>Select Hostel </option>
              {hostels.map(option => (
                <option key={option.hostelId} value={option.hostelId}>{option.hostelName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="hostelRoomNumber">Room Number</label>
            <select
             type="text"
             id="hostelRoomNumber"
             placeholder=""
             className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('hostelRoomNumber')}
            >
              <option value="" hidden>Select Room </option>
              {hostelRoom.map(option => (
                <option key={option.hostelRoomId} value={option.hostelRoomId}>{option.hostelRoomNumber}</option>
              ))}
            </select>
          </div>

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Documents Required</h2>
          <div className="col-span-2">
            <label htmlFor="transferCertificate">Upload Transfer Certificate</label>
            <input
              type="file"
              id="transferCertificate"
              className="mt-1 block w-full border-gray-300 rounded-md"
              {...register('transferCertificate')}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="idProof">Upload ID Proof</label>
            <input
              type="file"
              id="idProof"
              className="mt-1 block w-full border-gray-300 rounded-md"
              {...register('idProof')}
            />
          </div>

          <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Previous School Details</h2>
          <div className="flex flex-col px-1">
            <label htmlFor="previousSchool">School Name</label>
            <input
              type="text"
              id="previousSchool"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('previousSchool')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="previousAddress">Address</label>
            <input
              type="text"
              id="previousAddress"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('previousAddress')}
            />
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="leavingYear">Leaving Year Session</label>
            <input
              type="text"
              id="leavingYear"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('leavingYear')}
            />
          </div>
    
      <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Submit" className='px-8'/>
          <Button onClick={() => reset()} label="Reset" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
      </form>
    </div>
    </div>
  );
}

export default AdmissionForm;
