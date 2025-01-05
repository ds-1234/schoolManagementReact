import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Reusable_components/Loader';

function TransportInfo({ handlePrevious , handleNext , userId , userName , currentStep , selectedRole}) {

  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
    const [transports , setTransports] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [selectedRoute, setSelectedRoute] = useState('')
    const [loading, setLoading] = useState(false);


    const fetchTransportOptions = async() => {
        await axios({
            method: 'GET',
            url: `${BASE_URL}/transport/getTransportList`,
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

        const fetchVehicleNum = async(routeId) => {
        console.log(routeId);
        
        if (!routeId) return;

        await axios({
            method: "GET",
            url: `${BASE_URL}/transport/getTransport/${routeId}`,
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => {
            console.log(response.data.data);
            
            const { vehicleNumber } = response.data.data;
            setVehicleNumber(vehicleNumber);
            console.log(vehicleNumber);
            
            // setValue('vehicleNumber', vehicleNumber); // Set the value in the form
            })
            .catch((error) => {
            console.error("Error fetching vehicle number:", error);
            });
        };

    useEffect(() => {
        fetchTransportOptions() ;
        fetchVehicleNum(selectedRoute) ;
    } , [])

    
  const handleRouteChange = (e) => {    
    const selectedRouteId = e.target.value;
    setSelectedRoute(selectedRouteId)
    fetchVehicleNum(selectedRouteId);
  };


  const onSubmit = async (data) => {
    setLoading(true); // Start loader
    const userData = {
        ...data ,
        routeName : parseInt(data.routeName) , 
        userId : userName ,
      }
      if(data.routeName){
        await axios({
          method:"Post",
          url : `${BASE_URL}/user/updateTransportDetails`,
          data: userData ,
          headers: {
            "Content-Type": "application/json",
          },
      
        })
        .then((response)=>{
          console.log('response' , response.data.data)
          handleNext()
          reset()
      })
      .catch(err=>{
          console.log(err,'error:')
      }).finally(()=> {
        setLoading(false); // Stop loader
      });
    }else{
        handleNext()
      }
}

useEffect(() => {
  // Fetch the existing teacher details if available
  const fetchDetails = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
          const data = response.data.data;

          if (data) {
              // If data exists, populate the form
              reset(data);
          }
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  };

    fetchDetails();
}, [reset , userId]);

const navigate = useNavigate()
  return (
    <div>
            <Loader isLoading={loading} /> {/* Use Reusable Loader */}
        <h2 className="col-span-4 mt-8 text-xl font-semibold text-gray-900">Transport Information</h2>
        <form  className="grid grid-cols-4 mt-5 gap-6">
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
    </form>

    <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
        <button
          onClick={handleSubmit(onSubmit)}
          className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
        >
          Save & Continue 
        </button>
            <Button onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>
    </div>
  )
}

export default TransportInfo