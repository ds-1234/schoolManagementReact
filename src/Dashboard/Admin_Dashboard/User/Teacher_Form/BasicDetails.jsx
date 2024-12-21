import React , {useEffect , useState} from 'react';
import DatePicker from '../../../../Reusable_components/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft , faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../../../../Reusable_components/ToggleButton'

function BasicDetails({handleNext , handlePrevious , currentStep , selectedRole , userId}) {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate()
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity , setSelectedCity] = useState('') ;
  const [stdDropdown , setStdDropdown] = useState(false) ;
  const [selectedStds , setSelectedStds] = useState([]) ;
  const [stds , setStds] = useState([]) ;
  const [value , setValue] = useState(true) ;
  const [users , setUsers] = useState([]) ;


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

  // Fetch teacher details after fetching countries, states, and cities
  const fetchUserData =  async() => {
    try {
      const response =  await axios.get(`${BASE_URL}/user/getUser/${userId}`);
      const userData = response.data.data;

      const formattedData = {
        ...userData,
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleString().split(',')[0] : '',
      };

      if (userData) {
        if (!selectedCountry) setSelectedCountry(userData.country);
        if (!selectedState) setSelectedState(userData.state);
        if (!selectedCity) setSelectedCity(userData.city);
        if(userData.isActive != null){
          setValue(userData.isActive) ;
        }
        if(selectedRole === 5 && userData.isParent){
          setSelectedStds(userData.isParent)          
        }
  
        reset(formattedData);
      }

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchStds = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUserList`);
      setUsers(res.data.data);
      setStds(res.data.data.filter((std) => std.role === 3 && std.isParent === null && std.isActive === true));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStds() ;
  } , [])
  
  // UseEffect to ensure proper order
  useEffect(() => {
    const initializeData =  () => {
       fetchLocationData(); 
      fetchUserData();
    };
    initializeData();
  }, [userId]);



  const onSubmit = async (data) => {
    await axios({
      method: "post",
      url: `${BASE_URL}/user/updateUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        ...data,
        role :  selectedRole,
        isParent : selectedRole === 5 ? selectedStds : null ,
        country: data.country ,
        state: data.state ,
        city: data.city ,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split("T")[0] : null,
        isActive : value ,
      }
    })
    .then((response) => {
      if(selectedRole === 5){
        const updatePromises = selectedStds.map(async(stdId) => {
        const data = await axios.get(`${BASE_URL}/user/getUser/${stdId}`) ;
        const payload = {
         ...data.data.data ,
         isParent: [userId]
        }
        await axios.post(`${BASE_URL}/user/updateUser`,  payload, {
          headers: {'Content-Type' : 'application/json'} 
        })
      });
  
      // Execute all student updates in parallel
      Promise.all(updatePromises)
    }})
      .then(() => {
        setSelectedStds([]) ;
        toast.success("User Updated Successfully !")
        reset() ;
        handleNext() ;
      })
    .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleCheckboxChange = (stdId) => {
    setSelectedStds((prevSelected) => {
      if (prevSelected.includes(stdId)) {
        return prevSelected.filter(id => id !== stdId);
      } else {
        return [...prevSelected, stdId];
      }
    });
  };

  console.log("Student List (stds):", stds);

  console.log("Selected Student IDs (selectedStds):", selectedStds);
console.log("Matching Students:", selectedStds.map(id => stds.find(std => std.id === id)));


  return (
    <div>
      {/* Map Parent to Children */}
      {selectedRole == 5 && (
        <div className="mb-6 mt-4 relative">
        <label htmlFor="student" className="block text-black font-semibold mb-2">Student Mapping</label>
        <div 
          className="border rounded-lg cursor-pointer p-2 flex justify-between items-center md:w-1/2 w-full"
          onClick={() => {
            setStdDropdown(!stdDropdown)
          }}
        >
    <p>
    {selectedStds?.length === 0
    ? 'Select students'
    : selectedStds
        .map((id) => users.find((std) => std.id === id)?.firstName)
        .filter((name) => name) 
        .join(', ')}
    </p>
 <FontAwesomeIcon icon={faAngleDown} />
        </div>
        {stdDropdown && (
          <div className="absolute bg-white border rounded-lg mt-1 flex flex-col md:w-1/2 w-full">
            {stds.map(std => (
              <label key={std.id} className="px-4 py-2 hover:bg-gray-100 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStds?.includes(std.id)}
                  onChange={() => handleCheckboxChange(std.id)}
                  className="mr-2"
                />
                {std.firstName} {std.lastName}
              </label>
            ))}
          </div>
        )}
      </div>
      )}

      <h3 className="text-xl font-semibold mb-2 text-gray-900">Basic Details</h3>
      <form  className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-5 gap-6'>
        <div className="flex flex-col px-1">
          <label htmlFor="firstName">First Name <span className='text-red-700 font-bold'>*</span></label>
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
          <label htmlFor="lastName">Last Name <span className='text-red-700 font-bold'>*</span></label>
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
          <label htmlFor="email">Email <span className='text-red-700 font-bold'>*</span></label>
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
            <label htmlFor="phone">Mobile Number <span className='text-red-700 font-bold'>*</span></label>
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
            <label htmlFor="gender">Gender <span className='text-red-700 font-bold'>*</span> </label>
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
                  {...register('dateOfBirth' , {required : "date of birth is required"})}
                  />
          {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                </div>

          <div className="flex flex-col px-1 ">
            <label htmlFor="fatherName">Father's Name <span className='text-red-700 font-bold'>*</span></label>
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
            <label htmlFor="motherName">Mother's Name <span className='text-red-700 font-bold'>*</span></label>
            <input
              type="text"
              id="motherName"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.motherName ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('motherName', { required: 'Mother\'s Name is required' })}
            />
            {errors.motherName && <span className="text-red-500 text-sm">{errors.motherName.message}</span>}
          </div>


        {/* Country dropdown */}
        <div className="flex flex-col px-1">
          <label htmlFor="country">Country <span className='text-red-700 font-bold'>*</span></label>
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
          <label htmlFor="state">State <span className='text-red-700 font-bold'>*</span></label>
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
          <label htmlFor="city">City <span className='text-red-700 font-bold'>*</span></label>
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


          {/* House Number */}
          <div className="flex flex-col  px-1">
            <label htmlFor="houseNumber">House Number <span className='text-red-700 font-bold'>*</span></label>
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
            <label htmlFor="street">Street <span className='text-red-700 font-bold'>*</span></label>
            <input
              type="text"
              id="street"
              placeholder=""
              className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
              {...register('street', { required: 'Street is required' })}
            />
            {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
          </div>


          <div className="flex flex-col px-1 ">
            <label htmlFor="pinCode">Pincode <span className='text-red-700 font-bold'>*</span></label>
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

            {/* Blood Group Select */}
        <div className="flex flex-col px-1">
        <label htmlFor="bloodGroup">Blood Group</label>
        <select
            id="bloodGroup"
            className={`py-1 px-3 w-5/6 sm:w-auto rounded-lg bg-gray-100 border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
            className={`py-1 px-3 w-5/6 sm:w-auto rounded-lg bg-gray-100 border ${errors.relegion ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
            className={`py-1 px-3 w-5/6 sm:w-auto rounded-lg bg-gray-100 border ${errors.casteCategory ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
            {...register('casteCategory')}
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


          {selectedRole != 3 && selectedRole != 4 && (
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
          )}
      </form>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
        <button
          onClick={handleSubmit(onSubmit)}
          hidden={selectedRole != 4 && selectedRole != 6}
          className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
        >
          Save & Continue 
        </button>
        {
        selectedRole != 4 && selectedRole != 6 ? <Button onClick={handleSubmit(onSubmit)} /> : ''
        }
            <Button onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>

    </div>
  );
}

export default BasicDetails;
