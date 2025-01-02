import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import CricketSt from '../../../assets/cricket.jpg';
import FootballSt from '../../../assets/Football.jpg';
import SportSt from '../../../assets/Sports.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';


// Sports to image mapping
const sportsImageMap = {
    'Cricket': CricketSt,
    'Football': FootballSt,
    // Add other sports and their images here
};

const TeaSports = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [coach, setCoach] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        // Fetch sport list data from API
        const response = await axios.get(`${BASE_URL}/sports/getSportsList`);
        
        // Filter the response data based on user ID
        const filteredData = response.data.data.filter(item => 
          item.userId === user.id
        );

        // Set the filtered sports data
        setCoach(filteredData); 
        console.log(filteredData,'filtered');
      } catch (error) {
        setError(error.message || 'Something went wrong'); 
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, []); // Dependency array

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error:</div>; 
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
      <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>Sports</h1>
      <p className='mt-2'><NavLink to='/teacherDashboard'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Sports</span></p>
      <div className='grid grid-cols-2 gap-4 mt-10 mb-5'>
        {coach.map((item, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden w-60 h-200 hover:bg-gray-400 hover:text-white  transition-transform transform hover:scale-105"
            // onClick={() => navigate(`/sports/${item.sportsName}`)}
          >
            <img 
              src={sportsImageMap[item.sportsName] || SportSt} 
              alt="Sport" 
              className="w-full h-80 object-cover px-4 py-2" 
            />
            <div className="p-2 text-center">
              <h3 className="text-md font-semibold">{item.sportsName}</h3>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeaSports;
