import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../../assets/edit.png';
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import StatusButton from '../../../../Reusable_components/StatusButton';
import AddBtn from '../../../../Reusable_components/AddBtn'
import BASE_URL from '../../../../conf/conf';
import AddBooksPopup from '../AddBooksPopup';
import AddBookIssue from './AddBookIssue';
import EditBookIssue from './EditBookIssue';
import LibraryStatusButton from '../../../../Reusable_components/LibraryStatusButton';
import EditBookIssueListPopup from './EditBookIssueListPopup';


function BookIssue() {
    const [userMap, setUserMap] = useState({}); // Map userId to userName
    const [bookIssues, setBookIssues] = useState({}); // Map userId to userName
    const [allBookIssues, setAllBookIssues] = useState({});
    const [selectedUserIssues, setSelectedUserIssues] = useState(null);


  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
    },
    // {
    //   name: 'Name',
    //   selector: row => row.userId,
    //   sortable: true,
    // },
    {
        name: 'Name',
        selector: row => userMap[row.userId] || row.userId, // Display userName if found, otherwise show userId
        sortable: true,
      },
    {
      name: 'Issue Id',
      selector: row => row.issueId,
      sortable: true,
    },
    {
      name: 'Issued Date',
      selector: row => row.issuedDate,
      sortable: true,
    },
    {
      name: 'Return Date',
      selector: row => row.returnDate,
      sortable: true,
    },
    {
      name: 'Book Number',
      selector: row => row.bookNumber,
      sortable: true,
    },
    // {
    //   name: 'Book unique Id',
    //   selector: row => row.bookUniqueId,
    //   sortable: true,
    // },
    // {
    //   name: 'Book ref Id',
    //   selector: row => row.bookRefId,
    //   sortable: true,
    // },
    // {
    //   name: 'Alloted start date',
    //   selector: row => row.allotedStratDate,
    //   sortable: true,
    // },
    // {
    //   name: 'Alloted End Date',
    //   selector: row => row.allotedEndtDate,
    //   sortable: true,
    // },
    {
      name: 'Status',
      selector: row => (
        <LibraryStatusButton isActive={row.isActive}/>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button onClick={() => openEditPopup(row.userId)}>

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

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (userId) => {
    // Set the list of book issues for the selected `userId`
    fetchBooks()
    setSelectedUserIssues(allBookIssues[userId] || []);
  };

  const closeEditPopup = () => {
    setSelectedUserIssues(null);
    fetchBooks()
  };

  useEffect(() => {
    fetchBooks();
    fetchUserData();
  }, []);

  // Fetch user data and create a userId-to-userName map
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getUserList`);
      if (response.data && response.data.success) {
        const users = response.data.data;
        const userMapTemp = users.reduce((map, user) => {
          map[user.id] = user.firstName;
          return map;
        }, {});
        setUserMap(userMapTemp);
      } else {
        console.error('Error fetching user data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
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

    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/library/getBookIssued`);
        if (response.data && response.data.success) {
            const data = response.data.data;

            setAllBookIssues(data); // Store all data

        // Filter data to only show the first entry for each `userId`
        const firstEntries = Object.keys(data).map(userId => data[userId][0]);
        setBookIssues(firstEntries);
        setFilterBook(firstEntries); // Set filterBook for search

        console.log(firstEntries,'firstentries')
        //   setFilterBook(booksArray); // Set filterBook if you intend to use filtered data
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    useEffect(() => {

    fetchBooks();
  }, []);
  

  useEffect(() => {
    setBook(book);  
    setFilterBook(book); 
  }, []);

//   const handleFilter = (event) => {
//     const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
//     setBook(newData);
//  }

  // Handle Search Logic
  useEffect(() => {
    if (bookIssues.length > 0) {
      setBook(bookIssues);
    }
  }, [bookIssues]);

  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setBook(filterBook);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterBook.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setBook(filteredData);
  };

// handle clear button logic
const handleClear = () => {
  setBook(filterBook);  // Reset to original data
};

const searchOptions = [
  { label: 'User Name', value: 'userId' },
  { label: 'Issue Id', value: 'issueId' },
  { label: 'Issue Date', value: 'issuedDate' },
  { label: 'Return Date', value: 'returnDate' },
  { label: 'Book Number', value: 'bookNumber' },
//   { label: 'Book Reference Id', value: 'bookRefId' },
//   { label: 'Alloted Start Date', value: 'allotedStratDate' },
//   { label: 'Alloted End Date', value: 'allotedEndtDate' },
  { label: 'isActive', value: 'isActive' },
];

  return (
    <div className=' h-full mb-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Book Issue List</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Book Issue</span> </p>

      <Table
      columns={column}
      data={book}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
       />
        <AddBtn onAddClick={openAddPopup}/>

      <AddBookIssue
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchBooks(); // Refresh data when add popup closes
        }} 
      />

      {/* <EditBookIssue
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        BookIssueId={editBookId}
        onSuccess={fetchBooks} // Refresh data after editing
      /> */}
      
            {selectedUserIssues && (
        <EditBookIssueListPopup
          issues={selectedUserIssues}
          isOpen={openEditPopup}
          fetchBooks={fetchBooks} // Passing fetchBooks to refresh the data

          onClose={closeEditPopup}
        />
      )}
    </div>
  );
}

export default BookIssue;

