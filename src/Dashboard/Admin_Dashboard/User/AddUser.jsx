import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import { NavLink } from 'react-router-dom';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import DatePicker from '../../../Reusable_components/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import BASE_URL from '../../../conf/conf';
import Loader from '../../../Reusable_components/Loader';


const AddUser = () => {

  const [value, setValue] = useState(true);
  const [roles , setRoles] = useState([]) ;
  const [dropdownIsVisible , setDropdownIsVisible] = useState(false)
  const [stds , setStds] = useState([]) 
  const [selectedStds , setSelectedStds] = useState([])
  const [dropdownOpen , setDropdownOpen] = useState(false)
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRole , setSelectedRole] = useState('') ;
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity , setSelectedCity] = useState('') ;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const [rolesResponse, stdsResponse] = await Promise.all([
            axios.get(`${BASE_URL}/role/getRoleList`),
            axios.get(`${BASE_URL}/user/getUserList`)
          ]);
          setRoles(rolesResponse.data.data.filter((r) => r.id != 2));          
          setStds(
            stdsResponse.data.data.filter((std) => std.role === 3 && std.isActive && !std.isParent)
          );
        } catch (error) {
          console.error(error, 'Error fetching initial data');
        }
      };
      fetchInitialData();
    }, []);
    
  

  const onSubmit = async(data) => {
    setLoading(true); // Start loader
    const userData = {
      ...data , 
      role: selectedRole,
      isParent : selectedRole === 5 ? selectedStds : null ,
      isActive: data.active = value, 
    }
  
    setSelectedCountry(userData.country || '');
    setSelectedState(userData.state || '');
    setSelectedCity(userData.city || '') ;
    
    await axios({
        method:"post",
        url : `${BASE_URL}/user/createUser`,
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
    
      })
      .then((response)=>{
        if(response.data.success){
             Promise.all(selectedStds.map(async (stdId) => {
             const studentData =  (await axios.get(`${BASE_URL}/user/getUser/${stdId}`)).data.data ;
             await axios.post(`${BASE_URL}/user/createUser`, {...studentData , isParent: [response.data.data.id]}, {
              headers: { "Content-Type": "application/json" }
            });
          }));
        }
        reset()
        toast.success("Successfully Add User");
        setValue(true)
        setSelectedStds([])
    })
    .catch(err=>{
        console.log(err,'error:')
        toast.error("Error to add new User");
        setValue(true)
        reset()
    }).finally(()=> {
      setLoading(false); // Stop loader
    });
  }

    // Fetch countries
    const fetchLocationData = async() => {
      await axios({
        method:'GET' ,
        url: `${BASE_URL}/area/getCountryList` ,
        headers: {'Content-Type' : 'application/json'} 
      })
      .then((res) => {
        setCountries(res.data.data) ;
      })
      .catch((err) => {
        console.log("Error in fetching countries" , err);
      })
    }

    useEffect(() => {
      const fetchStates = () => {
        axios.get(`${BASE_URL}/area/getStateList/${selectedCountry}`)
        .then((res) => {
          setStates(res.data.data) ;
        })
        .catch((err) => console.error(err)) 
      }
  
      const fetchCities = () => {
        axios.get(`${BASE_URL}/area/getCitiesList/${selectedState}`)
        .then((res) => {
          setCities(res.data.data) ;
        })
        .catch((err) => console.error(err)) 
      }
      
      if(selectedCountry){
        fetchStates() ;
      }
  
      if(selectedState){
        fetchCities() ;
      }
    } , [selectedCountry , selectedState])

    useEffect(() => {
      fetchLocationData() ;
    } , [])

  // const handleRoleChange = (e) => {  
  //   setSelectedRole(e.target.value)
  //   console.log(selectedRole);
  //   if(selectedRole == 5){
  //     setDropdownIsVisible(true) ;
  //   }
  // }

  const handleCheckboxChange = (stdId) => {
    setSelectedStds((prevSelected) => {
      if (prevSelected.includes(stdId)) {
        return prevSelected.filter(id => id !== stdId);
      } else {
        return [...prevSelected, stdId];
      }
    });
  };

  return (
    <div className="p-10 mx-auto bg-white rounded-xl shadow-md space-y-2 my-10 ">
            <Loader isLoading={loading} /> {/* Use Reusable Loader */}
        <h2 className="text-2xl font-bold text-[#042954]  ">Add New User</h2>
        <p><NavLink to = '/admin'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Add User</span> </p>
      
      <div className="bg-white rounded-lg w-full">
        <h2 className="text-xl font-semibold text-black  mt-10">Basic Details</h2>
        <form  className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-5 gap-6 ">

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
                // {...register('dateOfBirth' , {required: 'Date of birth is required'})}
                />
        {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
              </div>

        {/* Country dropdown */}
        <div className="flex flex-col px-1">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('country', { required: 'Country is required' })}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
          {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
        </div>

        {/* State dropdown */}
        <div className="flex flex-col px-1">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('state', { required: 'State is required' })}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
        </div>

        {/* City dropdown */}
        <div className="flex flex-col px-1">
          <label htmlFor="city">City/Village *</label>
          <select
            id="city"
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('city', { required: 'City is required' })}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
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
                  {...register('street', { required: 'Street is required' })}
                />
                {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
              </div>

              {/* <div className="flex flex-col px-1 ">
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
              </div> */}

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

              <div className="mb-2">
                <label className="mb-2" htmlFor="active">
                  Status 
                </label>
                <ToggleButton
                  isOn={value}
                  handleToggle={() => setValue(!value)}
                  id="active"
                  register={register}
                />
            </div>

            </form>

        <h2 className="text-xl font-semibold text-black mt-10 ">Role Details</h2>
        {/* Add Role */}
        <div className="mt-4">
            <select
              id="role"
              className={`md:w-1/2 w-full px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={selectedRole}
              onChange={(e) =>setSelectedRole(e.target.value)  }
            >
                <option value="" hidden>Select a Role</option>
              {roles?.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Map Parent to Children */}
          {selectedRole == 5 ? 
            <div className="mb-4 mt-4 relative">
            <label htmlFor="student" className="block text-black font-semibold mb-2">Student Mapping</label>
            <div 
              className="border rounded-lg cursor-pointer p-2 flex justify-between items-center w-1/2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>{selectedStds.length === 0 ? 'Select students' : selectedStds.map(id => stds.find(std => std.id === id)?.firstName).join(', ')}</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            {dropdownOpen && (
              <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-1/2">
                {stds.map(std => (
                  <label key={std.id} className="px-4 py-2 hover:bg-gray-100 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedStds.includes(std.id)}
                      onChange={() => handleCheckboxChange(std.id)}
                      className="mr-2"
                      
                    />
                    {std.firstName} {std.lastName}
                  </label>
                ))}
              </div>
            )}
          </div>
          :
          ''
          }
        

        {/* Submit Button */}
        <Button type='submit' className=' p-0 text-center mt-10' onClick={handleSubmit(onSubmit)}/>
      {/* <ToastContainer/> */}
    </div>
    </div>
  );
};

export default AddUser;