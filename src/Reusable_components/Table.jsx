import React, { useRef } from 'react';
import DataTable from 'react-data-table-component';
import './Table.css';
// import addIcon from '../assets/plus.png'
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const Table = ({ columns, data, searchOptions, onSearch , handleClear, onAddClick}) => {

  const searchInputRef = useRef() 
  const searchSelectRef = useRef() 

  const clearFilters = () => {
    searchInputRef.current.value = '',
    searchSelectRef.current.value = ''
    handleClear()
  }

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
      <div className='group'>
        <button 
          onClick={onAddClick}
          className="flex items-center bg-green-500 text-white rounded-full transition-all duration-300 h-12 px-2 text-2xl w-12 absolute top-5 right-10 group-hover:w-28 group-hover:px-4  group-hover:text-xl"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add
          </span>
        </button>
      </div>


      <div className="relative bg-white shadow-md rounded-xl p-3 w-auto mx-auto mt-10 ml-20">
      <div className="rounded-lg text-black">
        <div>
          {/* Search Section */}
          <div className="flex justify-start mb-4 gap-4">
            {/* Column Selection Dropdown */}
            <select
              onChange={(e) => onSearch(e, 'column')}
              ref={searchSelectRef}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
            >
              <option value="Search Column" className='hidden'>Select Column</option>
              {searchOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch(e, 'query')}
              ref={searchInputRef}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
            />

            {/* Search Button */}
            <Button
              onClick={() => onSearch(null, 'button')}
              className='mt-0'
              label="Search"
            />

            {/* Clear Button */}
            <Button
              onClick={clearFilters}
              className='mt-0 bg-[#ffae01] hover:bg-[#042954]'
              label="Clear"
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
  </div>
  );
};

export default Table;

