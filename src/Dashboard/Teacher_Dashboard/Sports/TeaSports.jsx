import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import CricketSt from '../../../assets/cricket.jpg';
import FootballSt from '../../../assets/Football.jpg';
import SportSt from '../../../assets/Sports.jpg';
import { NavLink } from 'react-router-dom';


// Sports to image mapping
const sportsImageMap = {
    'Cricket': CricketSt,
    'Football': FootballSt,
    // 'Tennis': tennisImage,
    // Add other sports and their images here
  };

const TeaSports = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        // Fetch sportlist data from API
        const response = await axios.get(`http://localhost:8080/sports/getSportsList`);
        
        // Log the user data to check if it's being fetched correctly
        console.log(user,'user');

        // Filter the response data based on user className and section
        const filteredData = response.data.data.filter(item => 
          item.coachName.userId === user.userId
        );

        // Set the filtered sports data
        setCoach(filteredData); 
        console.log(filteredData,'filtered');
        console.log(coach,'coach');
      } catch (error) {
        setError(error.message || 'Something went wrong'); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, []); // Dependency array includes user to refetch if user changes

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error:</div>; 
  }

  return (
<div className='flex flex-col justify-start pl-0'>
    <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Sports</h1>
    <p className='mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher </NavLink>/  <span className='text-[#ffae01] font-semibold'>Sports</span> </p>
    <div className='flex items-center justify-center mt-10 mb-5 gap-5'>
      {/* Sport Tile */}
      <div 
        className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
        onClick={() => navigate('/admin/classes')}>
        <img 
        src={sportsImageMap[coach[0].sportsName] || SportSt} 
        alt="Sport" 
        className="w-full object-cover px-4 py-4" />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold"> {coach[0].sportsName} </h3>
        </div> 
      </div>


    </div>
    </div>
  );
};

export default TeaSports;
