import axios from 'axios';
import React, {useEffect, useState } from 'react'
// import './Table.css'
// import { Link } from 'react-router-dom';
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import edit from '../../assets/edit.png'
import Table from '../../Reusable_components/Table';

function Subject() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSubjectId , setEditSubjectId] = useState(null)

  
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
      url: `http://localhost:8080/subject/getSubjectList`,
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


  
const column = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Subject Name',
    selector: row => row.subject,
    sortable: true,
  },
  {
    name: 'Subject Description',
    selector: row => row.description,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <button
        onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>
    ),
  },
]

const handleFilter = (event) => {
  const newData = filterData.filter(row=>row.subject.toLowerCase().includes(event.target.value.toLowerCase()))
  setData(newData);
}

  return (
    <div className='pl-0'>

      <Table 
      columns={column}
      data={data}
      onAddClick={openAddPopup}
      handleFilter={handleFilter}
      addButtonLabel={"Add Subject"}/>

      <AddSubject
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      <EditSubject
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        subjectId={editSubjectId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default Subject