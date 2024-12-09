import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import CricketSt from '../../../assets/cricket.jpg';
import FootballSt from '../../../assets/Football.jpg';
import SportSt from '../../../assets/Sports.jpg';
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';


// Sports to image mapping
const sportsImageMap = {
    'Cricket': CricketSt,
    'Football': FootballSt,
    // 'Tennis': tennisImage,
    // Add other sports and their images here
  };

const StdSports = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        // Fetch playerlist data from API
        const response = await axios.get(`${BASE_URL}/players/getPlayersList`);
        
        // Log the user data to check if it's being fetched correctly
        console.log(user,'user');
        console.log(response.data.data,'dataresponse')

        // Filter the response data based on user className and section
        const filteredData = response.data.data.filter(item => item.userId === user.id );

        // Set the filtered sports data
        setPlayer(filteredData); 
        console.log(filteredData,'filtered');
      }
       catch (error) {
        setError(error.message || 'Something went wrong'); 
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPlayer();
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
    <p className='mt-2'><NavLink to = '/studentDashboard'> Dashboard </NavLink>/  <span className='text-[#ffae01] font-semibold'>Sports</span> </p>
    <div className='grid grid-cols-2 gap-4 mt-10 mb-5'>{console.log(player,'player')}
        {player.map((item, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden w-60 h-200 hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
            // onClick={() => navigate(`/sports/${item.sportsName}`)}
          >
            <img 
              src={sportsImageMap[item.sportsName.sportsName] || SportSt} 
              alt="Sport" 
              className="w-full h-80 object-cover px-4 py-2" 
            />
            <div className="p-2 text-center">
              <h3 className="text-md font-semibold">{item.sportsName.sportsName}</h3>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default StdSports;
