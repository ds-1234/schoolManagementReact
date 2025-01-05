import React, { useEffect , useState} from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import BASE_URL from '../../../conf/conf';
import { Circles } from 'react-loader-spinner';
import Loader from '../../../Reusable_components/Loader';


const AddSchoolPopup = ({ isOpen, onClose }) => {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity , setSelectedCity] = useState('') ;
  const [loading, setLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset ,
    getValues,
  } = useForm();

  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Clean up scrolling style
    };
  }, [isOpen, onClose]);

  const Submitschool = (data) => {
    setLoading(true); // Start loader

    const formData = getValues();
    
    setSelectedCountry(data.country || '');
    setSelectedState(data.state || '');
    setSelectedCity(data.city || '') ;

    axios({
      method: 'post',
      url: `${BASE_URL}/school/createSchool`,
      data: {
        name: data.name,
        houseNumber: data.houseNumber,
        street: data.street,
        city: selectedCity,
        state: selectedState,
        pinCode: data.pinCode,
        country: selectedCountry,
        isActive: true
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Response:', res.data);
        toast.success('School added successfully!');
        reset()
        onClose();
      })
      .catch((err) => {
        console.log('Error:', err);
        toast.error('Failed to add school.');
        onClose();
        reset()
      })  .finally(()=> {
        setLoading(false); // Stop loader
      });
  };

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
          console.log(states);
          
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:p-0 p-5">
      <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Add School</h2>
        <form onSubmit={handleSubmit(Submitschool)} className="space-y-4">
          <div>
            <Input
              {...register('name', {
                required: 'School name is required',
              })}
              label="School Name"
              labelPlacement="outside"
              placeholder="Enter the School Name"
              aria-invalid={errors.name ? 'true' : 'false'}
              color={errors.name ? 'error' : 'default'}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('houseNumber', {
                required: 'House number is required',
              })}
              label="School Number"
              labelPlacement="outside"
              placeholder="Enter the School Number"
              aria-invalid={errors.houseNumber ? 'true' : 'false'}
              color={errors.houseNumber ? 'error' : 'default'}
            />
            {errors.houseNumber && (
              <span className="text-red-500 text-sm">{errors.houseNumber.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('street', {
                required: 'Street is required',
              })}
              label="Street"
              labelPlacement="outside"
              placeholder="Enter the Street"
              aria-invalid={errors.street ? 'true' : 'false'}
              color={errors.street ? 'error' : 'default'}
            />
            {errors.street && (
              <span className="text-red-500 text-sm">{errors.street.message}</span>
            )}
          </div>

          {/* Country dropdown */}
        <div className="flex flex-col">
          <label htmlFor="country"  className='text-black text-sm'>Country</label>
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
        <div className="flex flex-col ">
          <label htmlFor="state"  className='text-black text-sm'>State</label>
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
        <div className="flex flex-col">
          <label htmlFor="city" className='text-black text-sm'>City/Village</label>
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

          {/* <div>
            <Input
              {...register('city', {
                required: 'City is required',
              })}
              label="City"
              labelPlacement="outside"
              placeholder="Enter the City"
              aria-invalid={errors.city ? 'true' : 'false'}
              color={errors.city ? 'error' : 'default'}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city.message}</span>
            )}
          </div>

          <div>
            <Input
              {...register('state', {
                required: 'State is required',
              })}
              label="State"
              labelPlacement="outside"
              placeholder="Enter the State"
              aria-invalid={errors.state ? 'true' : 'false'}
              color={errors.state ? 'error' : 'default'}
            />
            {errors.state && (
              <span className="text-red-500 text-sm">{errors.state.message}</span>
            )}
          </div> */}

          <div>
            <Input
              {...register('pinCode', {
                required: 'Pin code is required',
              })}
              label="Pin Code"
              labelPlacement="outside"
              placeholder="Enter the Pin Code"
              aria-invalid={errors.pinCode ? 'true' : 'false'}
              color={errors.pinCode ? 'error' : 'default'}
            />
            {errors.pinCode && (
              <span className="text-red-500 text-sm">{errors.pinCode.message}</span>
            )}
          </div>

          {/* <div>
            <Input
              {...register('country', {
                required: 'Country is required',
              })}
              label="Country"
              labelPlacement="outside"
              placeholder="Enter the Country"
              aria-invalid={errors.country ? 'true' : 'false'}
              color={errors.country ? 'error' : 'default'}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country.message}</span>
            )}
          </div> */}

          {/* <Button
            type="submit"
            radius="full"
            variant="shadow"
            color="primary"
            className="w-full mt-4"
          >
            Add School
          </Button> */}

          <Button 
          // onClick={handleSubmit}
          type='submit'
          className='w-full text-center'
          // label={"Add School"}
          />
        </form>
      </div>
    </div>
  );
};

export default AddSchoolPopup;
