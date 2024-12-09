import React, { useEffect, useState } from 'react';
import axios from 'axios';
import maleImg from '../../assets/man.png';
import femaleImg from '../../assets/woman.png';
import BASE_URL from '../../conf/conf';
import StatusButton from '../../Reusable_components/StatusButton';
import { NavLink } from 'react-router-dom';

function Children() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [childrenDetails, setChildrenDetails] = useState([]);
  const [classData, setClassData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user.isParent) {
          const childPromises = user.isParent.map((child) =>
            axios.get(`${BASE_URL}/user/getUser/${child}`)
          );
          const childrenData = await Promise.all(childPromises);
          const childrenDetailsArray = childrenData.map((childRes) => childRes.data.data);
          setChildrenDetails(childrenDetailsArray);

          for (const child of childrenDetailsArray) {
            const classResponse = await axios.get(`${BASE_URL}/class/getClass/${child.className}`);
            setClassData((prev) => ({ ...prev, [child.userId]: classResponse.data.data }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 mt-4">
      <h2 className="text-2xl font-semibold text-black">Children Details</h2>
      <p className="mt-2 mb-10">
        <NavLink to="/parentsDashboard">Dashboard </NavLink>/
        <span className="text-[#ffae01] font-semibold"> Children</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {childrenDetails.map((child, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-blue-600 font-semibold">{child.admissionNumber}</p>
              <StatusButton isActive={child.isActive} />
            </div>
            <div className="flex items-center gap-6">
              <img
                src={child.gender === 'Male' ? maleImg : femaleImg}
                alt="Child"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {child.firstName} {child.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {classData[child.userId]?.name}, {classData[child.userId]?.section}
                </p>
              </div>
            </div>
            <div className="mt-10 mb-10 text-md text-gray-700">
              <p className="flex gap-2">
                <strong>Roll No:</strong> {child.rollNumber}
              </p>
              <p className="flex gap-2">
                <strong>Gender:</strong> {child.gender}
              </p>
              <p className="flex gap-2">
                <strong>Joined:</strong>{' '}
                {new Date(child.admissionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Add Fees
              </button>
              {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                View Details
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Children;
