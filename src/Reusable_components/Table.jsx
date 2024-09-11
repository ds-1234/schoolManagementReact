import React, { useRef , useState} from 'react';
import DataTable from 'react-data-table-component';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';

const Table = ({ columns, data, searchOptions, onSearch, handleClear, onAddClick }) => {
  const searchInputRef = useRef(null);
  const checkboxRefs = useRef({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchClick = () => {
    const searchQuery = searchInputRef.current.value;
    const selectedCheckboxes = checkboxRefs.current;
    onSearch(searchQuery, selectedCheckboxes);
  };

  const clearFilters = () => {
    searchInputRef.current.value = '';
    Object.keys(checkboxRefs.current).forEach((key) => {
      checkboxRefs.current[key].checked = false;
    });
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
          className="flex items-center bg-green-500 text-white rounded-full transition-all duration-300 h-12 px-2 text-2xl w-12 absolute top-5 right-10 group-hover:w-28 group-hover:px-4 group-hover:text-xl"
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
            <div className="flex flex-wrap gap-4 mb-4 items-center">
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Select Filters
                  <FontAwesomeIcon icon={faAngleDown} className='ml-3'/>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute bg-white border rounded-lg shadow-lg p-4 mt-2 w-60 z-50">
                    {searchOptions.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          ref={(el) => (checkboxRefs.current[option.value] = el)}
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
              <Button
                onClick={handleSearchClick}
                className="mt-0"
                label="Search"
              />

              {/* Clear Button */}
              <Button
                onClick={clearFilters}
                className="mt-0 bg-[#ffae01] hover:bg-[#042954]"
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



