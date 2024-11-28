import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClassFaculties() {
  const tileWidth = 400; // Width for each tile
  const visibleTiles = 3; // Number of tiles visible at a time

  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeTableData, setTimeTableData] = useState([]);
  const [subjectData, setSubjectData] = useState({});

  // Fetch timetable data
  useEffect(() => {
    axios.get('http://localhost:8080/timeTable/getTimeTable')
      .then((response) => {
        const uniqueData = response.data.data.filter((entry, index, array) => {
          return array.findIndex(
            (e) => e.userId === entry.userId && e.subject[0] === entry.subject[0]
          ) === index;
        });
        setTimeTableData(uniqueData.filter((item) => item.className === 1));
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch subject data
  useEffect(() => {
    axios.get('http://localhost:8080/subject/getSubjectList')
      .then((response) => {
        const subjects = response.data.data.reduce((acc, subject) => {
          acc[subject.id] = subject.subject;
          return acc;
        }, {});
        setSubjectData(subjects);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to get subject name by ID
  const getSubjectName = (id) => {
    return subjectData[id] || 'Unknown Subject';
  };

  // Scroll logic to move by one tile at a time
  const scrollRight = () => {
    if (scrollPosition < timeTableData.length - visibleTiles) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const scrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Faculties</h1>
        <div className="flex space-x-2">
          <button onClick={scrollLeft} className="bg-gray-200 p-2 rounded-full">
            &#8592; {/* Left arrow */}
          </button>
          <button onClick={scrollRight} className="bg-gray-200 p-2 rounded-full">
            &#8594; {/* Right arrow */}
          </button>
        </div>
      </div>

      {/* Faculty List with scrolling */}
      <div className="overflow-x-hidden" style={{ width: `${tileWidth * visibleTiles}px` }}>
        <div
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(-${scrollPosition * tileWidth}px)`, // Scroll based on the fixed tile width
            width: `${tileWidth * timeTableData.length}px`, // Total width of the tiles (scrollable area)
          }}
        >
          {timeTableData.map((entry) => (
            <div key={entry.id} className="flex-shrink-0" style={{ width: `${tileWidth}px`, padding: '10px' }}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-semibold">Faculty ID: {entry.userId}</p>
                <p className="text-sm text-gray-500">Subject: {getSubjectName(entry.subject[0])}</p>

                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-blue-500">random@example.com</span>
                  <button className="bg-blue-500 text-white p-1 rounded-full">
                    <i className="fas fa-comments"></i> Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassFaculties;
