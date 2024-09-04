import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './Table.css';
// import { Link } from 'react-router-dom';
import edit from '../../../assets/edit.png';
import AddBooksPopup from './AddBooksPopup';
import EditBookPopup from './EditBookPopup';
// import DataTable from 'react-data-table-component';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'


function Books() {

  const column = [
    {
      name: 'Sr.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: false,
    },
    {
      name: 'Author',
      selector: row => row.author,
      sortable: true,
    },
    {
      name: 'Publishing Year',
      selector: row => row.publishingYear,
      sortable: true,
    },
    {
      name: 'Book unique Id',
      selector: row => row.bookUniqueId,
      sortable: true,
    },
    {
      name: 'Book ref Id',
      selector: row => row.bookRefId,
      sortable: true,
    },
    {
      name: 'Alloted start date',
      selector: row => row.allotedStratDate,
      sortable: true,
    },
    {
      name: 'Alloted End Date',
      selector: row => row.allotedEndtDate,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
        <button
        onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button
        // onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
      ),
    },
  ]

  const [book, setBook] = useState([]);
  const [filterSchool, setFilterSchool] = useState([]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditBookId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditBookId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/book/getBookList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setBook(response.data.data);
        setFilterSchool(response.data.data)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (event) => {
    const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setBook(newData);
 }
  return (
    <div className='pl-0'>
      {/* <button
        onClick={openAddPopup}
        className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
        Add Book
      </button>

      <div className='rounded-2xl mt-20 text-black w-4/5 mx-10 bg-gray-50'>
        <div className='flex justify-end'>
          <input type='text' placeholder='search...' onChange={handleFilter}></input>
        </div>
<DataTable
          columns={column}
          data={book}
          pagination
        />
      </div> */}

      <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Books</h1>
      <Table
      columns={column}
      data={book}
      handleFilter={handleFilter}
      onAddClick={openAddPopup}
       />

      <AddBooksPopup
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditBookPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        bookId={editBookId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default Books;

