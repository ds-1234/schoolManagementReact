import React from 'react';

function DashboardCards() {
  return (
    <div className="flex space-x-6 mt-10">
      {/* Each column as a box */}
      <div className="flex-1 bg-white p-5 shadow-md rounded-md">
        <h3 className="font-semibold text-lg">Pay Fees</h3>
        <p className="text-gray-600">Manage and pay your fees here.</p>
      </div>
      <div className="flex-1 bg-white p-5 shadow-md rounded-md">
        <h3 className="font-semibold text-lg">Exam Result</h3>
        <p className="text-gray-600">View your exam results.</p>
      </div>
      <div className="flex-1 bg-white p-5 shadow-md rounded-md">
        <h3 className="font-semibold text-lg">Calendar</h3>
        <p className="text-gray-600">Check your academic calendar.</p>
      </div>
      <div className="flex-1 bg-white p-5 shadow-md rounded-md">
        <h3 className="font-semibold text-lg">Attendance</h3>
        <p className="text-gray-600">View your attendance record.</p>
      </div>
      {/* <div className="flex-1 bg-white p-5 shadow-md rounded-md">
        <h3 className="font-semibold text-lg">Attendance</h3>
        <p className="text-gray-600">View your attendance record.</p>
      </div> */}
    </div>
  );
}

export default DashboardCards;
