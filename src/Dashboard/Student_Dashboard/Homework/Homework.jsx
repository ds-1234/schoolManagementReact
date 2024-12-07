import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '../../../Reusable_components/Table';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../../conf/conf';


function Homework() {
  const user = JSON.parse( sessionStorage.getItem('user') )
  const [classMap , setClassMap] = useState({}) 
  const [subjectMap , setSubjectMap] = useState({})
  const [userMap , setUserMap] = useState({})

  const column = [
    {
      name: 'SR.No',
      selector: (row , idx) => idx+1,
      // sortable: true,
      width : '100px'
    },
    {
      name: 'ID',
      selector: row => row.homeworkId,
      sortable: true,
    },
    {
      name: 'Class',
      selector: row => classMap[row.className]?.name,
      sortable: true,
    },
    {
      name: 'Section',
      selector: row => classMap[row.className]?.section,
      sortable: true,
    },
    {
      name: 'Subject',
      selector: row => subjectMap[row.subject],
      sortable: true,
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
        selector: row => userMap[row.userId]?.firstName + ' ' +  userMap[row.userId]?.lastName ,
        sortable: true,
    },
    {
        name: 'Action',
        cell: row => (
          <button
            onClick={() => handleDownload(row.attachmentName)}
            className="text-blue-500 underline"
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
      url: `${BASE_URL}/homework/getHomeworkList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setHomework(response.data.data.filter((hm) => hm.className == user.className[0]));
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
    
        setSubjectMap(subjects)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const fetchUsers = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/user/getUserList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data.data);
        const users = {} ;
        response.data.data.forEach((tch) => {
          users[tch.id] = tch ;
        })
        
        setUserMap(users)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

 
  useEffect(() => {
    fetchData();
    fetchSub();
    fetchCls();
    fetchUsers();
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
          
          if (field === 'class') {
            fieldValue = classMap[row.className]?.name;
          } else if (field === 'section') {
            fieldValue = classMap[row.className]?.section;
          } else if (field === 'subject') {
            fieldValue = subjectMap[row.subject];
          } else if (field === 'name') {
            fieldValue = userMap[row.userId]?.firstName;
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

const handleDownload = (attachmentName) => {
  const fullPath = `${attachmentName}`; 
  
  // Create a temporary link to download the file
  const link = document.createElement('a');
  link.href = fullPath;  
  link.setAttribute('download', attachmentName); 
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
      <p className='mt-2'><NavLink to = '/studentDashboard'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Homework</span> </p>

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