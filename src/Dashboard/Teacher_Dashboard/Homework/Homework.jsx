import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import AddHomework from './AddHomework';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../Reusable_components/StatusButton';
import AddBtn from '../../../Reusable_components/AddBtn'
import BASE_URL from '../../../conf/conf';


function Homework() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [classMap , setClassMap] = useState({}) 
  const [subjectMap , setSubjectMap] = useState({})

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
      selector: row => classMap[row.className]?.name,
      sortable: true,
      // width: '100px'
    },
    {
      name: 'Section',
      selector: row => classMap[row.className]?.section,
      sortable: true,
      // width: '100px'
    },
    {
      name: 'Subject',
      selector: row => subjectMap[row.subject],
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
      url: `${BASE_URL}/homework/getHomeworkList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data.data);
        setHomework(response.data.data.filter((hm) => hm.userId === user.id));
        setFilterHomework(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchCls = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/class/getClassList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data.data);
        const classes = {} ;
        response.data.data.forEach((cls) => {
          classes[cls.id] = cls;
        })
        console.log(classes);
        setClassMap(classes)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const fetchSub = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/subject/getSubjectList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data.data);
        const subjects = {} ;
        response.data.data.forEach((sub) => {
          subjects[sub.id] = sub.subject ;
        })
        console.log(subjects);
        setSubjectMap(subjects)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

 
  useEffect(() => {
    fetchData();
    fetchSub();
    fetchCls();
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
            fieldValue = classMap[row.className]?.name;
          } else if (field === 'section') {
            fieldValue = classMap[row.className]?.section;
          } else if (field === 'subject') {
            fieldValue = subjectMap[row.subject];
          }else {
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

