import React , {useEffect , useState} from 'react';
import { useForm } from 'react-hook-form'
import DatePicker from '../../../../Reusable_components/DatePicker';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import { useUserContext } from '../../../../hooks/UserContext';
import BASE_URL from '../../../../conf/conf';
import ProgressIndicator from './ProgressIndicator';
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';

function BasicDets() {

const { userId ,  setUserId } = useUserContext()
const { currentStep, handleNextStep } = useStepContext();
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);
const [selectedCountry, setSelectedCountry] = useState('');
const [selectedState, setSelectedState] = useState('');
const [selectedCity , setSelectedCity] = useState('') ;
const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm();

    const navigate = useNavigate()

        // Fetch countries
        useEffect(() => {
            axios.get(`${BASE_URL}/area/getCountryList`)
              .then((response) => {
                setCountries(response.data.data)
              })
              .catch((error) => console.error("Error fetching countries:", error));
          }, []);
      
          // Fetch states when country changes
          useEffect(() => {
            if (selectedCountry) {
              axios.get(`${BASE_URL}/area/getStateList/${selectedCountry}`)
                .then((response) => {
                  setStates(response.data.data)
                })
                .catch((error) => console.error("Error fetching states:", error));
            }
          }, [selectedCountry]);
        
          // Fetch cities when state changes
          useEffect(() => {
            if (selectedState) {
              axios.get(`${BASE_URL}/area/getCitiesList/${selectedState}`)
                .then((response) => {
                  setCities(response.data.data)
                })
                .catch((error) => console.error("Error fetching cities:", error));
            }
          }, [selectedCountry, selectedState]);

    useEffect(() => {
        // Fetch the existing student details if available
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
                const studentData = response.data.data;

                if (studentData) {
                    // If data exists, populate the form
                    const formattedData = {
                        ...studentData,
                        dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleString().split(',')[0] : ''
                      };
                    
                      // Reset the form with the prefilled data
                      setSelectedCountry(formattedData.country || '');
                      setSelectedState(formattedData.state || '');
                      setSelectedCity(formattedData.city || '') ;

                      reset(formattedData);
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        if(userId){
            fetchStudentDetails();
        }
    }, [reset , userId]);

    const onSubmit = async (data) => {
        console.log(data);
        
        const userData = {
            ...data , 
            role: 3,
          }
          await axios({
              method:"Post",
              url : `${BASE_URL}/user/addStudentBasicDetails`,
              data: {
                ...userData ,
                dateOfBirth : new Date(data.dateOfBirth).toISOString()
              } ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              setUserId(response.data.data.userId)
              toast.success("Successfully Add Student!");
              handleNextStep()
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              toast.error("Error to add new User");
              reset()
          })
    }
  return (
    <div>
        <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
        <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
         <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
    <h2 className="text-xl font-semibold text-black ">Basic Details</h2>
    <form  className="grid grid-cols-4 mt-5 gap-6">

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
            {...register('dateOfBirth' , {required: 'Date of birth is required'})}
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
          <label htmlFor="city">City/Village*</label>
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
            <label htmlFor="street">Street </label>
            <input
                type="text"
                id="street"
                placeholder=""
                className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none`}
                {...register('street')}
            />
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

            {/* <div className="flex flex-col px-1 ">
            <label htmlFor="city">City/Village *</label>
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
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.relegion ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
            className={`py-1 px-3 rounded-lg bg-gray-100 border ${errors.casteCategory ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
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
    </form>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
            <Button type='submit' label="Save & Continue" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      <ToastContainer/>
    </div>
</div>
  )
}

export default BasicDets