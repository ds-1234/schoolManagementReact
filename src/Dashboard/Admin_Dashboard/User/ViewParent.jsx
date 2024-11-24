import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import maleImg from '../../../assets/man.png';
import femaleImg from '../../../assets/woman.png';
import BASE_URL from '../../../conf/conf';
import StatusButton from "../../../Reusable_components/StatusButton"

const ViewParent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state; // Get user ID from the route state
  const [user, setUser] = useState(null);
  const [childrenDetails, setChildrenDetails] = useState([]); 
  const [classData , setClassData] = useState({})

  // Fetch user data based on userId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUser/${userId}`);
        const userData = response.data.data;
        setUser(userData);

        if (userData.isParent) {
          // Fetch each child's details
          const childPromises = userData.isParent.map(child =>
            axios.get(`${BASE_URL}/user/getUser/${child}`)
          );

          const childrenData = await Promise.all(childPromises);
          const childrenDetailsArray = childrenData.map(childRes => childRes.data.data);
          setChildrenDetails(childrenDetailsArray);
          

          // Fetch class details for each child
          for (const child of childrenDetailsArray) {
            const classResponse = await axios.get(`${BASE_URL}/class/getClass/${child.className}`);
            setClassData(prev => ({ ...prev, [child.userId]: classResponse.data.data }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
    
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className='mx-10'>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Parent Details</h2>
        <div className='flex justify-between items-center'>
          <div className="flex items-center mb-6 mt-4">
            <img 
              src={user.gender === "Male" ? maleImg : femaleImg} 
              alt="Profile" className="w-16 h-16 rounded-full mr-4" 
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-gray-600 mt-1">{user.houseNumber}, {user.street}, {user.city}, {user.state}, {user.country}</p>
            </div>
          </div>
          <div className="mb-6">
            <p><strong className='text-gray-900'>Email:</strong> {user.email}</p>
            <p><strong className='text-gray-900'>Phone:</strong> {user.phone}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">Children Details</h3>
        {childrenDetails.map((child, index) => (
          <div key={index} className="p-4 px-6 bg-gray-100 rounded-lg mb-4">
           <div className='flex justify-between items-center mb-2'>
           <p className='text-blue-800 font-semibold'> {child.admissionNumber}</p>
           <StatusButton isActive={child.isActive} />
           </div>
           <div className='border-t-2 text-gray-200'></div>

          <div className='flex items-center justify-between'>
            <div className="flex items-center mb-2 mt-4 ">
              <img src={child.gender === "Male" ? maleImg : femaleImg} alt="Child" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className='flex flex-col'><strong>{child.firstName} {child.lastName}</strong>{classData[child.userId]?.name}, {classData[child.userId]?.section}</p>
              </div>
            </div>
            <p className="flex flex-col"><strong>Roll No: </strong>{child.rollNumber}</p>
            <p className="flex flex-col"><strong>Gender:</strong> {child.gender}</p>
            <p className="flex flex-col"><strong>Date of Joined:</strong> {new Date(child.admissionDate).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-2">
              {/* <button className="px-4 py-1 bg-green-500 text-white rounded-lg">Add Fees</button> */}
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                onClick={() => navigate('/admin/studentDetails', { state: {userId: child.userId } })}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ViewParent;
