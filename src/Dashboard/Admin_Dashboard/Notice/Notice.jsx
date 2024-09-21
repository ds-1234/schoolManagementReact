import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Reusable_components/Button';
import Tile from './Tile';



function NoticeBoard() {

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };


  const [notices, setNotices] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate()

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notice/getNoticeList');
      setNotices(response.data.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSearch = () => {
    const filteredNotices = notices.filter((notice) => {
      return (
        (!searchDate || notice.noticeDate.includes(searchDate)) &&
        (!searchTitle || notice.noticeTitle.toLowerCase().includes(searchTitle.toLowerCase()))
      );
    });
    setNotices(filteredNotices);
  };

  const addClick = () => {
    navigate('/admin/AddNotice')
  }

  return (

    <div className='h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Notice Board</h1>
       <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Notice Board</span> </p>

       <div className='group'>
        <button
          onClick={addClick}
          className="flex items-center bg-green-500 text-white rounded-full transition-all duration-300 h-12 px-2 text-2xl w-12 absolute top-5 right-10 group-hover:w-28 group-hover:px-4 group-hover:text-xl"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add
          </span>
        </button>
      </div>
      
      <div className="p-12 max-w-7xl mx-auto bg-white space-y-2 my-10">
      
 {/* Search Inputs */}
<div className="flex gap-4 mb-6 ">
  <input
    // type="date"
    placeholder="Search by Date..."
    onFocus={(e) => {
      e.target.type = 'date'; 
      e.target.placeholder = ''; 
      console.log('focused')
    }}
    onBlur={(e) => {
      const value = e.target.value;
      e.target.type = 'text'; // Switch back to text input on blur
      e.target.placeholder = 'Search by Date...'; // Restore placeholder

      // Reformat the date to dd/mm/yyyy if a date is selected
      if (value) {
        e.target.value = formatDateToDDMMYYYY(value);
      }
    }}
    className="border p-4 text-lg rounded-xl w-full"  
    value={searchDate}
    onChange={(e) => setSearchDate(e.target.value)}
  />

  <input
    type="text"
    placeholder="Search by Title..."
    className="border p-4 text-lg rounded-xl w-full"  
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
  />
  <Button
  label = 'Search'
    className="bg-yellow-500 text-white px-6 py-4 text-lg "  
    onClick={handleSearch}
  >
    Search
  </Button>
</div>


      {/* Notice List */}
      <div className='grid gap-6'>
          {notices.map((notice,index) => (
            <Tile
              key={notice.id}
              title={notice.noticeTitle}
              details={notice.noticeDetails}
              date={notice.noticeDate}
              postedBy={notice.postedBy}
              index={index}
            />
          ))}
        </div>
    </div>
  </div>
    );
}

export default NoticeBoard;

