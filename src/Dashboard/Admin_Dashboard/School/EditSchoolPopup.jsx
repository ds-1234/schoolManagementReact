import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import BASE_URL from '../../../conf/conf';

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

  useEffect(() => {
    
    // Add event listener for ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
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
        setSchool(response.data.data);
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
    e.preventDefault();
    axios({
      method: 'POST', 
      url: `${BASE_URL}/school/createSchool`,
      data: {id : '${schoolId}', ...school},
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      toast.success('School updated successfully!');
      onSuccess(); // Call onSuccess to refresh data
      onClose(); // Close the popup
    })
    .catch((err) => {
      console.error('Error:', err);
      toast.error('Failed to update school.');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

          <div>
            <Input
              type="text"
              name="city"
              value={school.city}
              onChange={handleChange}
              label="City"
              placeholder="Enter the City"
              aria-invalid={school.city ? 'false' : 'true'}
              color={school.city ? 'default' : 'error'}
            />
            {!school.city && <span className="text-red-500 text-sm">City is required</span>}
          </div>

          <div>
            <Input
              type="text"
              name="state"
              value={school.state}
              onChange={handleChange}
              label="State"
              placeholder="Enter the State"
              aria-invalid={school.state ? 'false' : 'true'}
              color={school.state ? 'default' : 'error'}
            />
            {!school.state && <span className="text-red-500 text-sm">State is required</span>}
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

          <div>
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
          </div>

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
