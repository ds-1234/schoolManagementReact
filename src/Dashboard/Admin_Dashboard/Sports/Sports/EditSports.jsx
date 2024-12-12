import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';

function EditSports({ isOpen, onClose, sportsId, onSuccess }) {
    const [value, setValue] = useState(true);
  const [sports, setSports] = useState({ sportsName: '', coachName: '', startedYear: [] });
  const [coach, setCoach] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const {
    register,
    // handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
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
    const fetchCoach = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/getUserList`);
            const filteredCoaches = response.data.data.filter(user => user.role === 3);
            setCoach(filteredCoaches);
        } catch (error) {
            toast.error("Error fetching coaches");
        }
    };
    fetchCoach()
  }, []);

  useEffect(() => {
    if (sportsId) {
      axios.get(`${BASE_URL}/sports/getSportsById/${sportsId}`)
        .then((response) => {
          const sportsData = response.data.data;
          setSports(sportsData);
          setSelectedCoach(sportsData.coachName.map(coa => coa.id));
          console.log(selectedCoach) 
          setValue(sportsData.isActive)
        })
        .catch((error) => {
          console.error('Error fetching Sport:', error);
        });
    }
  }, [sportsId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSports({ ...sports, [name]: value });
  };

//   const handleCheckboxChange = (id) => {
//     if (selectedCoach.includes(id)) {
//         setSelectedCoach(selectedCoach.filter(subjectId => subjectId !== id));
//     } else {
//         setSelectedCoach([...selectedCoach, id]);
//     }
//   };

const handleSubmit = (e) => {
    e.preventDefault();

    // Send only the selected coach ID
    axios({
      method: 'post',
      url: `${BASE_URL}/sports/saveSports`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: sportsId,
        sportsName: sports.sportsName,
        userId: selectedCoach.id, // Send selected coach ID
        startedYear: sports.startedYear,
        isActive: value
      },
    })
      .then((response) => {
        toast.success('Sport updated successfully!');
        onSuccess();
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to update Sport.');
        console.error('Error updating Sport:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Sport</h2>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="sportsName" className="block text-gray-700 text-sm font-bold mb-2">Sport Name</label>
            <input
              type="text"
              id="sportsName"
              name="sportsName"
              value={sports.sportsName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Sports name"
              required
            />
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
              type="Number"
              id="startedYear"
              name="startedYear"
              value={sports.startedYear}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.startedYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            //   {...register('startedYear', { required: 'startedYear is required' })}
            />
            {/* {errors.startedYear && <p className="text-red-500 text-sm mt-1">{errors.startedYear.message}</p>} */}
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
    </div>
  );
}

export default EditSports;
