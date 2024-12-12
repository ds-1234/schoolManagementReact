import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../../Reusable_components/Button';
import Tile from './Tile';
import AddBtn from '../../../Reusable_components/AddBtn'
import BASE_URL from '../../../conf/conf';



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
      const response = await axios.get(`${BASE_URL}/notice/getNoticeList`);
      const sortedNotices = response.data.data.sort(
        (a, b) => new Date(a.noticeDate) - new Date(b.noticeDate) // Sort by newest date
      );
      setNotices(sortedNotices);
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
       <p className='mt-2'><NavLink to = '/admin'> Dashboard  </NavLink>/ <span className='text-[#ffae01] font-semibold'>Notice Board</span> </p>

      <AddBtn onAddClick={addClick}/>
      
      <div className="p-12 rounded-md  mx-auto bg-white space-y-2 my-5">
      
 {/* Search Inputs */}
<div className="flex gap-2 mb-6 sm:flex-nowrap flex-wrap">
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
    className="border p-2  rounded-xl sm:w-full w-1/2"  
    value={searchDate}
    onChange={(e) => setSearchDate(e.target.value)}
  />

  <input
    type="text"
    placeholder="Search by Title..."
    className="border p-2 rounded-xl sm:w-full w-1/2"  
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
  />
  <Button
  label = 'Search'
    className="bg-yellow-500 text-white px-2 py-2"  
    onClick={handleSearch}
  >
    Search
  </Button>
</div>


      {/* Notice List */}
      <div className='grid gap-4'>
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

