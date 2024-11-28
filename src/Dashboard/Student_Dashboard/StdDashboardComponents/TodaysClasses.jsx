import React, { useState, useEffect } from 'react';

// Function to fetch subject name based on subject ID
const getSubjectNameById = (subjectId, subjectList) => {
  const subject = subjectList.find((sub) => sub.id === subjectId);
  return subject ? subject.subject : 'Unknown Subject';
};

function TodaysClasses() {
  const [date, setDate] = useState(new Date());
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const user = JSON.parse(sessionStorage.getItem('user')); // Assuming user object is stored in session storage
  const userClassName = user?.className;

  // Fetch subjects list
  useEffect(() => {
    fetch('http://localhost:8080/subject/getSubjectList')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubjectList(data.data); // Store the subjects list for later lookup
        }
      });
  }, []);

  // Fetch timetable data
  useEffect(() => {
    fetch('http://localhost:8080/timeTable/getTimeTable')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setClasses(data.data);
        }
      });
  }, []);

  useEffect(() => {
    if (classes.length > 0 && subjectList.length > 0) {
      filterClassesByDateAndStatus();
    }
  }, [date, classes, subjectList]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const filterClassesByDateAndStatus = () => {
    const currentDay = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get day name
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Current time in 24-hour format
    console.log(currentTime,'currenttime')

    const filtered = classes
      // .filter((classItem) => classItem.className == userClassName[0]) // Filter by className
      .filter((classItem) => classItem.weekDay === currentDay) // Filter by day of the week
      .map((classItem) => {
        if (formatDate(date) === formatDate(new Date())) {
          // Today's date: Check time for status
          const { startTime, endTime } = classItem;
          const isCompleted =
            currentTime >= startTime && currentTime <= endTime ? 'Incompleted' : 'Completed';
            console.log(isCompleted,'iscompleted')
          return { ...classItem, status: isCompleted };

        } else {
          // Other dates: All are Completed
          return { ...classItem, status: 'Completed' };
        }
      });

    setFilteredClasses(filtered);
  };

  return (
    <div className="p-5 font-sans bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Classes</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDateChange(-1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            &lt;
          </button>
          <span className="text-lg font-medium">{formatDate(date)}</span>
          <button
            onClick={() => handleDateChange(1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            &gt;
          </button>
        </div>
      </div>

      <hr className="my-5 border-gray-300" />

      {filteredClasses.length > 0 ? (
        <ul className="space-y-3">
          {filteredClasses.map((classItem, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-200"
            >
              <div>
                <span className="text-lg">
                  {getSubjectNameById(classItem.subject[0], subjectList)}
                </span>
                <div className="flex items-center text-sm text-gray-500 mt-1 ml-4">
                  <i className="fas fa-clock mr-2"></i>
                  <span >
                    {classItem.startTime} - {classItem.endTime}
                  </span>
                </div>
              </div>
              <span
                className={`text-lg font-medium ${
                  classItem.status === 'Completed' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {classItem.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500">No classes</p>
      )}
    </div>
  );
}

export default TodaysClasses;
