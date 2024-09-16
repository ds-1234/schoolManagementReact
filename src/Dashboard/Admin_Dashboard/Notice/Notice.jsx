import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



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
       <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/ <span className='text-[#ffae01] font-semibold'>Notices</span> </p>

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
      
      <div className="p-6 max-w-4xl mx-auto bg-white space-y-2 my-10">
      
 {/* Search Inputs */}
<div className="flex gap-4 mb-6">
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
    className="border p-4 text-lg rounded w-full"  
    value={searchDate}
    onChange={(e) => setSearchDate(e.target.value)}
  />

  <input
    type="text"
    placeholder="Search by Title..."
    className="border p-4 text-lg rounded w-full"  
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
  />
  <button
    className="bg-yellow-500 text-white px-6 py-4 text-lg rounded"  
    onClick={handleSearch}
  >
    Search
  </button>
</div>


      {/* Notice List */}
      <div>
        {notices.map((notice) => (
          <div key={notice.id} className="border-b pb-6 mb-4">
            {/* Notice Header */}
            <div className="flex flex-col justify-start gap-4">
              
              {/* Date pill */}
            <div className="bg-green-500 text-white px-3 py-2 rounded-full text-md w-1/4">
                {new Date(notice.noticeDate).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

            {/* Notice Details */}
            <h1 className="text-3xl font-bold mt-2">{notice.noticeTitle}</h1>
            <p className="text-black">{notice.noticeDetails}</p>

            
              {/* Posted By and Time */}
              <span className="text-gray-500 text-sm">
                {notice.postedBy} / {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
    );
}

export default NoticeBoard;

