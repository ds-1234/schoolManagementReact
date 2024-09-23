import axios from 'axios';
import React, {useEffect, useState } from 'react'
// import EditSubject from './EditSubject';
import edit from '../../../../assets/edit.png'
import deleteIcon from '../../../../assets/delete.png'
import Table from '../../../../Reusable_components/Table';
import { NavLink } from 'react-router-dom';
import AddExpenseCategory from './AddExpenseCategory';
import StatusButton from '../../../../Reusable_components/StatusButton';

function ExpenseCategory() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editSubjectId , setEditSubjectId] = useState(null)

  useEffect(() => {
    if (isAddPopupOpen ) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen]);
  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

//   const openEditPopup = (id) => {
//     setEditSubjectId(id);
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setEditSubjectId(null);
//     setIsEditPopupOpen(false);
//   };

const handleDelete = (id)=>{
    axios({
        method: "post",
        url: `http://localhost:8080/expenseCat/deleteExpenseCat/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then((response) => {
          console.log("Data from Delete API:", response.data);
          fetchData()
        })
        .catch((error) => {
          console.error("Error to Delete data:", error);
          fetchData()
        });
}


  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/expenseCat/getExpenseCatList`,
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
      width: '300px', 
    },
    {
      name: 'Category',
      selector: (row) => row.expenseCategoryName,
      sortable: true,
      wrap: true, 
      width: '300px', 
    },
    {
      name: 'Description',
      selector: (row) => row.expenseCategoryDescription,
      sortable: true,
      wrap: true,
      width: '300px', 
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
      cell: (row) => (
        <div className="flex gap-2">
          <button 
        //   onClick={() => openEditPopup(row.id)}
          >
            <img src={edit} alt="Edit" className="h-8" />
          </button>
          <button
          onClick={()=>handleDelete(row.id)}
          >
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
  { label: 'Category', value: 'category' },
  { label: 'Description', value: 'description' }
];

  return (
    <div className=' h-full mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Expense Category</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Expense Category</span> </p>

      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      onAddClick={openAddPopup}
      />

      <AddExpenseCategory
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      {/* <EditSubject
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  // Only close the Edit popup here
          fetchData();       // Fetch data after the Edit popup is closed
        }}
        subjectId={editSubjectId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
};


export default ExpenseCategory