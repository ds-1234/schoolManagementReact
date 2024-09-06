import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './Table.css';
// import { Link } from 'react-router-dom';
import edit from '../../../assets/edit.png';
import AddSchoolPopup from './AddSchoolPopup';
import EditSchoolPopup from './EditSchoolPopup';
// import DataTable from 'react-data-table-component';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'

function School() {

const column = [
  {
    name: 'SR.No',
    selector: (row , idx) => idx+1,
    sortable: false,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'School Number',
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
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button
        // onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
    ),
  },
]

  const [school, setSchool] = useState([]);
  const [filterSchool, setFilterSchool] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState(null);

  const [selectedColumn, setSelectedColumn] = useState(''); 
  const [searchValue, setSearchValue] = useState('');

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

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/school/getSchoolList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setSchool(response.data.data);
        console.log('Data from API:', response.data.data);
        console.log('Data from schooldata', school);
        setFilterSchool(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSchool(school);  
    setFilterSchool(school); 
  }, []);

  // const handleFilter = (event) => {
  //    const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
  //    setSchool(newData);
  // }

  const handleSearch = (event, type) => {
    if (type === 'column') {
      setSelectedColumn(event.target.value); // Set selected column
    } else if (type === 'query') {
      setSearchValue(event.target.value); // Set search query
    } else if (type === 'button') {
      // search filter when the search button is clicked
      const filteredData = filterSchool.filter((row) =>
        row[selectedColumn]?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSchool(filteredData); // Update data
    }
  };

  const handleClear = () => {
    setSchool(filterSchool);  // Reset to original data
  };
  
  const searchOptions = [
    { label: 'School Name', value: 'name' },
    { label: 'School Number', value: 'houseNumber' },
    { label: 'Street', value: 'street' },
    { label: 'State', value: 'state' },
    { label: 'City', value: 'city' },
    { label: 'Pincode', value: 'pinCode' },
    { label: 'Country', value: 'country' }
  ];

  return (
    <div className='pl-0'>
        <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Schools</h1>
      <Table
         columns={column}
         data={school}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear={handleClear}
         onAddClick={openAddPopup}
      />
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
