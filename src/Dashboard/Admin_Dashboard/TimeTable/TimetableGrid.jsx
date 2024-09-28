import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimetableGrid = ({ selectedClass, selectedSection }) => {
  const [timetableData, setTimetableData] = useState({});
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const colors = ['bg-red-300', 'bg-blue-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300', 'bg-pink-300']; // Color list for timetable tiles

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get('http://localhost:8080/timeTable/getTimeTable');
        console.log(response.data.data);
        
        const transformedData = transformData(response.data.data);
        setTimetableData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timetable:', error);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const transformData = (data) => {
    const result = {};
    data.forEach((item, index) => {
      // Check if className and weekDay are not null
      const className = item.className?.name || 'N/A';
      const section = item.className?.section || 'N/A';
      const day = item.weekDay || 'N/A';
      const time = item.startTime && item.endTime ? `${item.startTime} - ${item.endTime}` : 'N/A';
      const color = colors[index % colors.length]; // Assign a color from the list
  
      // Check if teacherName is not null
      const teacherName = item.teacherName
        ? `${item.teacherName?.firstName || 'N/A'} ${item.teacherName?.lastName || ''}`
        : 'N/A';
  
      // Only process valid class and section names
      if (!result[className]) result[className] = {};
      if (!result[className][section]) result[className][section] = {};
      if (!result[className][section][day]) result[className][section][day] = [];
  
      result[className][section][day].push({
        time,
        subject: item.className?.subject[0]?.subject || 'N/A', // Handle subject array or missing field
        teacher: teacherName,
        color,
      });
    });
    return result;
  };
  

  if (loading) {
    return <p>Loading timetable...</p>;
  }

  const timetable = timetableData[selectedClass]?.[selectedSection];

  return (
    <div>
      {timetable ? (
        <div className='flex flex-nowrap justify-evenly gap-4 bg-white pb-10 pt-4 rounded-lg'>
          {daysOfWeek.map((day) => (
            <div key={day}>
              <h3 className='text-base font-semibold text-[#202C4B] mb-4 '>{day}</h3>
              <div className='space-y-4'>
                {timetable[day] ? (
                  timetable[day].map((slot, index) => (
                    <div key={index} className={`${slot.color} text-gray-900 p-4 rounded-lg shadow-lg space-y-2`}>
                      <div className='flex items-center space-x-3 '>
                        <span className='text-sm font-semibold'>
                          <i className='far fa-clock'></i> {slot.time}
                        </span>
                      </div>
                      <p className='font-medium'>Subject: {slot.subject}</p>
                      <div className='flex items-center space-x-3'>
                        <p className='font-medium'>{slot.teacher}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 italic'>No classes</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No timetable available for this class and section.</p>
      )}
    </div>
  );
};

export default TimetableGrid;




