import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import AddUser from './AddUser';
import EditUser from './EditUser';

function User() {

const column = [
  {
    name: 'User Sr.No',
    selector: (row , idx) => idx+1,
    sortable: false,
  }, 
  {
    name: 'FirstName',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'LastName',
    selector: row => row.lastName,
    sortable: false,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: false,
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
    sortable: false,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'House Number',
    selector: row => row.houseNumber,
    sortable: true,
  },
  {
    name: 'Street',
    selector: row => row.street,
    sortable: true,
  },
  {
    name: 'City',
    selector: row => row.city,
    sortable: true,
  },
  {
    name: 'State',
    selector: row => row.state,
    sortable: true,
  },
  {
    name: 'Pin Code',
    selector: row => row.pinCode,
    sortable: true,
  },
  {
    name: 'Country',
    selector: row => row.country,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        <button
        onClick={() => openEditPopup(row.id)}
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
    ),
  },
]

  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditUserId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditUserId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/user/getUserList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setUser(response.data.data);
        console.log('Data from API:', response.data.data);
        console.log('Data from userData', user);
        setFilterUser(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (event) => {
     const newData = filterUser.filter(row=>row.firstName.toLowerCase().includes(event.target.value.toLowerCase()))
     setUser(newData) 
  }

  return (
    <div className='pl-0'>
       <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Users</h1>
      <Table
         columns={column}
         data={user}
         handleFilter={handleFilter}
         onAddClick={openAddPopup}
      />
      <AddUser 
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditUser
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        userId={editUserId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default User;