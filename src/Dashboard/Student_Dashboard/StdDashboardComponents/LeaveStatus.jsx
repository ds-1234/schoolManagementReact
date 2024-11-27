import React, { useState } from 'react';

function LeaveStatus() {
  // Sample data for leave types and their statuses
  const leaveData = [
    { type: 'Emergency Leave', date: '2024-11-12', status: 'Pending' },
    { type: 'Medical Leave', date: '2024-11-05', status: 'Approved' },
    { type: 'Casual Leave', date: '2024-11-03', status: 'Declined' },
    { type: 'Fever Leave', date: '2024-11-08', status: 'Approved' },
  ];

  // Status colors mapping
  const statusColors = {
    Pending: 'bg-gray-400',
    Approved: 'bg-green-500',
    Declined: 'bg-red-500',
  };

  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Status</h1>

        {/* Dropdown for "This Month" or "This Year" */}
        <select
          value={selectedPeriod}
          onChange={handleDropdownChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* Leave Types List */}
      <div className="space-y-4">
        {leaveData.map((leave, index) => (
          <div key={index} className="flex justify-between items-center border-b h-20 pb-2 border rounded-lg shadow-md">
            <div className="flex-1">
              {/* Leave Type and Date */}
              <p className="font-semibold ml-5">{leave.type}</p>
              <p className="text-sm text-gray-600 ml-5">{leave.date}</p>
            </div>

            <div className="flex items-center">
              {/* Status Tag */}
              <span
                className={`px-4 py-1 text-white rounded-full ${statusColors[leave.status]}`}
              >
                {leave.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveStatus;
