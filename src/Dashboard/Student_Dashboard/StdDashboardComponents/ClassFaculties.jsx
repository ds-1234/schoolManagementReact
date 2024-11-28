import React, { useState, useEffect } from 'react';

function ClassFaculties() {
  const [faculties, setFaculties] = useState([]);
  const tileWidth = 400; // Width for each tile
  const visibleTiles = 3; // Number of tiles visible at a time
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fetch timetable data from the API
  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const response = await fetch('http://localhost:8080/timeTable/getTimeTable');
        const data = await response.json();

        if (data.success) {
          const filteredData = [];
          const seen = new Set(); // To track unique userId and subject pairs

          data.data.forEach((item) => {
            if (item.className === 1) {
              const uniqueKey = `${item.userId}-${item.subject[0]}`;
              if (!seen.has(uniqueKey)) {
                seen.add(uniqueKey);
                filteredData.push({
                  id: item.id,
                  userId: item.userId, // Use userId directly
                  subject: item.subject[0], // Use subject ID
                  email: "placeholder@example.com", // Placeholder email
                });
              }
            }
          });

          setFaculties(filteredData);
        }
      } catch (error) {
        console.error('Error fetching timetable data:', error);
      }
    };

    fetchTimetableData();
  }, []);

  const totalTiles = faculties.length;

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
            <div key={faculty.id} className="flex-shrink-0" style={{ width: `${tileWidth}px`, padding: "10px" }}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img src="https://via.placeholder.com/50" alt="Teacher" className="w-16 h-16 rounded-full mb-3" />
                <p className="font-semibold">User ID: {faculty.userId}</p>
                <p className="text-sm text-gray-500">Subject ID: {faculty.subject}</p>

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
