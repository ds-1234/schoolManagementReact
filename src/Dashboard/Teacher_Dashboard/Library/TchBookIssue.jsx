import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';
import LibraryStatusButton from '../../../Reusable_components/LibraryStatusButton';



function TchBookIssue() {
    const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data


  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
    },
    {
      name: 'Book Number',
      selector: row => row.bookNumber,
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



// useEffect(() => {
//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/library/getBookIssued`);
//       if (response.data && response.data.success) {
//         // Log response data to check structure
//         console.log('Response data:', response.data);
  
//         // Extract the array of books from the `data` object
//         const booksArray = Object.values(response.data.data).flat();
//         console.log(booksArray, 'booksarray');
//         console.log('User:', user);
  
//         // Ensure user.id exists and is comparable with item.userId
//         const filteredData = booksArray.filter(item => {
//           console.log('Item userId:', item.books[0].userId, 'User id:', user.id);
//            item.books.userId == user.id;
//         });
//         console.log(filteredData, 'filtereddata');
  
//         setBook(filteredData);
//         setFilterBook(filteredData); // Set filterBook if you intend to use filtered data
//       } else {
//         console.error("Unexpected response structure:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };
  
  
//     fetchBooks();
//   }, []);

useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/library/getBookIssued`);
      if (response.data && response.data.success) {
        console.log('Response data:', response.data);

        // Get the user ID from session storage
        const user = JSON.parse(sessionStorage.getItem('user')); // Current logged-in user
        const userId = user?.id; // Get user ID safely

        // Extract the books data for the specific user ID
        const filteredData = response.data.data[userId]?.books || [];

        console.log('Filtered books:', filteredData);

        // Update the state
        setBook(filteredData);
        setFilterBook(filteredData); // For filtering purposes
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

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
  { label: 'User Id', value: 'userId' },
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
      <p className='mt-2'><NavLink to = '/teacherDashboard'>Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Book Issue</span> </p>

      <Table
      columns={column}
      data={book}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      conditionalRowStyles={conditionalRowStyles}

       />
        {/* <AddBtn onAddClick={openAddPopup}/>

      <AddBookIssue
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchBooks(); // Refresh data when add popup closes
        }} 
      /> */}

      {/* <EditBookPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        bookId={editBookId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
}

export default TchBookIssue;

