import React, { useEffect , useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import ProgressIndicator from './ProgressIndicator'
import { useStepContext } from '../../../../hooks/StepContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../../conf/conf';

function TransportDets() {
  const { currentStep, handleNextStep , handlePrevStep } = useStepContext();
  const {userId} = useUserContext() ;
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

    useEffect(() => {
      // Fetch the existing student details if available
      const fetchStudentDetails = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
              const studentData = response.data.data;

              if (studentData) {
                  // If data exists, populate the form
                  reset(studentData);
              }
          } catch (error) {
              console.error('Error fetching student details:', error);
          }
      };

      fetchStudentDetails();
  }, [reset]);

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
            
            setValue('vehicleNumber', vehicleNumber); // Set the value in the form
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

  useEffect(() => {
    // Fetch the existing student details if available
    const fetchStudentDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/getStudentDetails/${userId}`);
            const studentData = response.data.data;

            if (studentData) {
                // If data exists, populate the form
                reset(studentData);
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

      fetchStudentDetails();
}, [reset , userId]);

  const onSubmit = async (data) => {
    console.log(data);
    
    const userData = {
        ...data , 
        userId : userId ,
      }
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
          handleNextStep()
          reset()
      })
      .catch(err=>{
          console.log(err,'error:')
          reset()
      })
}
  return (
    <div>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admission Form</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <NavLink to = '/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'>Admission form</span> </p>
       <ProgressIndicator currentStep={currentStep} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
        <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Transport Information</h2>
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
    <div className='flex justify-between items-center'>
    <button onClick={() => handlePrevStep()}>
      <h1 className='mt-6 font-semibold text-medium cursor-pointer'>
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
      </h1>
    </button>
        <div className="col-span-2 flex justify-end space-x-4 mt-5">
            <Button type='submit' label="Save & Continue" className='' onClick={handleSubmit(onSubmit)} />
            <Button onClick={() => {
                reset() 
                navigate('/admin/allStudents')
            }} 
            label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
    </div>
    </div>
    </div>
  )
}

export default TransportDets