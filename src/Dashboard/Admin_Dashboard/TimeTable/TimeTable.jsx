import React, { useState } from 'react';
import TimetableGrid from './TimetableGrid';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter , faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTimeTable from './AddTimeTable';
import studentTT from '../../../assets/studying.png'
import teacherTT from '../../../assets/time.png'
import classroom from '../../../assets/class.png'

const TimeTable = () => {
  const [view, setView] = useState('home'); // home, class, section, timetable
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isFilterOpen , setIsFilterOpen] = useState(false)
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);


  
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

  const handleAddClick = () => {
    openAddPopup()
  }

  return (
    <div className='flex flex-col justify-start mr-0'>
        <h1 className='text-lg md:text-3xl  font-semibold text-black mt-5'>Time Table</h1>
        <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ {view != 'home' && (<NavLink  onClick={() => setView('home')}> Home / </NavLink> )} <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>

      {/* Add Button on right side of page */}
      <div className='group'>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1 bg-green-500 text-white rounded-full transition-all duration-300 h-12 px-3 text-2xl w-12 absolute top-20 right-10 group-hover:w-24 group-hover:px-4  group-hover:text-xl"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-1  font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add 
          </span>
        </button>
      </div>

      <AddTimeTable 
      isOpen={isAddPopupOpen} 
      onClose={closeAddPopup} 
      />



      {view === 'home' && (
        <div className='flex items-center justify-center mt-24 gap-5'>

          {/* Class Time Table Tile */}
          <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => setView('class')}>
            <img
              src={studentTT}
              alt="Class Time Table"
              className="w-full object-cover px-4 py-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Class Time Table</h3>
            </div>
          </div>

          {/* Teacher Time Table Tile */}
          <div 
          className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto hover:bg-gray-400 hover:text-white cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => setView('teacher')}>
            <img
              src={teacherTT}
              alt="Teacher Time Table"
              className="w-full py-4 px-4 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Teacher Time Table</h3>
            </div>
          </div>
        </div>
      )}

      {view === 'class' && (
        <div className='mt-10 '>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Classes</h2>
          <div className="flex justify-center items-center gap-5 mx-20">
            {classes.map((className, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-lg font-semibold  hover:bg-gray-400 hover:shadow-xl hover:text-white transition-transform transform hover:scale-105 cursor-pointer w-60 flex flex-col justify-center items-center "
                onClick={() => handleClassClick(className)} 
              >
                <img
                  src={classroom}
                  alt="Class"
                  className="w-28 h-28 px-4 py-4"
                />
                {className}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'section' && (
        <div className='mt-10'>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sections</h2>
          <div className="flex justify-center items-center gap-5 mx-20">
            {sections[selectedClass].map((section, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-lg font-semibold hover:bg-gray-400 hover:shadow-xl hover:text-white transition-transform transform hover:scale-105 cursor-pointer w-60 flex flex-col justify-center items-center"
                onClick={() => handleSectionClick(section)}
              >
                <img
                  src={classroom} 
                  alt="Section"
                  className="w-28 h-28 px-4 py-4"
                />
                {section}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'timetable' && (
        <div>
          <div className=' flex justify-between items-center m-4'>
            <h2 className="text-lg mb-4 text-black font-semibold mt-2">
              Time Table for {selectedClass} - {selectedSection}
            </h2>
            {/* Filter button */}
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
                <div className="absolute bg-gray-100 border rounded-lg shadow-lg p-4 mt-2 w-60 z-50 right-0">
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
          </div>
          <TimetableGrid selectedClass={selectedClass} selectedSection={selectedSection}/>
        </div>
      )}
    </div>
  );
};

export default TimeTable;
