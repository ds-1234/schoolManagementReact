import React from 'react';

const TeacherTTGrid = ({ timetableData }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const colors = ['bg-red-300', 'bg-blue-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300', 'bg-pink-300'];

  const transformData = (data) => {
    const result = {};
    data.forEach((item, index) => {
      const day = item.weekDay || 'N/A';
      const time = `${item.startTime} - ${item.endTime}`;
      const color = colors[index % colors.length]; // Assign a color from the list

      if (!result[day]) result[day] = [];

      result[day].push({
        time,
        subject: item.subject?.name || 'N/A',
        className: item.className?.name || 'N/A',
        section: item.className?.section || 'N/A',
        color,
      });
    });
    return result;
  };

  const transformedTimetable = transformData(timetableData);

  return (
    <div className='flex flex-nowrap justify-evenly gap-4 bg-white pb-10 pt-4 rounded-lg'>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h3 className='text-base font-semibold text-[#202C4B] mb-4'>{day}</h3>
          <div className='space-y-4'>
            {transformedTimetable[day] ? (
              transformedTimetable[day].map((slot, index) => (
                <div key={index} className={`${slot.color} text-gray-900 p-4 rounded-lg shadow-lg space-y-2`}>
                  <div className='flex items-center space-x-3'>
                    <span className='text-sm font-semibold'>
                      <i className='far fa-clock'></i> {slot.time}
                    </span>
                  </div>
                  <p className='font-medium'>Subject: {slot.subject}</p>
                  <p className='font-medium'>Class: {slot.className} - {slot.section}</p>
                </div>
              ))
            ) : (
              <p className='text-gray-500 italic'>No classes</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherTTGrid;
