import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';


const AddHostelRooms = ({ isOpen, onClose }) => {
  const [value, setValue] = useState(true);
  const [hostels, setHostels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Fetch hostels and room types
  const fetchHostels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/hostel/getHostelList`);
      const data = response.data.data.filter(data => data.isActive === true);
      
      setHostels(data);
    } catch (error) {
      toast.error("Error fetching hostels");
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/roomType/getRoomTypeList`);
      const data = response.data.data.filter(data => data.isActive === true);

      setRoomTypes(data);
    } catch (error) {
      toast.error("Error fetching room types");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setValue(true)
      setHostels([])
      setRoomTypes([])
      setSelectedRoomType(null)
      setSelectedHostel(null)
      reset();
      fetchHostels();
      fetchRoomTypes();
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Handle form submission
  const onSubmit = (data) => {
    const postData = {
      hostelRoomNumber: data.hostelRoomNumber,
      hostelName: { id: selectedHostel?.id },
      roomType: { id: selectedRoomType?.id },
      numOfBeds: data.numOfBeds,
      costPerBed: data.costPerBed,
      isActive: value,
    };

    axios.post('http://localhost:8080/hostelRooms/saveHostelRooms', postData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        toast.success('Successfully added hostel room');
        reset();
        onClose();
      })
      .catch(err => {
        console.error('Error:', err);
        toast.error('Error adding new hostel room');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Add Hostel Room</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hostel Room Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hostel Room Number</label>
            <input
              type="text"
              {...register('hostelRoomNumber', { required: true })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.hostelRoomNumber && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Hostel Name Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hostel Name</label>
            <select
              onChange={e => setSelectedHostel(hostels.find(h => h.id === parseInt(e.target.value)))}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Hostel</option>
              {hostels.map(hostel => (
                <option key={hostel.id} value={hostel.id}>{hostel.hostelName}</option>
              ))}
            </select>
          </div>

          {/* Room Type Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Room Type</label>
            <select
              onChange={e => setSelectedRoomType(roomTypes.find(rt => rt.id === parseInt(e.target.value)))}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select Room Type</option>
              {roomTypes.map(room => (
                <option key={room.id} value={room.id}>{room.roomTypeName}</option>
              ))}
            </select>
          </div>

          {/* Number of Beds */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Number of Beds</label>
            <input
              type="number"
              {...register('numOfBeds', { required: true, min: 1 })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.numOfBeds && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Cost Per Bed */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cost Per Bed</label>
            <input
              type="number"
              {...register('costPerBed', { required: true, min: 0 })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.costPerBed && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Active Toggle */}
          <div className="mb-4 flex items-center">
            <label className="text-sm font-medium mr-2">Active</label>
            <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
              />          </div>

          <Button type="submit" className="w-full mt-4">Submit</Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddHostelRooms;
