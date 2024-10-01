import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Table from '../../../Reusable_components/Table';
import StatusButton from '../../../Reusable_components/StatusButton';


function StdHolidays() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])


  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/holidays/getHolidaysList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data.data);
        setFilterData(response.data.data) ;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData() ;
  } , []);

  useEffect(() => {
    setData(data);  
    setFilterData(data); 
  }, []);
  
  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    //   width: '280px', 
    },
    {
      name: 'Holiday Title',
      selector: (row) => row.holidayName,
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    {
      name: 'Date',
      selector: (row) => row.holidayDate,
      sortable: true,
      wrap: true,
    //   width: '280px', 
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    //   width: '280px', 
    },
    {
        name: 'Status',
        selector: row => (
          <StatusButton isActive={row.isActive}/>
        ),
        sortable: true,
      },
  ];



const handleSearch = (query, checkboxRefs) => {
  if (!query) {
    setData(filterData);
    return;
  }

  const selectedFields = Object.keys(checkboxRefs)
    .filter((key) => checkboxRefs[key].checked);

  const filteredData = filterData.filter((row) =>
    selectedFields.some((field) =>
      row[field]?.toLowerCase().includes(query.toLowerCase())
    )
  );

  setData(filteredData);
};

// handle clear button logic
const handleClear = () => {
  setData(filterData);  // Reset to original data
};

const searchOptions = [
  { label: 'Holiday Title', value: 'holidayName' },
  { label: 'Date', value: 'holidayDate' },
  { label: 'Description', value: 'description' }
];

  return (
    <div className=' h-full mb-10 mr-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Holidays</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Holidays</span> </p>
      <Table
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      />

    </div>
  );
};


export default StdHolidays