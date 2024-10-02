import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../Reusable_components/Table';
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../Reusable_components/StatusButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import downloadFile from '../../../assets/utils/download'

function Homework() {

  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx+1,
      // sortable: true,
      width: '100px' 
    },
    {
      name: 'ID',
      selector: row => row.homeworkId,
      sortable: true,
      width: '100px' 
    },
    {
      name: 'Class',
      selector: row => row.className.name,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Section',
      selector: row => row.className.section,
      sortable: true,
      // width: '80px'
    },
    {
      name: 'Subject',
      selector: row => row.subjectName.subject,
      sortable: true,
      // width: '100px'
    },
    {
      name: 'Homework Date',
      selector: row => new Date(row.homeworkDate).toLocaleDateString('en-GB'),
      sortable: true,
      //  width: '150px'
    },
    {
      name: 'Submission Date',
      selector: row => new Date(row.submissionDate).toLocaleDateString('en-GB'),
      sortable: true,
      //  width: '150px'
    },
    {
        name: 'Created By',
        selector: row => row.user.firstName + " " + row.user.lastName,
        sortable: true,
        width: '150px'
    },
    {
      name: 'Status',
      selector: row => (
        <StatusButton isActive={row.isActive}/>
      ),
      sortable: true,
      width: '130px'
    },
    {
        name: 'Action',
        cell: row => (
          <button
            // onClick={() => downloadFile(row.attachmentPath)}
            className="text-blue-500 underline"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        ),
        sortable: false,
        width: '100px'
      },
  ]

  const [homework, setHomework] = useState([]);
  const [filterHomework, setFilterHomework] = useState([]);


  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/homework/getHomeworkList',
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
        selectedFields.some((field) => {
          let fieldValue = '';
          
          // Manually handle nested properties
          if (field === 'class') {
            fieldValue = row.className?.name;
          } else if (field === 'section') {
            fieldValue = row.className?.section;
          } else if (field === 'subject') {
            fieldValue = row.subjectName?.subject;
          } else if (field === 'name') {
            fieldValue = row.user?.firstName;
          } else {
            // For non-nested fields, access directly
            fieldValue = row[field];
          }
    
          // Check if the field value matches the query
          return fieldValue && fieldValue.toString().toLowerCase().includes(query.toLowerCase());
        })
      );
  
    setHomework(filteredData);
  };

// handle clear button logic
const handleClear = () => {
  setHomework(filterHomework);  // Reset to original data
};

const searchOptions = [
  { label: 'Homework ID', value: 'homeworkId' },
  { label: 'Class', value: 'class' },
  { label: 'Section', value: 'section' },
  { label: 'Subject', value: 'subject' },
  { label: 'Homework Date', value: 'homeworkDate' },
  { label: 'Submission Date', value: 'submissionDate' },
  { label: 'Created By', value: 'name' },
  { label: 'Attachment Name', value: 'attachmentName' },
  { label: 'Status', value: 'isActive' },
];

  return (
    <div className=' h-full mb-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Class Home Work</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Homework</span> </p>

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