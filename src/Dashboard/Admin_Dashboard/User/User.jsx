import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
// import AddUser from './AddUser';
// import EditUser from './EditUser';
import { NavLink , useNavigate} from 'react-router-dom';
import AddBtn from '../../../Reusable_components/AddBtn'

function User() {

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
        <button
        onClick={() => (handleEditClick(row.id))}
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
  const navigate = useNavigate()

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/user/getUserList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const activeUsers = response.data.data.filter(user => user.isActive === true) 
        setUser(activeUsers);
        console.log('Data from API:', response.data.data);
        console.log('Data from active userData', activeUsers);
        setFilterUser(activeUsers)
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

  // Handle Search Logic
  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setUser(filterUser);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterUser.filter((row) =>
      selectedFields.some((field) => {
        if (field === 'role') {
          return row.role?.name?.toLowerCase().includes(query.toLowerCase());
        }else{
        return row[field]?.toLowerCase().includes(query.toLowerCase())
        }
      }
      )
    );
  
    setUser(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    setUser(filterUser);  // Reset to original data
  };

  const handleClick = () => {
    navigate('/admin/addUser');
  }

  const handleEditClick = (userId) => {
    console.log('Editing user with ID:', userId);
    navigate('/admin/editUser', {
      state: {
        userId :  userId
      }
    }) ;
  }

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Active Users</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Active_Users</span> </p>
       <AddBtn onAddClick={handleClick}/>
      <Table
         columns={column}
         data={user}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
         onAddClick={handleClick}
      />
    </div>
  );
}

export default User;