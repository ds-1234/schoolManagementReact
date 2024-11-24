import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../conf/conf";
import guestImg from '../../assets/Icons/guest.png'
import adminImg from '../../assets/Icons/user-gear.png'
import parentImg from '../../assets/Icons/family.png'
import stdImg from '../../assets/Icons/graduates.png'
import tchImg from '../../assets/Icons/teacher.png'
import Attendance from "./Dashboard_components/Attendance";
import Events from "./Dashboard_components/Events";

function Admin() {
  const [tileData, setTileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'))

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/adminDashboard/getCount`
        );
        setTileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


   // Map images to user types
   const userTypeImages = {
    Guest: guestImg,
    Parents: parentImg,
    Teacher: tchImg,
    Admin: adminImg,
    Student: stdImg,
  };

  // Render Tiles
  const renderTiles = () => {
    if (!tileData) return <p>No data available</p>;

    return Object.entries(tileData.data).map(([key, value]) => (
      <div
        key={key}
        className="p-4 py-8 rounded-lg bg-white flex flex-col items-center shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-200"
      >
        <div className="flex items-center justify-center gap-2">
          {/* Image */}
        <img
          src={userTypeImages[key]}
          alt={key}
          className="w-16 h-14 mb-4"
        />

        {/* User Type */}
        <h3 className="text-lg font-bold text-blue-950">{key}</h3>

        {/* Total Count */}
        <p className="text-lg font-bold text-blue-950">{value.totalCount}</p>
        </div>

        

        {/* Active/Inactive Counts */}
        <div className="flex justify-between w-full mt-2 border-t-2 border-gray-200">
          <p className="text-sm text-green-600 pt-2">Active: {value.activeCount}</p>
          <p className="text-sm text-red-600 pt-2">Inactive: {value.inactiveCount}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admin Dashboard</h1>
       <p className=' mt-2'>Dashboard / <span className='text-[#ffae01] font-semibold'>Admin</span></p>

      {/* Welcome Section */}
      <div className="bg-[#ffae01] text-white px-6 py-4 rounded-md mb-6 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Welcome Back , {user.gender === 'Female' ? 'Ms.' : 'Mr.'} {user.firstName} </h2>
          <p>Updated Recently on {tileData?.timestamp}</p>
        </div>
        <p>Have a Good day at work</p>
      </div>

      {/* Tiles Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading ? <p>Loading...</p> : renderTiles()}
      </div>


      <div className="grid grid-cols-2 gap-4">
        {/*Event Schedule Section*/ }
      <Events userTypeImages={userTypeImages} />

      {/* Attendance View */}
      <Attendance />
      </div>
    </div>
  );
}

export default Admin;
