import axios from 'axios';
import React, { useEffect, useState } from 'react';
import view from '../../../assets/file.png'
import edit from '../../../assets/edit.png'
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';


function AllStudents() {

const column = [
  {
    name: 'SR.No',
    selector: (row , idx) => idx+1,
    sortable: false,
    width: '100px'
  }, 
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
    width: '140px'
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
    width: '140px' 
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
    width : '150px' ,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        <button
        onClick={() => navigate('/admin/studentDetails' , {state: {userId : row.userId}})}
      >
        <img src={view} alt="view" className='h-8' />
      </button>

      <button>
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
      url: `${BASE_URL}/user/getUserList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const users = response.data.data.filter((user) => user.role === 3) ;
        setUser(users.filter((user) => user.isActive === true));
        setFilterUser(users.filter((user) => user.isActive === true))
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
      return row[field]?.toLowerCase().includes(query.toLowerCase())
    }
    )
  );
  
    setUser(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    setUser(filterUser);  // Reset to original data
  };

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Students</h1>
       <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Students</span> </p>

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

export default AllStudents;