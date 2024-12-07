import axios from 'axios';
import React, {useEffect, useState } from 'react'
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import edit from '../../../assets/edit.png'
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import AddBtn from '../../../Reusable_components/AddBtn'
import BASE_URL from '../../../conf/conf';
import ReactHtmlParser from 'react-html-parser';


function Subject() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSubjectId , setEditSubjectId] = useState(null)

  useEffect(() => {
    if (isAddPopupOpen || isEditPopupOpen) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen, isEditPopupOpen]);
  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditSubjectId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditSubjectId(null);
    setIsEditPopupOpen(false);
  };


  

  const fetchData = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}/subject/getSubjectList`,
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


  const applyTailwindClassesToDescription = (description) => {
    // Ensure the description has <ul> and <ol> lists with Tailwind classes
    return description.replace(/<ul>/g, '<ul class="list-disc list-inside ">')
                      .replace(/<ol>/g, '<ol class="list-decimal list-inside ">')
                      // .replace(/<li>/g, '<li class="ml-4">');
  };
  
  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
      // width: '300px', 
    },
    {
      name: 'Subject Name',
      selector: (row) => row.subject,
      sortable: true,
      wrap: true, 
      // width: '300px', 
    },
    // {
    //   name: 'Subject Description',
    //   selector: (row) => (
    //     <div 
    //     dangerouslySetInnerHTML={{ __html: applyTailwindClassesToDescription(row.description) }} 
    //       className="subject-description"
    //     />
    //   ),
    //   sortable: true,
    //   wrap: true,
    //   width: '300px', 
    // },
    
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>
          <button>
            <img src={deleteIcon} alt="Delete" className="h-8" />
          </button>
        </div>
      ),
      width: '300px', 
    },
  ];

// const handleFilter = (event) => {
//   const newData = filterData.filter(row=>row.subject.toLowerCase().includes(event.target.value.toLowerCase()))
//   setData(newData);
// }

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
  { label: 'Subject Name', value: 'subject' },
  { label: 'Subject Description', value: 'description' }
];

  return (
    <div className=' h-full mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Subjects</h1>
      <p className=' mt-2'><NavLink to = '/admin'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Subjects</span> </p>
      <AddBtn onAddClick={openAddPopup}/>
      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      onAddClick={openAddPopup}
      />

      <AddSubject
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      <EditSubject
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  // Only close the Edit popup here
          fetchData();       // Fetch data after the Edit popup is closed
        }}
        subjectId={editSubjectId}
        onSuccess={fetchData} // Refresh data after editing
      />
              {/* <div 
          dangerouslySetInnerHTML={{ __html: data[2].description }} 
          className="subject-description p-4 bg-gray-50 border-l-4 border-yellow-400 list-disc pl-6"
          /> */}
          {/* {ReactHtmlParser(data[2].description)} */}
{/* <ul className='list-disc list-inside'><li><strong>This is english subject</strong></li><li><strong>learn it well</strong></li></ul> */}
    </div>
  );
};


export default Subject