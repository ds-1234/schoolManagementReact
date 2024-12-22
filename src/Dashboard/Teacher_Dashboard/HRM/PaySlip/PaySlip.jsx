import React from 'react';

const PaySlip = ({ data }) => {
  if (!data) {
    return <p className="text-center text-gray-500">No Pay Slip Data Available</p>;
  }

  return (
    <div className="max-w-full mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {/* Header Section */}
      <div className="text-white text-center font-bold py-3 bg-blue-900 border-b border-gray-300">
        {data.schoolName || 'School Name'}
      </div>
      <div className="flex justify-between items-center py-2 px-4 bg-blue-200 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Salary Slip</h2>
        <div className="text-right">
          <p className="text-gray-700 font-semibold">Month: {data.payPeriod}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-300 divide-y divide-gray-300">
        {/* Left Column */}
        <div className="space-y-2 divide-y divide-gray-300">
        <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
        <p className="text-gray-700 font-semibold"><strong>Employee Name:</strong></p>
            <p className="text-gray-700 text-center">{data.empName}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Employee ID:</strong></p>
            <p className="text-gray-700 text-center">{data.employeeId}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Department:</strong></p>
            <p className="text-gray-700 text-center">{data.department}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Designation:</strong></p>
            <p className="text-gray-700 text-center">{data.designation}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Bank Name:</strong></p>
            <p className="text-gray-700 text-center">{data.bankName}</p>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-2 divide-y divide-gray-300">
        <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
        <p className="text-gray-700 font-semibold"><strong>Date of Joining:</strong></p>
            <p className="text-gray-700 text-center">{data.dateOfJoining}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Paid Days:</strong></p>
            <p className="text-gray-700 text-center">{data.paidDays}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Lost of Pay Days:</strong></p>
            <p className="text-gray-700 text-center">{data.lossOfPaydays}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Pay Date:</strong></p>
            <p className="text-gray-700 text-center">{data.payDate}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Account Number:</strong></p>
            <p className="text-gray-700 text-center">{data.accountNumber}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 font-semibold"><strong>Branch Name:</strong></p>
            <p className="text-gray-700 text-center">{data.branchName}</p>
          </div>
        </div>
      </div>

      {/* Salary Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-300 divide-y divide-gray-300">
        {/* Earnings */}
        <div className="space-y-2 divide-y divide-x divide-gray-300">
          <h3 className="text-lg font-semibold mb-2 text-center text-white bg-blue-900 py-2 border-b border-gray-300">Income</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded border-b border-gray-300">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold text-center">Amount</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Basic Salary:</strong></p>
            <p className="text-gray-700 text-center">₹{data.basicPayEarning}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>HRA:</strong></p>
            <p className="text-gray-700 text-center">₹{data.houseRentAllowEarning}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Allowances:</strong></p>
            <p className="text-gray-700 text-center">₹{data.specialPayAllowance}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Over Time Pay:</strong></p>
            <p className="text-gray-700 text-center">₹{data.overTimePay}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Gross Salary:</strong></p>
            <p className="text-gray-700 text-center">₹{data.grossSalary}</p>
          </div>
        </div>

        {/* Deductions */}
        <div className=" space-y-2 divide-y divide-gray-300">
          <h3 className="text-lg font-semibold mb-2 text-center text-white bg-blue-900 py-2 border-b border-gray-300">Deductions</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded border-b border-gray-300">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold text-center">Amount</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Tax:</strong></p>
            <p className="text-gray-700 text-center">₹{data.incomeTaxDeduction}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Provident Fund:</strong></p>
            <p className="text-gray-700 text-center">₹{data.pfDeduction}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Gratuity Deductions:</strong></p>
            <p className="text-gray-700 text-center">₹{data.gratuityDeduction || 0}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Professional Tax:</strong></p>
            <p className="text-gray-700 text-center">₹{data.professionalTax || 0}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Advance Pay:</strong></p>
            <p className="text-gray-700 text-center">₹{data.advancePay || 0}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Total Deduction:</strong></p>
            <p className="text-gray-700 text-center">₹{data.totalDeduction || 0}</p>
          </div>
        </div>
      </div>

      {/* Net Salary Section */}
      <div className="p-4 border-t border-gray-300">
        <p className="text-lg font-semibold text-gray-800">
          <strong>Net Salary:</strong> ₹{data.totalNetPay}
        </p>
        <div className="mt-4 text-gray-700">
          <strong>Net Salary in Words:</strong> {data.netPayAmountInWords} only
        </div>
      </div>
    </div>
  );
};

export default PaySlip;
