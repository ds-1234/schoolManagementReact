import React, { useState } from 'react';

function ClassFaculties() {
  // Sample data for tiles
  const faculties = [
    { id: 1, image: 'https://via.placeholder.com/50', teacher: 'Mr. Sharma', subject: 'Mathematics', email: 'sharma@example.com' },
    { id: 2, image: 'https://via.placeholder.com/50', teacher: 'Ms. Smith', subject: 'English', email: 'smith@example.com' },
    { id: 3, image: 'https://via.placeholder.com/50', teacher: 'Dr. Brown', subject: 'Physics', email: 'brown@example.com' },
    { id: 4, image: 'https://via.placeholder.com/50', teacher: 'Dr. Taylor', subject: 'Chemistry', email: 'taylor@example.com' },
    { id: 5, image: 'https://via.placeholder.com/50', teacher: 'Mr. Gupta', subject: 'Biology', email: 'gupta@example.com' },
    { id: 6, image: 'https://via.placeholder.com/50', teacher: 'Ms. Khan', subject: 'History', email: 'khan@example.com' },
    { id: 7, image: 'https://via.placeholder.com/50', teacher: 'Mr. Kumar', subject: 'Geography', email: 'kumar@example.com' },
    { id: 8, image: 'https://via.placeholder.com/50', teacher: 'Ms. Patel', subject: 'Chemistry', email: 'patel@example.com' },
    { id: 9, image: 'https://via.placeholder.com/50', teacher: 'Dr. Singh', subject: 'Physics', email: 'singh@example.com' },
    { id: 10, image: 'https://via.placeholder.com/50', teacher: 'Mr. Verma', subject: 'Mathematics', email: 'verma@example.com' }
  ];

  const tileWidth = 400; // Width for each tile
  const visibleTiles = 3; // Number of tiles visible at a time
  const totalTiles = faculties.length;
  
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll logic to move by one tile at a time
  const scrollRight = () => {
    if (scrollPosition < totalTiles - visibleTiles) {
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
            width: `${tileWidth * totalTiles}px`, // Total width of the tiles (scrollable area)
          }}
        >
          {faculties.map((faculty) => (
            <div key={faculty.id} className="flex-shrink-0" style={{ width: `${tileWidth}px`, padding: '10px' }}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img src={faculty.image} alt="Teacher" className="w-16 h-16 rounded-full mb-3" />
                <p className="font-semibold">{faculty.teacher}</p>
                <p className="text-sm text-gray-500">{faculty.subject}</p>

                <div className="flex items-center mt-2 space-x-2">
                  <a href={`mailto:${faculty.email}`} className="text-blue-500">
                    <i className="fas fa-envelope"></i> {faculty.email}
                  </a>
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
