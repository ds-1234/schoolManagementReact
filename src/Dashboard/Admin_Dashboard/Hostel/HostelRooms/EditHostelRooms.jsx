import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast} from 'react-toastify';
import Button from '../../../../Reusable_components/Button';
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import BASE_URL from '../../../../conf/conf';
import Loader from '../../../../Reusable_components/Loader';


const EditHostelRooms = ({ isOpen, onClose, hostelroomId, onSuccess }) => {
  const [value, setValue] = useState(true);
  const [hostels, setHostels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoomnum, setSelectedRoomnum] = useState(null);
  const [selectednumofbed, setSelectednumofbed] = useState(null);
  const [selectedcostofbed, setSelectedcostofbed] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue: setFormValue, formState: { errors }, reset } = useForm();

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
console.log(hostelroomId,'hostelroomId')
  // Fetch and pre-fill form data for editing
  const fetchHostelRoomDetails = async () => {
    if (hostelroomId) {
      try {
        const response = await axios.get(`${BASE_URL}/hostelRooms/getHostelRoomsById/${hostelroomId}`);
        const roomData = response.data.data;
        
        // Pre-fill form fields
        console.log(roomData,'roomdata')
        setFormValue('hostelRoomNumber', roomData.hostelRoomNumber || '');
        setFormValue('numOfBeds', roomData.numOfBeds || '');
        setFormValue('costPerBed', roomData.costPerBed || '');
        setSelectedRoomnum(roomData.hostelRoomNumber)
        setSelectednumofbed(roomData.numOfBeds)
        setSelectedcostofbed(roomData.costPerBed)
        setValue(roomData.isActive);
        setSelectedHostel(roomData.hostelName);
        setSelectedRoomType(roomData.roomType);
      } catch (error) {
        toast.error("Error fetching hostel room details");
      }
    }
  };

  useEffect(() => {
    if (isOpen && hostelroomId) {
        document.body.style.overflow = 'hidden';
      fetchHostelRoomDetails();
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
  }, [isOpen, hostelroomId, onClose]);

  // Handle form submission
  const onSubmit = (data) => {
    setLoading(true);
    const postData = {
      id: hostelroomId,
      hostelRoomNumber: data.hostelRoomNumber ,
      hostelName: { id: selectedHostel?.id },
      roomType: { id: selectedRoomType?.id },
      numOfBeds: data.numOfBeds,
      costPerBed: data.costPerBed,
      isActive: value,
    };

    axios.post(`${BASE_URL}/hostelRooms/saveHostelRooms`, postData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        toast.success('Hostel room updated successfully');
        reset();
        onClose();
        if (onSuccess) onSuccess();
      })
      .catch(err => {
        toast.error('Error updating hostel room');
        console.error('Error:', err);
      }).finally(() => {
        setLoading(false); // Stop loader
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <Loader isLoading={loading} /> {/* Use Reusable Loader */}
      <div className="bg-white p-4 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Hostel Room</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Hostel Room Number */}
          <div className="mb-4">
            <label className="block mb-2">Hostel Room Number</label>
            <input
            // defaultValue = {selectedRoomnum}
              {...register('hostelRoomNumber', { required: 'Hostel room number is required' })}
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.hostelRoomNumber && <p className="text-red-500">{errors.hostelRoomNumber.message}</p>}
          </div>
          {/* Dropdown for Hostels */}
          <div className="mb-4">
            <label className="block mb-2">Hostel Name</label>
            <select
              value={selectedHostel?.id || ''}
              onChange={(e) => {
                const hostel = hostels.find(h => h.id === parseInt(e.target.value));
                setSelectedHostel(hostel);
              }}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select a hostel</option>
              {hostels.map(hostel => (
                <option key={hostel.id} value={hostel.id}>{hostel.hostelName}</option>
              ))}
            </select>
          </div>
          {/* Dropdown for Room Types */}
          <div className="mb-4">
            <label className="block mb-2">Room Type</label>
            <select
              value={selectedRoomType?.id || ''}
              onChange={(e) => {
                const roomType = roomTypes.find(rt => rt.id === parseInt(e.target.value));
                setSelectedRoomType(roomType);
              }}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="" disabled>Select a room type</option>
              {roomTypes.map(rt => (
                <option key={rt.id} value={rt.id}>{rt.roomTypeName}</option>
              ))}
            </select>
          </div>
          {/* Number of Beds */}
          <div className="mb-4">
            <label className="block mb-2">Number of Beds</label>
            <input
            // defaultValue = {selectednumofbed}
              {...register('numOfBeds', { required: 'Number of beds is required' })}
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.numOfBeds && <p className="text-red-500">{errors.numOfBeds.message}</p>}
          </div>
          {/* Cost per Bed */}
          <div className="mb-4">
            <label className="block mb-2">Cost per Bed</label>
            <input
            // value='32'
            // defaultValue='235'
            // defaultValue={selectedcostofbed}
              {...register('costPerBed', { required: 'Cost per bed is required' })}
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.costPerBed && <p className="text-red-500">{errors.costPerBed.message}</p>}
          </div>
          {/* Active Toggle */}
          <div className="mb-4 flex items-center">
            <label className="mr-2">Active</label>
            <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                id="active"
              />          </div>
          <Button type="submit">Save Changes</Button>
{          console.log(selectedcostofbed,'sef')
}        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditHostelRooms;
