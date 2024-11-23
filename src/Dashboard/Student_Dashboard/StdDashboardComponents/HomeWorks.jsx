import React from 'react';

function HomeWorks() {
  // Sample data
  const homeworks = [
    {
      subject: 'Mathematics',
      description: 'RD Sharma - Page no. 28',
      teacher: 'Mr. Sharma',
      dueDate: '25 Nov 2024',
      percentage: 70,
      color: 'blue',
    },
    {
      subject: 'English',
      description: 'Vocabulary Introduction',
      teacher: 'Ms. Smith',
      dueDate: '26 Nov 2024',
      percentage: 40,
      color: 'green',
    },
    {
      subject: 'Physics',
      description: 'Write about Theory of Pendulum',
      teacher: 'Dr. Brown',
      dueDate: '24 Nov 2024',
      percentage: 90,
      color: 'purple',
    },
    {
      subject: 'Chemistry',
      description: 'Change of Elements',
      teacher: 'Dr. Taylor',
      dueDate: '27 Nov 2024',
      percentage: 50,
      color: 'red',
    },
  ];

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HomeWorks</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="subject" className="font-medium">Filter by Subject:</label>
          <select
            id="subject"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
          >
            <option value="">All</option>
            {homeworks.map((hw, index) => (
              <option key={index} value={hw.subject}>
                {hw.subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Homework List */}
      <div className="space-y-4">
        {homeworks.map((hw, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded-lg shadow-md"
          >
            {/* Subject Tag Above Description */}
            <div
              className={`px-3 py-1 text-sm font-medium text-white bg-${hw.color}-500 rounded-full mb-2`}
            >
              {hw.subject}
            </div>

            {/* Homework Details */}
            <div className="flex-1 ml-4">
              <p className="font-semibold">{hw.description}</p>
              <p className="text-sm text-gray-500">
                Teacher: {hw.teacher} | Due: {hw.dueDate}
              </p>
            </div>

            {/* Completion Percentage */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                {/* This circle's stroke color and dash array are dynamically set */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke={`#${hw.color}-500`}  // Dynamically set color
                  strokeWidth="3"
                  strokeDasharray={`${(hw.percentage * 2.51)}, 100`} // Filling circle based on percentage (100 * 0.0251 to scale it to 100)
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {hw.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeWorks;
