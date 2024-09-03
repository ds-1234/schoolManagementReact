import React from 'react';
import DataTable from 'react-data-table-component';
import './Table.css';
import addIcon from '../assets/plus.png'

const Table = ({ columns, data, handleFilter, onAddClick}) => {

  // Custom styles for table with scrollbar based on data length
  const customTableStyles = {
    tableWrapper: {
      style: {
        maxHeight: data.length > 5 ? 'auto' : 'fit-content', 
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
      },
    },
  };

  return (
    <div>
        <button
        onClick={onAddClick}
        // className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'
        >
        <img src={addIcon} alt="Add" className='h-12 absolute top-5 right-10 '/>
      </button>

      <div className="relative bg-white shadow-md rounded-xl p-3 w-4/5 mx-auto mt-20">
      <div className="rounded-lg  text-black">
        <div className="flex justify-start mb-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleFilter}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
          />
        </div>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          customStyles={customTableStyles}
        />
      </div>
    </div>
    </div>
  );
};

export default Table;

