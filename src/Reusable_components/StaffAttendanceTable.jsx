import React, { useState, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const StaffAttendanceTable = ({
  columns,
  data,
  onFilterChange,
  onClearFilters,
  className,
  conditionalRowStyles = '',
}) => {
  const dropdownRef = useRef(null); // Ref to track the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    name: '',
    attendance: '',
  }); // State to track selected filters

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    onFilterChange({ ...selectedFilters, [field]: value }); // Notify parent of changes
  };

  const clearFilters = () => {
    setSelectedFilters({ name: '', attendance: '' });
    onClearFilters();
    setIsDropdownOpen(false);
  };

  // Custom styles for the table with bigger headers
  const customTableStyles = {
    headCells: {
      style: {
        backgroundColor: '#f3f4f6',
        fontWeight: 'bold',
        fontSize: '16px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
    cells: {
      style: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative bg-white shadow-md rounded-xl p-3 w-auto mx-auto mt-10">
        <div className="rounded-lg text-black">
          <div>
            {/* Filter Section */}
            <div className={`flex flex-wrap gap-4 mb-4 items-center ${className}`}>
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
                    {/* Name Filter */}
                    <div className="mb-4">
                      <label className="block text-gray-600 font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={selectedFilters.name}
                        onChange={(e) =>
                          handleFilterChange('name', e.target.value)
                        }
                        placeholder="Enter name"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                      />
                    </div>
                    {/* Attendance Filter */}
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">
                        Attendance
                      </label>
                      <select
                        value={selectedFilters.attendance}
                        onChange={(e) =>
                          handleFilterChange('attendance', e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                      >
                        <option value="">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Button */}
              <Button
                onClick={clearFilters}
                className="mt-0 bg-[#ffae01] hover:bg-[#042954]"
                label="Clear Filters"
              />
            </div>

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              customStyles={customTableStyles}
              conditionalRowStyles={conditionalRowStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAttendanceTable;
