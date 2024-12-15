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
    const [userName, setUserName] = useState(null);
    


  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
      width:'100px'
    },
    // {
    //   name: 'Name',
    //   selector: row => row.userId,
    //   sortable: true,
    // },
    {
        name: 'Issue Id',
        selector: row => row.issueId,
        sortable: true,
        width:'120px'

      },
    {
        name: 'Name',
        selector: row => userMap[row.userId] || row.userId, // Display userName if found, otherwise show userId
        sortable: true,
        width:'120px'

      },
      {
        name: 'Book Number',
        selector: row => row.bookNumber,
        sortable: true,
        width:'120px'

      },

    {
      name: 'Issued Date',
      selector: row => row.issuedDate,
      sortable: true,
      width:'120px'

    },
    {
      name: 'Return Date',
      selector: row => row.returnDate,
      sortable: true,
      width:'120px'

    },

    {
      name: 'Issued Count',
      selector: row => row.issuedCount,
      sortable: true,
      width:'115px'

  },
  {
      name: 'Returned Count',
      selector: row => row.returnedCount,
      sortable: true,
      width:'115px'

  },
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
      width:'120px'

    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button onClick={() => openEditPopup(row.userId,userMap[row.userId])}>

        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
      ),
      width:'100px'

    },
  ]

  const conditionalRowStyles = [
    {
      when: row => !row.isActive,
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background
      },
    },
    {
        when:row=> row.isActive,
        style:{
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // Light green background when isActive is true
        }
    }
  ];

  const [book, setBook] = useState([]);
  const [filterBook, setFilterBook] = useState([]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (userId,userName) => {
    // Set the list of book issues for the selected `userId`
    fetchBookIssues()
    setSelectedUserIssues(allBookIssues[userId].books || []);
    setUserName(userName)
  };
console.log(allBookIssues,'allBookIssues')
  const closeEditPopup = () => {
    setSelectedUserIssues(null);
    setUserName(null)

    fetchBookIssues()
  };

  useEffect(() => {
    fetchBookIssues();
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


    // Fetch book issues from API
    const fetchBookIssues = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/library/getBookIssued`);
            const data = response.data.data;
            if (response.data && response.data.success) {
              const data = response.data.data;
              setAllBookIssues(data);}

            // Process the data to flatten it into an array
            const formattedData = Object.keys(data).map(userId => {
                const userIssues = data[userId];
                return {
                    ...userIssues.books[0], // Take only the first book entry per user
                    userId,
                    issuedCount: userIssues.issuedCount,
                    returnedCount: userIssues.returnedCount
                };
            });

            setBookIssues(formattedData);
        } catch (error) {
            console.error('Error fetching book issues:', error);
        }
    };
    useEffect(() => {
    fetchBookIssues();
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
      <p className='mt-2'>
        <NavLink to = '/admin'> Dashboard  </NavLink>/ 
        <NavLink to = '/admin/library'> Library </NavLink>/ 
        <span className='text-[#ffae01] font-semibold'>Book Issue</span> </p>

      <Table
      columns={column}
      data={book}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      conditionalRowStyles={conditionalRowStyles}
       />
        <AddBtn onAddClick={openAddPopup}/>

      <AddBookIssue
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchBookIssues(); // Refresh data when add popup closes
        }} 
      />
      {console.log(selectedUserIssues,'selectedUserIssues')}
                  {selectedUserIssues && (
        <EditBookIssueListPopup
          issues={selectedUserIssues}
          isOpen={openEditPopup}
          fetchBooks={fetchBookIssues} // Passing fetchBooks to refresh the data
          userName = {userName}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
}

export default BookIssue;

