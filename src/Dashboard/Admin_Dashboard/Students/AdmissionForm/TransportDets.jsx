import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';

function TransportDets({handleNextStep , currentStep}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    const [transports , setTransports] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [selectedRoute, setSelectedRoute] = useState('')
    const navigate = useNavigate()

    const fetchTransportOptions = async() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/transport/getTransportList',
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then((response) => {
            setTransports(response.data.data);
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
        };

        const fetchVehicleNum = (routeId) => {
        console.log(routeId);
        
        if (!routeId) return;

        axios({
            method: "GET",
            url: `http://localhost:8080/transport/getTransport/${routeId}`,
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => {
            console.log(response.data.data);
            
            const { vehicleNumber } = response.data.data;
            setVehicleNumber(vehicleNumber);
            console.log(vehicleNumber);
            
            setValue('vehicleNumber', vehicleNumber); // Set the value in the form
            })
            .catch((error) => {
            console.error("Error fetching vehicle number:", error);
            });
        };

    useEffect(() => {
        fetchTransportOptions() ;
        fetchVehicleNum(selectedRoute) ;
    })

    
  const handleRouteChange = (e) => {    
    const selectedRouteId = e.target.value;
    setSelectedRoute(selectedRouteId)
    fetchVehicleNum(selectedRouteId);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (handleNextStep) {
      handleNextStep(currentStep);
    } else {
      console.error("handleNextStep is not defined");
    }
  };
  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
        <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Transport Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
          <div className="flex flex-col px-1">
        <label htmlFor="route">Route Name</label>
        <select
          id="route"
          className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
          onMouseLeave={handleRouteChange}
          {...register('routeName')}
        >
        <option value="" hidden>Select Route</option>
          {transports.map((option) => (
            <option key={option.id} value={option.id}>
              {option.routeName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col px-1">
        <label htmlFor="vehicleNumber">Vehicle Number</label>
        <input
          type="text"
          id="vehicleNumber"
          value={vehicleNumber} // Bind the state value here
          readOnly // Make the field read-only
          className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
          {...register('vehicleNumber')}
        />
      </div>

          <div className="flex flex-col px-1">
            <label htmlFor="pickupPoint">Pickup Point</label>
            <input
              type="text"
              id="pickupPoint"
              placeholder=""
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('pickupPoint')}
            />
          </div>
        <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin/allStudents')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
    </form>
    </div>
  )
}

export default TransportDets