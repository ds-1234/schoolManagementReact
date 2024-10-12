import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';

function HostelDets({handleNextStep}) {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const [hostels , setHostels] = useState([])
      const [hostelRoom , setHostelRoom] = useState([])

    const fetchHostelOptions = () => {
        axios({
          method: "GET",
          url: `http://localhost:8080/hostel/getHostelList`,
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
          url: `http://localhost:8080/hostelRooms/getHostelRoomsList`,
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
      })

      const onSubmit = (data) => {
        console.log(data);
        handleNextStep()
        navigate('/admin/uploadDocs')
    }
  return (
    <div className='bg-white mt-10 p-5 rounded-xl'>
        <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Hostel Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
          <div className="flex flex-col px-1">
            <label htmlFor="building">Building Name</label>
            <select
              id="building"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('building')}
            >
              <option value="" hidden>Select Hostel </option>
              {hostels.map(option => (
                <option key={option.hostelId} value={option.hostelId}>{option.hostelName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="hostelRoomNumber">Room Number</label>
            <select
             type="text"
             id="hostelRoomNumber"
             placeholder=""
             className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('hostelRoomNumber')}
            >
              <option value="" hidden>Select Room </option>
              {hostelRoom.map(option => (
                <option key={option.hostelRoomId} value={option.hostelRoomId}>{option.hostelRoomNumber}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
        </form>
    </div>
  )
}

export default HostelDets