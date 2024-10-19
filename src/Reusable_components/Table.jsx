import React, { useState, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';


const Table = ({ columns, data, searchOptions, onSearch, handleClear , className}) => {
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null); // Ref to track the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({}); // State to track selected filters

  // Handle filter checkbox toggle
  const handleCheckboxChange = (option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [option.value]: !prev[option.value], // Toggle the selected state
    }));
  };

  const handleSearchClick = () => {
    const searchQuery = searchInputRef.current.value;
    onSearch(searchQuery, selectedFilters); // Pass selected filters to search function
  };

  const clearFilters = () => {
    searchInputRef.current.value = '';
    setSelectedFilters({}); // Clear the selected filters
    handleClear();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Custom styles for the table with bigger headers
  const customTableStyles = {
    headCells: {
      style: {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
        fontSize: '16px',

        whiteSpace: 'normal', // Ensure the header can wrap
        wordWrap: 'break-word', // Break long words if necessary
      },
    },
    cells: {
      style: {
        whiteSpace: 'normal', // Allow cell content to wrap
        wordWrap: 'break-word', // Break long words if necessary
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

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative bg-white shadow-md rounded-xl p-3 w-auto mx-auto mt-10">
        <div className="rounded-lg text-black">
          <div>
            {/* Search Section */}
            <div className={`flex flex-wrap gap-4 mb-4 items-center ${className}`}>

              {/* Filter Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-evenly items-center gap-2"
                >
                  <FontAwesomeIcon icon={faFilter} />
                  Filter
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute bg-white border rounded-lg shadow-lg p-4 mt-2 w-60 z-50">
                    {searchOptions.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!selectedFilters[option.value]} // Reflect selected state
                          onChange={() => handleCheckboxChange(option)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Search..."
                ref={searchInputRef}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-1/4"
              />

              {/* Search Button */}
              <Button onClick={handleSearchClick} className="mt-0" label="Search" />

              {/* Clear Button */}
              <Button onClick={clearFilters} className="mt-0 bg-[#ffae01] hover:bg-[#042954]" label="Clear" />
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
