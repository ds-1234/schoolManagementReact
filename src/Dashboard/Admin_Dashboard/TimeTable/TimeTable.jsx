import React, { useState } from 'react';
import TimetableGrid from './TimetableGrid';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const TimeTable = () => {
  const [view, setView] = useState('home'); // home, class, section, timetable
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isFilterOpen , setIsFilterOpen] = useState(false) 

  // Sample data for classes and sections
  const classes = ['Class 1', 'Class 2', 'Class 3'];
  const sections = {
    'Class 1': ['Section A', 'Section B'],
    'Class 2': ['Section A'],
    'Class 3': ['Section A', 'Section B', 'Section C'],
  };

  const handleClassClick = (className) => {
    setSelectedClass(className);
    setView('section');
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setView('timetable');
  };

  // Toggle filter dropdown visibility
  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className='flex flex-col justify-start '>
        <h1 className='text-lg md:text-3xl  font-semibold text-black mt-5'>Time Table</h1>
        <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>

    <div className=" bg-white rounded-lg p-4 mt-10">
       <div className=' flex justify-between items-center mb-2'>
            <h1 className='text-lg md:text-xl font-semibold text-[#202C4B] mb-2'>Time Table</h1>

             {/* Filter button */}
            {view == 'timetable' && (
              <div className='relative'>
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:shadow-md hover:shadow-gray-300 flex gap-2 items-center"
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filter
                <FontAwesomeIcon icon ={faAngleDown}/>
              </button>

              {/* Show Filter Form */}
              {isFilterOpen && (
                <div className="absolute bg-gray-100 border rounded-lg shadow-lg p-4 mt-2 w-60 z-50">
                    <h2 className="mb-4 text-lg font-bold">Filter</h2>

                    {/* Class Select */}
                    <label className="block mb-2 text-sm font-medium text-gray-700">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full p-2 mb-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-md"
                    >
                      {classes.map((cls, index) => (
                        <option key={index} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>

                  {/* Section Select */}
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full p-2 mb-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {sections[selectedClass].map((sec, index) => (
                      <option key={index} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            )}
          </div>
      

       <hr className='mb-2'/>

      {view === 'home' && (
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:shadow-md hover:shadow-blue-200 hover:font-semibold "
            onClick={() => setView('class')}
          >
            Class Time Table
          </button>
          <button className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:shadow-md hover:shadow-green-200 hover:font-semibold ">
            Teacher Time Table
          </button>
        </div>
      )}

      {view === 'class' && (
        <div>
            <h2 className="text-lg mb-4 text-black font-semibold mt-2">Classes</h2>
        <div className="grid grid-cols-3 gap-6 text-black ">
          {classes.map((className) => (
            <div
              key={className}
              className="p-4 bg-red-100 rounded-lg cursor-pointer text-center shadow-md shadow-gray-100 "
              onClick={() => handleClassClick(className)}
            >
              {className}
            </div>
          ))}
        </div>
        </div>
      )}

      {view === 'section' && (
        <div>
            <h2 className="text-lg mb-4 text-black font-semibold mt-2">Sections</h2>
        <div className="grid grid-cols-3 gap-6 text-black ">
          {sections[selectedClass].map((section) => (
            <div
              key={section}
              className="p-4 bg-red-100 rounded-lg cursor-pointer text-center shadow-md shadow-gray-100 "
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </div>
          ))}
        </div>
        </div>
      )}

      {view === 'timetable' && (
        <div>
          <h2 className="text-lg mb-4 text-black font-semibold mt-2">
            Time Table for {selectedClass} - {selectedSection}
          </h2>
          <TimetableGrid selectedClass={selectedClass} selectedSection={selectedSection}/>
        </div>
      )}
    </div>
    </div>
  );
};

export default TimeTable;
