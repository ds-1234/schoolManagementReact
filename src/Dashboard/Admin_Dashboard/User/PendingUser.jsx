import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
// import AddUser from './AddUser';
// import EditUser from './EditUser';
import { NavLink, useNavigate } from 'react-router-dom';
import AddBtn from '../../../Reusable_components/AddBtn'
import BASE_URL from '../../../conf/conf';
import { useUserContext } from '../../../hooks/UserContext';
import view from '../../../assets/file.png'

function PendingUser() {
const navigate = useNavigate()
const {setUserId} = useUserContext() 
const column = [
  {
    name: 'SR.No',
    selector: (row , idx) => idx+1,
    sortable: false,
  }, 
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        {
        row.role == 3 ?   
        <button
        onClick={() => navigate('/admin/studentDetails' , {state: {userId : row.userId}})}
        >
        <img src={view} alt="view" className='h-8' />
        </button>
        :
        ''
      }
        <button
        onClick={() => (handleEditClick(row.id , row.role , row.userId))}
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


  const fetchData = async() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/user/getUserList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const pendingUsers = response.data.data.filter(user => (user.isActive === false))
        setUser(pendingUsers);
        console.log('Data from API:', response.data.data);
        console.log('Data from pending userData', pendingUsers);
        setFilterUser(pendingUsers)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUser(user);  
    setFilterUser(user); 
  }, []);

  const searchOptions = [
    {label : 'Role' , value: 'role'} ,
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Gender', value: 'gender' },
  ];

  const roleMapping = {
    1: 'Guest' ,
    2: 'Admin',
    3: 'Student',
    4: 'Teacher',
    5: 'Parents'
  }

  // Handle Search Logic
  const handleSearch = (query, selectedColumn) => {
    if (!query) {
      setUser(filterUser);
      return;
    }
  
    const filteredData = filterUser.filter((row) => {
      if (selectedColumn === 'role') {
        const roleName = roleMapping[row.role];
        return roleName?.toLowerCase().includes(query.toLowerCase());
      }
      return row[selectedColumn]?.toString().toLowerCase().includes(query.toLowerCase());
    });
  
    setUser(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    setUser(filterUser);  // Reset to original data
  };

  const handleClick = () => {
    navigate('/admin/addUser');
  }

  const handleEditClick = (id , role , userId) => {
    console.log('Editing user with ID:', id);
    if(role == 3){
      navigate('/admin/admissionForm')
      setUserId(userId)
    }else{
      navigate('/admin/editUser', {
        state: {
          userId :  id
        }
      }) ;
    }
  }

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Pending Users</h1>
       <p className=' mt-2'><NavLink to = '/admin'> Dashboard </NavLink>/<span className='text-[#ffae01] font-semibold'> Pending Users</span> </p>
       <AddBtn onAddClick={handleClick}/>
      <Table
         columns={column}
         data={user}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
      />
    </div>
  );
}

export default PendingUser;