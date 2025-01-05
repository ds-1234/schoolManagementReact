import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import BASE_URL from '../../../conf/conf';
import { Circles } from 'react-loader-spinner';
import Loader from '../../../Reusable_components/Loader';


const EditSchoolPopup = ({ isOpen, onClose, schoolId, onSuccess }) => {
  const [school, setSchool] = useState({
    name: '',
    houseNumber: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity , setSelectedCity] = useState('') ;
  const [loading, setLoading] = useState(false);
  

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
    
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        setSelectedCountry('')
        setSelectedState('')
        setSelectedCity('')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (schoolId) {
      axios.get(`${BASE_URL}/school/getSchool/${schoolId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data.data ;
        fetchLocationData()
        setSchool(response.data.data);
        if (data) {
           setSelectedCountry(data.country);
           setSelectedState(data.state);
           setSelectedCity(data.city);
        }
      })
      .catch((error) => {
        console.error('Error fetching School:', error);
        toast.error('Failed to fetch school data.');
      });
    }
  }, [schoolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool({ ...school, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true); // Start loader
    e.preventDefault();
    axios({
      method: 'POST', 
      url: `${BASE_URL}/school/createSchool`,
      data: {id : '${schoolId}', ...school ,  country: selectedCountry ,state: selectedState , city: selectedCity},
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      toast.success('School updated successfully!');
      onSuccess(); // Call onSuccess to refresh data
      onClose(); // Close the popup
      setSelectedCountry('')
      setSelectedState('')
      setSelectedCity('')
    })
    .catch((err) => {
      console.error('Error:', err);
      toast.error('Failed to update school.');
    })  .finally(()=> {
      setLoading(false); // Stop loader
    });
  };

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
        <h2 className="text-xl font-bold mb-4 text-center text-[#042954]">Edit School</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              value={school.name}
              onChange={handleChange}
              label="School Name"
              placeholder="Enter the school name"
              aria-invalid={school.name ? 'false' : 'true'}
              color={school.name ? 'default' : 'error'}
            />
            {!school.name && <span className="text-red-500 text-sm">School name is required</span>}
          </div>

          <div>
            <Input
              type="text"
              name="houseNumber"
              value={school.houseNumber}
              onChange={handleChange}
              label="School Number"
              placeholder="Enter the School Number"
              aria-invalid={school.houseNumber ? 'false' : 'true'}
              color={school.houseNumber ? 'default' : 'error'}
            />
            {!school.houseNumber && <span className="text-red-500 text-sm">House number is required</span>}
          </div>

          <div>
            <Input
              type="text"
              name="street"
              value={school.street}
              onChange={handleChange}
              label="Street"
              placeholder="Enter the street"
              aria-invalid={school.street ? 'false' : 'true'}
              color={school.street ? 'default' : 'error'}
            />
            {!school.street && <span className="text-red-500 text-sm">Street is required</span>}
          </div>

            {/* Country dropdown */}
        <div className="flex flex-col">
          <label htmlFor="country"  className='text-black text-sm'>Country</label>
          <select
            id="country"
            className={`py-1 px-3 rounded-lg bg-gray-100 border  focus:outline-none`}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
       </div>

        {/* State dropdown */}
        <div className="flex flex-col ">
          <label htmlFor="state"  className='text-black text-sm'>State</label>
          <select
            id="state"
            className={`py-1 px-3 rounded-lg bg-gray-100 border  focus:outline-none`}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        {/* City dropdown */}
        <div className="flex flex-col">
          <label htmlFor="city" className='text-black text-sm'>City/Village</label>
          <select
            id="city"
            className={`py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none`}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
      </div>


          <div>
            <Input
              type="text"
              name="pinCode"
              value={school.pinCode}
              onChange={handleChange}
              label="Pin Code"
              placeholder="Enter the Pin Code"
              aria-invalid={school.pinCode ? 'false' : 'true'}
              color={school.pinCode ? 'default' : 'error'}
            />
            {!school.pinCode && <span className="text-red-500 text-sm">Pin code is required</span>}
          </div>

          {/* <div>
            <Input
              type="text"
              name="country"
              value={school.country}
              onChange={handleChange}
              label="Country"
              placeholder="Enter the Country"
              aria-invalid={school.country ? 'false' : 'true'}
              color={school.country ? 'default' : 'error'}
            />
            {!school.country && <span className="text-red-500 text-sm">Country is required</span>}
          </div> */}

          <Button 
            type='submit'
            className='w-full text-center'
          />
        </form>
      </div>
    </div>
  );
};

export default EditSchoolPopup;
