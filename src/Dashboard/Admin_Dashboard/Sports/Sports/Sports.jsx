import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png'
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';

import Swal from 'sweetalert2'
import AddSports from './AddSports';
import EditSports from './EditSports';
import AddBtn from '../../../../Reusable_components/AddBtn';


function Sports() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSportId , setEditSportId] = useState(null)

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

  const openEditPopup = (id) => {
    setEditSportId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditSportId(null);
    setIsEditPopupOpen(false);
  };

const handleDelete = (id)=>{

    Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axios({
                method: "post",
                url: `http://localhost:8080/sports/deleteSport/${id}`,
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

          Swal.fire({
            title: "Deleted!",
            text: "Your Data has been deleted.",
            icon: "success"
          });
        }
      });

}


  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/sports/getSportsList`,
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
      name: 'Sports Id',
      selector: (row) => row.sportsId,
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    {
      name: 'Name',
      selector: (row) => row.sportsName,
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    // {
    //   name: 'Coach',
    //   selector: (row) => row.coachName.firstName,
    //   sortable: true,
    //   wrap: true,
    // //   width: '280px', 
    // },
    {
      name: 'Started Year',
      selector: (row) => row.startedYear,
      sortable: true,
      wrap: true,
      width: '280px', 
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
          onClick={() => openEditPopup(row.id)}
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
    //   width: '200px', 
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
  { label: 'Name', value: 'sportsName' },
  { label: 'Coach', value: 'coachName.firstName' },
  { label: 'Started Year', value: 'startedYear' }
];

  return (
    <div className=' h-full mr-8 mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Sports</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Sports</span> </p>
      <AddBtn onAddClick={openAddPopup}/>

      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
    //   onAddClick={openAddPopup}
      />

      <AddSports
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      <EditSports
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  // Only close the Edit popup here
          fetchData();       // Fetch data after the Edit popup is closed
        }}
        sportsId={editSportId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default Sports