import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast , ToastContainer} from 'react-toastify';
import Button from '../../../Reusable_components/Button';
import ToggleButton from '../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import BASE_URL from '../../../conf/conf';

function EditTransport({ isOpen, onClose, transportId , onSuccess }) {
  const [value, setValue] = useState(true);
  const { register,formState: { errors }, reset } = useForm();

  const [transport, setTransport] = useState({ 
    routeName: '', 
    vehicleNumber: '' , 
    driverName:'' , 
    licenseNumber:'' , 
    phone:'' ,
    isActive:true 
});

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    // setValue(transport.isActive)

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
  };
}, [onClose]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/transport/getTransport/${transportId}`, 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        let data=response.data.data
        setTransport(data);
        console.log(transport)
        setValue(data.isActive)
      })
      .catch((error) => {
        console.error("Error fetching transport:", error);

      });
  }, [transportId , isOpen,onClose]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransport({ ...transport, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/transport/createTransport`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { id : '${transportId}' , ...transport , isActive:value},
    })
      .then((response) => {
        console.log("Transport updated:", response.data);
        toast.success("Transport updated successfully!")

        onSuccess() ;
        onClose() ;
      })
      .catch((error) => {
        console.error("Error updating transport:", error);
        toast.error('Failed to update transport.')
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
      
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Transport</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Route Name</label>
          <input
            type="text"
            name="routeName"
            value={transport.routeName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Number</label>
          <input
            name="vehicleNumber"
            value={transport.vehicleNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Driver Name</label>
          <input
            name="driverName"
            value={transport.driverName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">License Number</label>
          <input
            name="licenseNumber"
            value={transport.licenseNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            name="phone"
            value={transport.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            name="isActive"
            value={transport.isActive}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option>Active</option>
            <option>Inactive</option>
        </select> */}


              <label className="block text-sm font-medium mb-2 text-black" htmlFor="active">
                Status *
              </label>
              <ToggleButton
                isOn={value}
                handleToggle={() => setValue(!value)}
                onChange={handleChange}
                id="active"
                // label="Active"
                register={register}
              />
            
        </div>

          <Button 
          // label={"Update Transport"}
          type='submit'
          onClick={handleSubmit}
          className='w-full text-center'
          />

      </form>
      </div>
    </div>
  );
}

export default EditTransport;