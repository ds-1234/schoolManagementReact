import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import edit from '../../../assets/edit.png'
import { NavLink } from 'react-router-dom';
import AddBtn from '../../../Reusable_components/AddBtn'
import StatusButton from '../../../Reusable_components/StatusButton';
import Swal from 'sweetalert2'
import BASE_URL from '../../../conf/conf';
import AddStaffAttendanceStatus from './AddStaffAttendanceStatus';



function StaffAttendanceStatus() {
    const [data, setData] = useState([]);
    const [filterData , setFilterData] = useState([])
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editDesignationId , setEditDesignationId] = useState(null)
  
    
    const openAddPopup = () => setIsAddPopupOpen(true);
    const closeAddPopup = () => setIsAddPopupOpen(false);
  
    const openEditPopup = (id) => {
        setEditDesignationId(id);
      setIsEditPopupOpen(true);
    };
  
    const closeEditPopup = () => {
        setEditDesignationId(null);
      setIsEditPopupOpen(false);
    };

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
                    url: `${BASE_URL}/designation/deleteDesignation/${id}`,
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
        url: `${BASE_URL}/attendance/getStaffAttendanceStatus`,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
        .then((response) => {
          console.log("Data from API:", response.data.data);
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
      selector: (row,idx) => idx+1,
      sortable: false,
    },
    {
      name: 'Start Time',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'End Time',
      selector: row => row.endTime,
      sortable: true,
    },
    {
      name: 'Attendance Status',
      selector: row => row.attendanceStatus,
      sortable: true,
    },
    {
        name: 'Status',
        selector: row => (
          <StatusButton isActive={row.isActive}/>
        ),
        sortable: true,
      },
    // {
    //   name: 'Subject',
    //   selector: row => row.subject.length > 0 ? row.subject[0].subject : 'N/A',      sortable: true,
    // },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button
          onClick={() => openEditPopup(row.id)}
        >
          <img src={edit} alt="Edit" className='h-8' />
        </button>
  
        <button
          onClick={()=>handleDelete(row.id)}
          >
            <img src={deleteIcon} alt="Delete" className="h-8" />
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
      selectedFields.some((field) => {
        return row[field]?.toLowerCase().includes(query.toLowerCase())
        
      }
      )
    );
  
    setData(filteredData);
  };
  
  // handle clear button logic
  const handleClear = () => {
    setData(filterData);  // Reset to original data
  };
  
  const searchOptions = [
    { label: 'Start Time', value: 'startTime' },
    { label: 'End Time', value: 'endTime' },
    { label: 'Attendance Status', value: 'attendanceStatus' },
    { label: 'Status', value: 'isActive' },
  ];
  
    return (
      <div className=' h-full mb-10'>
        <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Attendance Status</h1>
        <p className=' mt-2'><NavLink to = '/admin'> Dashboard  </NavLink>/ <span className='text-[#ffae01] font-semibold'>Attendance Status</span> </p>
        <AddBtn onAddClick={openAddPopup}/>
        <Table 
        columns={column}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        handleClear={handleClear}
        />
  
        <AddStaffAttendanceStatus
          isOpen={isAddPopupOpen} 
          onClose={() => {
            closeAddPopup();
            fetchData(); // Refresh data when add popup closes
          }} 
          />
  
        {/* <EditDesignation
          isOpen={isEditPopupOpen}
          onClose={closeEditPopup}
          designationId={editDesignationId}
          onSuccess={fetchData} // Refresh data after editing
        /> */}
      </div>
    );
}

export default StaffAttendanceStatus