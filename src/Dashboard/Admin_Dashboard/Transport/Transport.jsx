import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { useNavigate } from 'react-router-dom';
import StatusButton from '../../../Reusable_components/StatusButton';
import EditTransport from './EditTransport';


function Transport() {

const column = [
  {
    name: 'Route Name',
    selector: row => row.routeName,
    sortable: true,
  }, 
  {
    name: 'Vehicle Number',
    selector: row => row.vehicleNumber,
    sortable: true,
  },
  {
    name: 'Driver Name',
    selector: row => row.driverName,
    sortable: true,
  },
  {
    name: 'Driver License',
    selector: row => row.licenseNumber,
    sortable: true,
  },
  {
    name: 'Status' ,
    selector: row => (
      <StatusButton isActive={row.isActive}/>
    ) ,
    sortable: true 
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
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

  const navigate = useNavigate() ;
  const [transport, setTransport] = useState([]);
  const [filterTransport, setFilterTransport] = useState([]);
  const [editTransportId, setEditTransportId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);



  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/transport/getTransportList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setTransport(response.data.data);
        console.log('Data from API:', response.data.data);
        console.log('Data from transportData', transport);
        setFilterTransport(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTransport(transport);  
    setFilterTransport(transport); 
  }, []);

  const openEditPopup = (id) => {
    setEditTransportId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditTransportId(null);
    setIsEditPopupOpen(false);
  };

  const searchOptions = [
    { label: 'Route Name', value: 'routeName' },
    { label: 'Vechile No.', value: 'vehicleNumber' },
    { label: 'Driver Name', value: 'driverName' },
    { label: 'License No.', value: 'licenseNumber' },
    { label: 'Phone Number', value: 'phone' },
  ];

   // Handle Search Logic
   const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setTransport(filterTransport);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterTransport.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setTransport(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    setTransport(filterTransport);  // Reset to original data
  };

  const handleAddClick = () => {
    navigate('/admin/AddTransport')
  }

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Transport Lists</h1>

      <Table
         columns={column}
         data={transport}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
         onAddClick={handleAddClick}
      />

      <EditTransport 
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        transportId={editTransportId}
        onSuccess={fetchData}
      />
      
    </div>
  );
}

export default Transport;