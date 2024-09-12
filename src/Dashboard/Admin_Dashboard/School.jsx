import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import edit from '../../assets/edit.png';
import AddSchoolPopup from './AddSchoolPopup';
import EditSchoolPopup from './EditSchoolPopup';

function School() {
  const [data, setData] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditSchoolId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditSchoolId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/school/getSchoolList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        onClick={openAddPopup}
        className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
        Add School
      </button>

      <div className='rounded-2xl'>
        <table className='mt-20 text-black w-4/5 mx-10'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>House Number</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Pin Code</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.houseNumber}</td>
                <td>{item.street}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.pinCode}</td>
                <td>{item.country}</td>
                <td>
                  <button
                    onClick={() => openEditPopup(item.id)}
                    className='p-1 bg-blue-500 text-white rounded ml-2'>
                    <img src={edit} className='h-4 w-6' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSchoolPopup 
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditSchoolPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        schoolId={editSchoolId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default School;
