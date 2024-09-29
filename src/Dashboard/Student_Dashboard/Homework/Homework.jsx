import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../Reusable_components/Table';
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../Reusable_components/StatusButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


function Homework() {

  const column = [
    {
      name: 'ID',
      selector: row => row.homeworkId,
      sortable: true,
    },
    {
      name: 'Class',
      selector: row => row.className.name,
      sortable: true,
    },
    {
      name: 'Section',
      selector: row => row.className.section,
      sortable: true,
    },
    {
      name: 'Subject',
      selector: row => row.subjectName.subject,
      sortable: true,
    },
    {
      name: 'Homework Date',
      selector: row => row.homeworkDate,
      sortable: true,
    },
    {
      name: 'Submission Date',
      selector: row => row.submissionDate,
      sortable: true,
    },
    {
        name: 'Created By',
        selector: row => "",
        sortable: true,
    },
    {
        name: 'Attachment Name',
        selector: row => row.attachmentName,
        sortable: true,
    },
    // {
    // name: 'Attachment Path',
    // selector: row => row.attachmentPath,
    // sortable: true,
    // },
    {
      name: 'Status',
      selector: row => (
        <StatusButton isActive={row.isActive}/>
      ),
      sortable: true,
    },
    {
        name: 'Action',
        cell: row => (
          <button
            // onClick={() => downloadFile(row.attachmentPath)} // Use the reusable function
            // className="text-blue-500 underline"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        ),
        sortable: false,
      },
  ]

  const [homework, setHomework] = useState([]);
  const [filterHomework, setFilterHomework] = useState([]);


  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/homework/getHomework',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setHomework(response.data.data);
        setFilterHomework(response.data.data)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setHomework(homework);  
    setFilterHomework(homework); 
  }, []);



  // Handle Search Logic
  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setHomework(filterHomework);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterHomework.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setHomework(filteredData);
  };

// handle clear button logic
const handleClear = () => {
  setHomework(filterHomework);  // Reset to original data
};

const searchOptions = [
  { label: 'Homework ID', value: 'homeworkId' },
  { label: 'Class', value: 'className.name' },
  { label: 'Section', value: 'className.section' },
  { label: 'Subject', value: 'subjectName.subject' },
  { label: 'Homework Date', value: 'homeworkDate' },
  { label: 'Submission Date', value: 'submissionDate' },
  { label: 'Created By', value: '' },
  { label: 'Attachment Name', value: 'attachmentName' },
  { label: 'Status', value: 'isActive' },
];

  return (
    <div className=' h-full mb-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Class Home Work</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Homework</span> </p>

      <Table
      columns={column}
      data={homework}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
       />
    </div>
  );
}

export default Homework;