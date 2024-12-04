import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import BASE_URL from '../conf/conf';

const Calendar = ({ attendanceMap }) => {
  // Set the initial date to the previous month
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [statusMap, setStatusMap] = useState({});

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startOfWeek = startOfMonth.startOf('week');
  const endOfWeek = endOfMonth.endOf('week');

  // Define the minimum and maximum months
  const minMonth = dayjs().year(currentDate.year()).month(3); // April of the current year
  const maxMonth = dayjs(); // Current month

  const handlePrevMonth = () => {
    // Only allow moving to the previous month if it doesn't go before April
    if (!currentDate.isSame(minMonth, 'month')) {
      setCurrentDate(currentDate.subtract(1, 'month'));
    }
  };

  const handleNextMonth = () => {
    // Only allow moving to the next month if it doesn't exceed the current month
    if (!currentDate.isSame(maxMonth, 'month')) {
      setCurrentDate(currentDate.add(1, 'month'));
    }
  };

  const days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const isToday = (date) => dayjs().isSame(date, 'day');
  const isCurrentMonth = (date) => currentDate.isSame(date, 'month');

    // Fetch attendance statuses
    const fetchAttendanceStatuses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        // Transform the response into a usable status map
        const statuses = response.data.data.reduce((map, { id, attendanceStatus }) => {
          map[id] = attendanceStatus;
          return map;
        }, {});
  
        setStatusMap(statuses);
        console.log('Status Map:', statuses);
      } catch (error) {
        console.error('Error fetching attendance statuses:', error);
        throw error; // Ensure fetchAttendanceData doesn't execute if this fails
      }
    };

    useEffect(() => {
      fetchAttendanceStatuses()
    } , [attendanceMap])

  return (
    <div className="max-w-md mx-auto p-4">
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth} 
          className={`text-gray-500 ${currentDate.isSame(minMonth, 'month') ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentDate.isSame(minMonth, 'month')}
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <button 
          onClick={handleNextMonth} 
          className={`text-gray-500 ${currentDate.isSame(maxMonth, 'month') ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentDate.isSame(maxMonth, 'month')}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className="font-bold">{day}</div>
        ))}
        {days.map((day, idx) => {    
          const formattedDate = day.format('MM/D/YYYY');
          return (
            <div
              key={idx}
              className={`p-2 h-16 flex flex-col items-center justify-center 
                ${isCurrentMonth(day) ? 'text-black' : 'text-gray-400'} 
                ${isToday(day) ? 'bg-blue-500 text-white rounded-full' : ''}`}
            >
              <span>{day.date()}</span>
              {attendanceMap[formattedDate] && (
                <span
                  className={`w-2 h-2 rounded-full mt-1 ${
                    statusMap[attendanceMap[formattedDate]] === "Present" ? "bg-green-500" :
                    statusMap[attendanceMap[formattedDate]]  === "Absent" ? "bg-red-500" :
                    statusMap[attendanceMap[formattedDate]]  === "Half Day" ? "bg-yellow-500" :
                    statusMap[attendanceMap[formattedDate]]  === "Medical" ? "bg-blue-500" :
                    "bg-gray-500" // Default color for unexpected statuses
                  }`}
                ></span>
              )}
            </div>
          )})}
      </div>
    </div>
  );
};

export default Calendar;
