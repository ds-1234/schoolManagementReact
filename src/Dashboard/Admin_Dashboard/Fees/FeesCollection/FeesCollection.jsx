import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png';
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';
import Swal from 'sweetalert2';

import AddBtn from '../../../../Reusable_components/AddBtn';

function FeesCollection() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editPlayerId, setEditPlayerId] = useState(null);
  const [users, setUsers] = useState([]); 

//   useEffect(() => {
//     if (isAddPopupOpen) {
//       document.body.style.overflow = 'hidden'; // Disable scroll when any popup is open
//     } else {
//       document.body.style.overflow = 'auto'; // Enable scroll when no popup is open
//     }

//     return () => {
//       document.body.style.overflow = 'auto'; // Cleanup on unmount
//     };
//   }, [isAddPopupOpen]);

//   const openAddPopup = () => setIsAddPopupOpen(true);
//   const closeAddPopup = () => setIsAddPopupOpen(false);

//   const openEditPopup = (id) => {
//     setEditPlayerId(id);
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setEditPlayerId(null);
//     setIsEditPopupOpen(false);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios({
//           method: 'post',
//           url: `http://localhost:8080/players/deletePlayers/${id}`,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//           .then((response) => {
//             console.log('Data from Delete API:', response.data);
//             fetchData();
//           })
//           .catch((error) => {
//             console.error('Error to Delete data:', error);
//             fetchData();
//           });

//         Swal.fire({
//           title: 'Deleted!',
//           text: 'Your Data has been deleted.',
//           icon: 'success',
//         });
//       }
//     });
//   };

  const fetchData = () => {
    axios({
      method: 'GET',
      url: `http://localhost:8080/feesCollection/getFeesCollectionList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setData(response.data.data);
        setFilterData(response.data.data);
        // fetchUsers(response.data.data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

//   const fetchUsers = (playersData) => {
//     axios({
//       method: 'GET',
//       url: `http://localhost:8080/user/getUserList`,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => {
//         console.log('User Data from API:', response.data);
//         const usersList = response.data.data;
//         setUsers(usersList);

//         // Map the player data to include the username
//         const updatedPlayers = playersData.map((player) => {
//           const user = usersList.find((user) => user.id === player.userId);
//           return { ...player, username: user ? `${user.firstName} ${user.lastName}` : 'Unknown User' };
//         });

//         setData(updatedPlayers);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   };

  useEffect(() => {
    fetchData();
  }, []);

  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    },
    {
      name: 'Fees Collection Id',
      selector: (row) => row.feesCollectionId,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Fees Group',
      selector: (row) => row.feesGroupNameId, 
      sortable: true,
      wrap: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Status',
      selector: (row) => <StatusButton isActive={row.isActive} />,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <img src={deleteIcon} alt="Delete" className="h-8" />
          </button>
        </div>
      ),
    },
  ];

  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setData(filterData);
      return;
    }

    const selectedFields = Object.keys(checkboxRefs).filter((key) => checkboxRefs[key].checked);

    const filteredData = filterData.filter((row) =>
      selectedFields.some((field) => row[field]?.toLowerCase().includes(query.toLowerCase()))
    );

    setData(filteredData);
  };

  const handleClear = () => {
    setData(filterData); // Reset to original data
  };

  const searchOptions = [
    { label: 'Fees Group', value: 'feesGroupNameId' }, // Search by username
    { label: 'Description', value: 'description' },
  ];

  return (
    <div className="h-full mr-8 mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Fees Collection</h1>
      <p className="mt-2">
        Dashboard /<NavLink to="/admin"> Admin </NavLink>/
        <NavLink to="/admin/feesgrp"> Fees </NavLink>/ 
        <span className="text-[#ffae01] font-semibold">Fees Collection</span>
      </p>
      {/* <AddBtn onAddClick={openAddPopup} /> */}
      <Table
        columns={column}
        data={data}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        handleClear={handleClear}
      />

      {/* <AddPlayers
        isOpen={isAddPopupOpen}
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }}
      />

      <EditPlayers
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup(); // Only close the Edit popup here
          fetchData(); // Fetch data after the Edit popup is closed
        }}
        playersId={editPlayerId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
}

export default FeesCollection;
