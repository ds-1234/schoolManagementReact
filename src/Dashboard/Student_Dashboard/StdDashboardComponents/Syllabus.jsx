import React from 'react';

function Syllabus() {
  // Example syllabus data with random percentages
  const subjects = [
    { name: 'Maths', progress: 75 },
    { name: 'Physics', progress: 50 },
    { name: 'Chemistry', progress: 85 },
    { name: 'Botany', progress: 60 },
    { name: 'English', progress: 90 },
    { name: 'Spanish', progress: 40 },
    { name: 'Japanese', progress: 30 },
  ];

  return (
    <div className="p-6 font-sans">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Syllabus</h2>

      {/* Subject List */}
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Subject Name */}
            <span className="w-32 text-lg font-medium">{subject.name}</span>
            
            {/* Progress Bar */}
            <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
            
            {/* Progress Percentage */}
            <span className="text-gray-700 font-medium">{subject.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Syllabus;
