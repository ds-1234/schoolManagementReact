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
      name: 'SR.No',
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
      sortable: true,
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
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
      ),
    },
  ]

  const [book, setBook] = useState([]);
  const [filterBook, setFilterBook] = useState([]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(''); 
  const [searchValue, setSearchValue] = useState('');

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
        setFilterBook(response.data.data)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setBook(book);  
    setFilterBook(book); 
  }, []);

//   const handleFilter = (event) => {
//     const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
//     setBook(newData);
//  }

const handleSearch = (event, type) => {
  if (type === 'column') {
    setSelectedColumn(event.target.value); // Set selected column
  } else if (type === 'query') {
    setSearchValue(event.target.value); // Set search query
  } else if (type === 'button') {
    // search filter when the search button is clicked
    const filteredData = filterBook.filter((row) =>
      row[selectedColumn]?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBook(filteredData); // Update data
  }
};

// handle clear button logic
const handleClear = () => {
  setBook(filterBook);  // Reset to original data
};

const searchOptions = [
  { label: 'Book Name', value: 'name' },
  { label: 'Book Description', value: 'description' },
  { label: 'Author', value: 'author' },
  { label: 'Publishing Year', value: 'publishingYear' },
  { label: 'Book Unique Id', value: 'bookUniqueId' },
  { label: 'Book Reference Id', value: 'bookRefId' },
  { label: 'Alloted Start Date', value: 'allotedStratDate' },
  { label: 'Alloted End Date', value: 'allotedEndtDate' },
];

  return (
    <div className='pl-0'>

      <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Books</h1>
      <Table
      columns={column}
      data={book}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
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

