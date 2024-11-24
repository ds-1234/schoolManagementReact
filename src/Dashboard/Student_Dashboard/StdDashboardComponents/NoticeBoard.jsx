import React from 'react';

function NoticeBoard() {
  // Example notice data
  const notices = [
    { title: 'New Syllabus Instruction', addedOn: '2024-11-20' },
    { title: 'World Environment Program', addedOn: '2024-11-18' },
    { title: 'Exam Preparation Notification!', addedOn: '2024-11-15' },
    { title: 'Online Class Preparation', addedOn: '2024-11-10' },
    { title: 'Exam Time Table Release', addedOn: '2024-11-08' },
    { title: 'English Exam Preparation', addedOn: '2024-11-05' },
  ];

  return (
    <div className="p-6 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notice Board</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => console.log('Navigating to View All')}
        >
          View All
        </button>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b h-20 pb-2 border rounded-lg shadow-md  last:border-none"
          >
            <div className="flex items-center ml-4 mr-4">
              {/* Calendar Icon */}
              <div className="w-8 h-8 bg-blue-500 text-white flex justify-center items-center rounded-full mr-4 text-lg">
                📅
              </div>
              {/* Notice Title and Date */}
              <div>
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-500">Added on: {notice.addedOn}</p>
              </div>
            </div>
            {/* Right Arrow for Navigation */}
            <div
              className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600 transition"
              onClick={() => console.log(`Navigating to details of: ${notice.title}`)}
            >
              ➡️
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeBoard;
