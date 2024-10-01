import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import AddHomework from './AddHomework';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../Reusable_components/StatusButton';
import AddBtn from '../../../Reusable_components/AddBtn'


function Homework() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: true,
      width: '100px'
    },
    {
      name: 'ID',
      selector: row => row.homeworkId,
      sortable: true,
      // width: '100px'
    },
    {
      name: 'Class',
      selector: row => row.className.name,
      sortable: true,
      // width: '100px'
    },
    {
      name: 'Section',
      selector: row => row.className.section,
      // sortable: true,
      // width: '100px'
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
        name: 'Attachment Name',
        selector: row => row.attachmentName,
        sortable: true,
    },
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
        <div className='flex gap-2'>
        <button
        // onClick={() => openEditPopup(row.id)}
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

  const [homework, setHomework] = useState([]);
  const [filterHomework, setFilterHomework] = useState([]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  // const [editHomeId, setEditHomeId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

//   const openEditPopup = (id) => {
//     setEditHomeId(id);
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setEditHomeId(null);
//     setIsEditPopupOpen(false);
//   };

  useEffect(() => {
    if (isAddPopupOpen || {/*isEditPopupOpen*/}) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen, {/*isEditPopupOpen*/}]);

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/homework/getHomeworkList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data.data);
        setHomework(response.data.data.filter((hm) => hm.user.id == user.id));
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
  { label: 'Created By', value: 'user.firstName' },
  // { label: 'Attachment Name', value: 'attachmentName' },
  { label: 'Status', value: 'isActive' },
];

  return (
    <div className='h-full mb-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Class Home Work</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/teacherDashboard'> Teacher </NavLink>/ <span className='text-[#ffae01] font-semibold'>Homework</span> </p>
      <AddBtn onAddClick={openAddPopup}/>
      <Table
      columns={column}
      data={homework}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
       />

      <AddHomework
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      {/*<EditBookPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        bookId={editHomeId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
}

export default Homework;

