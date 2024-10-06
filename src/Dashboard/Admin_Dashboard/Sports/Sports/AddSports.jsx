import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AddSports = ({ isOpen, onClose }) => {

    const [value, setValue] = useState(true);
    const [coach, setCoach] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCoach, setSelectedCoach] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  const fetchCoach = async () => {
    try {
        const response = await axios.get('http://localhost:8080/user/getUserList');
        const filteredCoaches = response.data.data.filter(user => user.role === 3);
        setCoach(filteredCoaches);
    } catch (error) {
        toast.error("Error fetching coaches");
    }
};
  

  useEffect(() => {
    // Disable scrolling on background when the popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchCoach();

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

  // Handle form submission
  const onSubmit = (data) => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/sports/saveSports',
      data: {
        sportsName: data.sportsName,
        // coachName: {id: selectedCoach?.id },
        userId:selectedCoach.id,
        startedYear: data.startedYear,
        isActive:value
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response.data);
        toast.success('Successfully added Sport');
        reset();
        onClose();
      })
      .catch((err) => {
        console.log(err, 'error:');
        toast.error('Error adding new Sport');
        onClose();
      });
  };

  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {console.log(selectedCoach)}
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#042954]">Add Sport</h2>

          {/* Sport name Input */}
          <div className="mb-4">
            <label htmlFor="sportsName" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="sportsName"
              className={`w-full px-3 py-2 border ${errors.sportsName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('sportsName', { required: 'sportsName is required' })}
            />
            {errors.sportsName && <p className="text-red-500 text-sm mt-1">{errors.sportsName.message}</p>}
          </div>


       {/* Coach Input */}
       <div className="mb-4 relative">
                        <label htmlFor="coach" className="block text-gray-700 font-semibold mb-2">Coach</label>
                        <div 
                            className="border rounded-lg cursor-pointer p-2 flex justify-between items-center"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <p>{selectedCoach ? selectedCoach.firstName : 'Select Coach'}</p>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                        {dropdownOpen && (
                            <div className="absolute bg-white border rounded-lg mt-1 flex flex-col w-full">
                                {coach.map(coach => (
                                    <label
                                        key={coach.id}
                                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                                        onClick={() => {
                                            setSelectedCoach(coach); // Set selected coach
                                            setDropdownOpen(false); // Close dropdown after selection
                                        }}
                                    >
                                        {coach.firstName}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>


          {/* Started Year  Input */}
                    <div className="mb-4">
            <label htmlFor="startedYear" className="block text-gray-700 font-semibold mb-2">Started Year</label>
            <input
              type="number"
              id="startedYear"
              className={`w-full px-3 py-2 border ${errors.startedYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register('startedYear', { required: 'startedYear is required' })}
            />
            {errors.startedYear && <p className="text-red-500 text-sm mt-1">{errors.startedYear.message}</p>}
          </div>

          <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status 
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
                // label="Active"
                register={register}
              />
            </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-center" 
          />

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSports;
