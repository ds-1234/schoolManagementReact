import React from 'react';

const TimetableGrid = ({ selectedClass, selectedSection }) => {
  const timetableData = {
    'Class 1': {
      'Section A': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        Tuesday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        Wednesday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        Thursday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        Friday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        Saturday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
          { time: '09:45 - 10:30 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],

      },
      'Section B': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'Physics', teacher: 'Teresa', color: 'bg-yellow-300', teacherImage: 'https://example.com/teresa.jpg' },
        ],
        // Other days...
      },
    },
    'Class 2': {
      'Section A': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'Maths', teacher: 'Jacquelin', color: 'bg-red-300', teacherImage: 'https://example.com/jacquelin.jpg' },
        ],
        // Other days...
      },
    },
    'Class 3': {
      'Section A': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'English', teacher: 'Hellana', color: 'bg-blue-300', teacherImage: 'https://example.com/hellana.jpg' },
        ],
        // Other days...
      },
      'Section B': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'History', teacher: 'Frank', color: 'bg-purple-300', teacherImage: 'https://example.com/frank.jpg' },
        ],
        // Other days...
      },
      'Section C': {
        Monday: [
          { time: '09:00 - 09:45 AM', subject: 'Geography', teacher: 'Sarah', color: 'bg-pink-300', teacherImage: 'https://example.com/sarah.jpg' },
        ],
        // Other days...
      },
    },
  };

  const timetable = timetableData[selectedClass]?.[selectedSection];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
  <div>
    {timetable ? (
      <div className='flex flex-nowrap justify-evenly gap-4 bg-white pb-10 pt-4 rounded-lg'>
        {daysOfWeek.map((day) => (
          <div key={day} >
            <h3 className='text-base font-semibold text-[#202C4B] mb-4 '>{day}</h3>
            <div className='space-y-4'>
              {timetable[day] ? (
                timetable[day].map((slot, index) => (
                  <div key={index} className={`${slot.color} text-gray-900 p-4 rounded-lg shadow-lg space-y-2`}>
                    <div className='flex items-center space-x-3 '>
                      <span className='text-sm  font-semibold'><i className='far fa-clock'></i> {slot.time}</span>
                    </div>
                    <p className=' font-medium'>Subject: {slot.subject}</p>
                    <div className='flex items-center space-x-3'>
                      {/* <img src={slot.teacherImage} alt={slot.teacher} className='w-10 h-10 rounded-full' /> */}
                      <p className=' font-medium'>{slot.teacher}</p>
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

