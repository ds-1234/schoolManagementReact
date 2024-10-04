import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../../assets/edit.png'
import deleteIcon from '../../../../assets/delete.png'
// import Table from '../../../Reusable_components/Table';
import { NavLink, useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';
import EditExpenses from './EditExpenses';
// import StatusButton from '../../../Reusable_components/StatusButton';
import AddBtn from '../../../../Reusable_components/AddBtn';


function Expenses() {
const navigate =useNavigate()

const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
const [editExpenseId , setEditExpenseId] = useState(null)

const openEditPopup = (id) => {
  setEditExpenseId(id);
  setIsEditPopupOpen(true);
};

const closeEditPopup = () => {
  setEditExpenseId(null);
  setIsEditPopupOpen(false);
};

  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
      width:'70px'
    },
    {
      name: 'Expense Id',
      selector: row => row.expenseId,
      sortable: true,
      width:'100px'
    },
    {
      name: 'Expense Name',
      selector: row => row.name,
      sortable: true,
      width:'100px'

    },
    {
      name: 'Description',
      selector: row => row.expenseType.expenseCategoryDescription,
      sortable: true,
      wrap: true,
      width:'150px' 

    },
    {
      name: 'Category',
      selector: row => row.expenseType.expenseCategoryName,
      sortable: true,
      width:'100px'

    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      width:'100px'

    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
      width:'100px'

    },
    {
      name: 'Payment Method',
      selector: row => row.payment_mode,
      sortable: true,
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

  const [expense, setExpense] = useState([]);
  const [filterexpense, setFilterexpense] = useState([]);



  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/expenses/getExpensesList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setExpense(response.data.data);
        setFilterexpense(response.data.data)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setExpense(expense);  
    setFilterexpense(expense); 
  }, []);

  useEffect(() => {
    if ( isEditPopupOpen ) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }
  
    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [ isEditPopupOpen]);

//   const handleFilter = (event) => {
//     const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
//     setBook(newData);
//  }

// Helper function to access nested object properties
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Handle Search Logic
const handleSearch = (query, checkboxRefs) => {
  if (!query) {
    setExpense(filterexpense); // Reset to original data
    return;
  }

  const selectedFields = Object.keys(checkboxRefs)
    .filter((key) => checkboxRefs[key].checked);

  const filteredData = filterexpense.filter((row) =>
    selectedFields.some((field) => {
      const fieldValue = getNestedValue(row, field);
      return fieldValue?.toString().toLowerCase().includes(query.toLowerCase());
    })
  );

  setExpense(filteredData);
};


// handle clear button logic
const handleClear = () => {
  setExpense(filterexpense);  // Reset to original data
};

const handleAddClick = () => {
  navigate('/admin/addexpenses')
}

const searchOptions = [
  { label: 'Expense Name', value: 'name' },
  { label: 'Description', value: 'expenseType.expenseCategoryDescription' },
  { label: 'Category', value: 'expenseCategoryName' },
  { label: 'Date', value: 'date' },
  { label: 'Amount', value: 'amount' },
  { label: 'Payment Method', value: 'payment_mode' },
];

  return (
    <div className=' h-full mb-10 mr-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Expenses</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Expenses</span> </p>
      <AddBtn onAddClick={handleAddClick}/>
      <Table
      columns={column}
      data={expense}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      />


      <EditExpenses
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        expenseId={editExpenseId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default Expenses;

