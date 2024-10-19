import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png'
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';
import AddBtn from '../../../../Reusable_components/AddBtn'

import Swal from 'sweetalert2'
import AddFeesGrp from './AddFeesGrp';
import EditFeesGrp from './EditFeesGrp';



function FeesGrp() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editFeesGrpId , setEditFeesGrpId] = useState(null)

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
    setEditFeesGrpId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditFeesGrpId(null);
    setIsEditPopupOpen(false);
  };

// const handleDelete = (id)=>{

//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       }).then((result) => {
//         if (result.isConfirmed) {

//             axios({
//                 method: "post",
//                 url: `http://localhost:8080/leaves/deleteLeaveById/${id}`,
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 // withCredentials: true,
//               })
//                 .then((response) => {
//                   console.log("Data from Delete API:", response.data);
//                   fetchData()
//                 })
//                 .catch((error) => {
//                   console.error("Error to Delete data:", error);
//                   fetchData()
//                 });

//           Swal.fire({
//             title: "Deleted!",
//             // text: "Your file has been deleted.",
//             icon: "success"
//           });
//         }
//       });

// }


  const fetchData = () => {
    axios({
      method: "GET",
      url: `http://localhost:8080/feesGroup/getFeesGroupList`,
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
      name: 'Fees Id',
      selector: (row) => row.feesGroupId,
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    {
      name: 'Fees Group name',
      selector: (row) => row.feesGroupName,
      sortable: true,
      wrap: true, 
    //   width: '280px', 
    },
    // {
    //   name: 'Date',
    //   selector: (row) => row.holidayDate,
    //   sortable: true,
    //   wrap: true,
    // //   width: '280px', 
    // },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    //   width: '280px', 
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

const handleSearch = (query, selectedFilters) => {
  if (!query) {
    setData(filterData); // Reset to the original unfiltered data
    return;
  }

  const selectedFields = Object.keys(selectedFilters).filter((key) => selectedFilters[key]);

  console.log('Query:', query);
  console.log('Selected Fields:', selectedFields);

  const filteredData = filterData.filter((row) =>
    selectedFields.some((field) => {
      console.log('Field:', field, 'Value:', row[field]); // Check which field and value are being compared
      const value = row[field]?.toString().toLowerCase(); // Convert field value to string and lowercase
      return value && value.includes(query.toLowerCase());
    })
  );

  setData(filteredData); // Update the data with filtered results
};

// handle clear button logic
const handleClear = () => {
  setData(filterData);  // Reset to original data
};

const searchOptions = [
  { label: 'Fees Group name', value: 'feesGroupName' },
  { label: 'Description', value: 'description' }
];

  return (
    <div className=' h-full mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Fees Group</h1>
      <p className=' mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Fees Group</span> </p>
      <AddBtn onAddClick={openAddPopup}/>
      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      />

      <AddFeesGrp
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); 
        }} 
        />

      <EditFeesGrp
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  // Only close the Edit popup here
          fetchData();       // Fetch data after the Edit popup is closed
        }}
        feesGrpId={editFeesGrpId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default FeesGrp