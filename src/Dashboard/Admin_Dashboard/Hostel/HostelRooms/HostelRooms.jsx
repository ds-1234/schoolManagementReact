import axios from 'axios';
import React, {useEffect, useState } from 'react'
import edit from '../../../../assets/edit.png'
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import AddBtn from '../../../../Reusable_components/AddBtn'
import StatusButton from '../../../../Reusable_components/StatusButton';
import BASE_URL from '../../../../conf/conf';


function HostelRooms() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editHostelId , setEditHostelId] = useState(null)

//   useEffect(() => {
//     if (isAddPopupOpen ) {
//       document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
//     } else {
//       document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
//     }

//     return () => {
//       document.body.style.overflow = 'auto';  // Cleanup on unmount
//     };
//   }, [isAddPopupOpen]);
  
//   const openAddPopup = () => setIsAddPopupOpen(true);
//   const closeAddPopup = () => setIsAddPopupOpen(false);

//   const openEditPopup = (id) => {
//     setEditHostelId(id);
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setEditHostelId(null);
//     setIsEditPopupOpen(false);
//   };



const handleDelete = (id)=>{

    Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axios({
                method: "post",
                url: `${BASE_URL}/hostelRooms/deleteHostelRooms/${id}`,
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
      url: `${BASE_URL}/hostelRooms/getHostelRoomsList`,
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
    //   width: '300px', 
    },
    {
      name: 'Hostel Room Id',
      selector: (row) => row.hostelRoomId,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'Room No.',
      selector: (row) => row.hostelRoomNumber,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'Hostel Name',
      selector: (row) => row.hostelName.hostelName,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'Room Type',
      selector: (row) => row.roomType.roomTypeName,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'No. of Bed',
      selector: (row) => row.numOfBeds,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'Cost per Bed',
      selector: (row) => row.costPerBed,
      sortable: true,
      wrap: true,
    //   width: '300px', 
    },
    {
        name: 'Status',
        selector: row => (
          <StatusButton isActive={row.isActive} />
        ),
        sortable: true,
        // width: '117px',
              // wrap: true, 
      },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>
          <button
          onClick={()=>handleDelete(row.id)}
          >
            <img src={deleteIcon} alt="Delete" className="h-8" />
          </button>
        </div>
      ),
    //   width: '300px', 
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
  { label: 'Room No.', value: 'hostelRoomNumber' },
  { label: 'Hostel Name ', value: 'hostelName.hostelName' },
  { label: 'Room Type', value: 'roomType.roomTypeName' },
  { label: 'No. of Bed', value: 'numOfBeds' },
  { label: 'Cost per Bed', value: 'costPerBed' }
];

  return (
    <div className=' h-full mb-10 mr-2'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Hostel Rooms</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<NavLink to = '/admin/hostel'> Hostel </NavLink>/ <span className='text-[#ffae01] font-semibold'>Hostel Rooms</span> </p>
      {/* <AddBtn onAddClick={openAddPopup}/> */}
      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
    //   onAddClick={openAddPopup}
      />

      {/* <AddHostel
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        /> */}

      {/* <EditHostel
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  
          fetchData();       
        }}
        hostelId={editHostelId}
        onSuccess={fetchData} 
      /> */}
    </div>
  );
};


export default HostelRooms