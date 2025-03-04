import axios from 'axios';
import React, {useEffect, useState } from 'react'
import edit from '../../../../assets/edit.png'
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png'
import AddGrade from './AddGrade';
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../../Reusable_components/StatusButton';
import EditGrade from './EditGrade';
import AddBtn from '../../../../Reusable_components/AddBtn';
import BASE_URL from '../../../../conf/conf';

function Grade() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editGradeId , setEditGradeId] = useState(null)

  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditGradeId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditGradeId(null);
    setIsEditPopupOpen(false);
  };

const onDelete = (id) => {
  axios({
    method: "DELETE",
    url: `${BASE_URL}/gradePoints/deleteGradePoints/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true,
  })
    .then((response) => {
      console.log("Data from API:", response.data);
      fetchData() ;


    })
    .catch((error) => {
      console.error("Error Deleting data:", error);
      fetchData() ;

    });
}

  const fetchData = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}/gradePoints/getGradePointsList`,
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
  

useEffect(() => {
  if (isAddPopupOpen || isEditPopupOpen ) {
    document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
  } else {
    document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
  }

  return () => {
    document.body.style.overflow = 'auto';  // Cleanup on unmount
  };
}, [isAddPopupOpen , isEditPopupOpen]);


const column = [
  {
    name: 'SR.No',
    selector: (row,idx) => idx+1,
    sortable: false,
  },
  {
    name: 'Grade Point ID',
    selector: row => row.gradePointsId,
    sortable: true,
  },
  {
    name: 'Grade',
    selector: row => row.grade,
    sortable: true,
  },
  {
    name: 'Percentage',
    selector: row => (row.percentageFrom + ' - ' +  row.percentageUpto),
    sortable: true,
  },
  {
    name: 'Grade Points',
    selector: row => row.gradePoints,
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
        onClick={() => openEditPopup(row.id)}
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      {/* <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button> */}
              <button
        onClick={() => onDelete(row.id)}
      >
        <img src={deleteIcon} alt="Edit" className='h-8' />
      </button>
      </div>
    ),
  },
]

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
  { label: 'Grade', value: 'grade' },
  { label: 'Percentage', value: 'percentageFrom' },
  { label: 'Grade Points', value: 'gradePoints' },
  { label: 'Status', value: 'isActive' }
];

  return (
    <div className='pl-0 h-full mb-10'>
      <h1 className='text-lg md:text-2xl pl-0 pt-8 font-semibold text-black'>Grade</h1>
      <p className='pl-0 mt-2'>
        <NavLink to = '/admin'> Dashboard </NavLink>/
        <NavLink to = '/admin/exam'> Examinations </NavLink>/ 
        <span className='text-[#ffae01] font-semibold'>Grade</span> </p>
      <AddBtn onAddClick={openAddPopup}/>
      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      />

      <AddGrade
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); 
          // Refresh data when add popup closes
        }} 
        />

      <EditGrade
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        gradeId={editGradeId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default Grade