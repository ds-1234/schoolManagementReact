import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Reusable_components/Loader';

function HostelInfo({ handlePrevious , handleNext , userId , userName , currentStep , selectedRole}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const [hostels , setHostels] = useState([])
      const [hostelRoom , setHostelRoom] = useState([])
  const [loading, setLoading] = useState(false);

    const fetchHostelOptions = () => {
        axios({
          method: "GET",
          url: `${BASE_URL}/hostel/getHostelList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setHostels(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      const fetchData = () => {
        axios({
          method: "GET",
          url: `${BASE_URL}/hostelRooms/getHostelRoomsList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setHostelRoom(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };


      useEffect(() => {
        fetchHostelOptions() ;
        fetchData() ;
      } , [])

      useEffect(() => {
        // Fetch the existing teacher details if available
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
                const data = response.data.data;

                if (data) {
                    // If data exists, populate the form
                    reset({
                      buildingName: data.buildingName, 
                      roomNumber: data.roomNumber,    
                    });
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

          fetchDetails();
    }, [reset , userId]);


      const onSubmit = async (data) => {
        setLoading(true); // Start loader
        const userData = {
            buildingName : parseInt(data.buildingName) ,
            roomNumber :  parseInt(data.roomNumber)  , 
            userId : userName ,
          }
          
          if(data.buildingName){
            await axios({
              method:"Post",
              url : `${BASE_URL}/user/updateHostelDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              // console.log('response' , response.data.data)
              handleNext()
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
          }).finally(()=> {
            setLoading(false); // Stop loader
          });
        }else{
            handleNext();
            setLoading(false); // Stop loader
          }

    }

    const navigate = useNavigate() ;

  return (
    <div>
            <Loader isLoading={loading} /> {/* Use Reusable Loader */}
        <h2 className="col-span-4 mt-8 font-semibold text-gray-900 text-xl">Hostel Information</h2>
        <form  className="grid grid-cols-4 mt-5 gap-6">
          <div className="flex flex-col px-1">
            <label htmlFor="buildingName">Building Name</label>
            <select
              id="buildingName"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('buildingName')}
            >
              <option value="" hidden>Select Hostel </option>
              {hostels.map(option => (
                <option key={option.hostelId} value={option.id}>{option.hostelName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="roomNumber">Room Number</label>
            <select
             id="roomNumber"
             className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('roomNumber')}
            >
              <option value="" hidden>Select Room </option>
              {hostelRoom.map(option => (
                <option key={option.hostelRoomId} value={option.id}>{option.hostelRoomNumber}</option>
              ))}
            </select>
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

export default HostelInfo ;