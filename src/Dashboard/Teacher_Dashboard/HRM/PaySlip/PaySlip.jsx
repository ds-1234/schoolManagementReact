import React from 'react';

const PaySlip = ({ data }) => {
  if (!data) {
    return <p className="text-center text-gray-500">No Pay Slip Data Available</p>;
  }

  return (
    <div className="max-w-full mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {/* Header Section */}
      <div className="text-white text-center font-bold py-3 bg-blue-900">
        {data.schoolName || 'School Name'}
      </div>
      <div className="flex justify-between items-center py-2 px-4 bg-blue-200">
        <h2 className="text-lg font-semibold">Salary Slip</h2>
        <div className="text-right">
          <p className="text-gray-700 font-semibold">Month: {data.payPeriod}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b">
        {/* Left Column */}
        <div>
          <p className="text-gray-700"><strong>Employee Name:</strong> {data.empName}</p>
          <p className="text-gray-700"><strong>Employee ID:</strong> {data.employeeId}</p>
          <p className="text-gray-700"><strong>Department:</strong> {data.department}</p>
          <p className="text-gray-700"><strong>Designation:</strong> {data.designation}</p>
          <p className="text-gray-700"><strong>Bank Name:</strong> {data.bankName}</p>
          <p className="text-gray-700"><strong>Account Number:</strong> {data.accountNumber}</p>
          <p className="text-gray-700"><strong>Branch Name:</strong> {data.branchName}</p>
        </div>

        {/* Right Column */}
        <div>
          <p className="text-gray-700"><strong>Date of Joining:</strong> {data.dateOfJoining}</p>
          <p className="text-gray-700"><strong>Paid Days:</strong> {data.paidDays}</p>
          <p className="text-gray-700"><strong>Lost of Pay Days:</strong> {data.lossOfPaydays}</p>
          <p className="text-gray-700"><strong>Pay Date:</strong> {data.payDate}</p>
        </div>
      </div>

      {/* Salary Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b">
        {/* Earnings */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center text-white bg-blue-900">Income</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold">Amount</p>
          </div>
          <p className="text-gray-700"><strong>Basic Salary:</strong> ₹{data.basicPayEarning}</p>
          <p className="text-gray-700"><strong>HRA:</strong> ₹{data.houseRentAllowEarning}</p>
          <p className="text-gray-700"><strong>Allowances:</strong> ₹{data.specialPayAllowance}</p>
          <p className="text-gray-700"><strong>Over Time Pay:</strong> ₹{data.overTimePay}</p>
          <p className="text-gray-700"><strong>Gross Salary:</strong> ₹{data.grossSalary}</p>
        </div>

        {/* Deductions */}
        <div>
          <h3 className="text-lg font-semibold mb-2  text-white  bg-blue-900">Deductions</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold">Amount</p>
          </div>
          <p className="text-gray-700"><strong>Tax:</strong> ₹{data.incomeTaxDeduction}</p>
          <p className="text-gray-700"><strong>Provident Fund:</strong> ₹{data.pfDeduction}</p>
          <p className="text-gray-700"><strong>Gratuity Deductions:</strong> ₹{data.gratuityDeduction || 0}</p>
          <p className="text-gray-700"><strong>Professional Tax:</strong> ₹{data.professionalTax || 0}</p>
          <p className="text-gray-700"><strong>Advance Pay:</strong> ₹{data.advancePay || 0}</p>
          <p className="text-gray-700"><strong>Total Deduction:</strong> ₹{data.totalDeduction || 0}</p>
        </div>
      </div>

      {/* Net Salary Section */}
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800">
          <strong>Net Salary:</strong> ₹{data.totalNetPay}
        </p>
      </div>
    </div>
  );
};

export default PaySlip;
