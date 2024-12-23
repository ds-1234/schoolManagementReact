import React, { useState } from 'react';



const PaySlip = ({ data }) => {
    // const earningFieldsList = Array.isArray(data.earningFieldsList) ? data.earningFieldsList : [];
    const earningFieldsList = Array.isArray(data.earningFieldsList)
    ? data.earningFieldsList
    : (typeof data.earningFieldsList === 'string' ? JSON.parse(data.earningFieldsList) : []);
    const deductionFieldsList = Array.isArray(data.deductionFieldsList)
        ? data.deductionFieldsList
        : (typeof data.deductionFieldsList === 'string' ? JSON.parse(data.deductionFieldsList) : []);    
    const paySummaryFieldList = Array.isArray(data.paySummaryFieldList)
        ? data.paySummaryFieldList
        : (typeof data.paySummaryFieldList === 'string' ? JSON.parse(data.paySummaryFieldList) : []);    
  if (!data) {
    return <p className="text-center text-gray-500">No Pay Slip Data Available</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11, so add 1
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {/* Header Section */}
      <div className="text-white text-center font-bold py-3 bg-blue-900 border-b border-gray-300">
        {data.schoolName || 'School Name'}{'   '}{data.schoolCity},{data.schoolAddress},{data.schoolPincode},{data.schoolCountry}
      </div>
      <div className="flex justify-between items-center py-2 px-4 bg-blue-200 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Salary Slip</h2>
        <div className="text-right">
          <p className="text-gray-700 font-semibold">{data.payPeriod}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-300  divide-gray-300">
        {/* Left Column */}
        <div className="space-y-2  divide-gray-300">
        <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Employee Name:</strong></p>
            <p className="text-gray-700 text-center">{data.empName}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Employee ID:</strong></p>
            <p className="text-gray-700 text-center">{data.employeeId}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Date of Joining:</strong></p>
            <p className="text-gray-700 text-center">{formatDate(data.dateOfJoining)}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Department:</strong></p>
            <p className="text-gray-700 text-center">{data.department}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Designation:</strong></p>
            <p className="text-gray-700 text-center">{data.designation}</p>
          </div>
          {Array.isArray(paySummaryFieldList) && paySummaryFieldList.map((earning, index) => (
            <div key={index} className="grid grid-cols-2 p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>{earning.paySummaryFieldName}:</strong></p>
            <p className="text-gray-700 text-center">{earning.paySummaryValue}</p>
            </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="space-y-2  divide-gray-300">

          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Paid Days:</strong></p>
            <p className="text-gray-700 text-center">{data.paidDays}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Lost of Pay Days:</strong></p>
            <p className="text-gray-700 text-center">{data.lossOfPaydays}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Pay Date:</strong></p>
            <p className="text-gray-700 text-center">{formatDate(data.payDate)}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Bank Name:</strong></p>
            <p className="text-gray-700 text-center">{data.bankName}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Account Number:</strong></p>
            <p className="text-gray-700 text-center">{data.accountNumber}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Branch Name:</strong></p>
            <p className="text-gray-700 text-center">{data.branchName}</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700 "><strong>Employer Signature Text:</strong></p>
            <p className="text-gray-700 text-center">{data.employerSignatureText}</p>
          </div>
        </div>
      </div>

      {/* Salary Details Section */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-300 divide-y divide-gray-300">
        {/* Earnings */}
        <div className="space-y-2 divide-y  divide-gray-300">
          <h3 className="text-lg font-semibold mb-2 text-center text-white bg-blue-900 py-2 border-b border-gray-300">Income</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded border-b border-gray-300">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold text-right pr-6">Amount</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Basic Salary:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.basicPayEarning}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>HRA:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.houseRentAllowEarning}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Allowances:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.specialPayAllowance}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Over Time Pay:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.overTimePay}
        </span>
        </p>
          </div>

          {console.log(earningFieldsList,'earningFieldsList')}
          {Array.isArray(earningFieldsList) && earningFieldsList.map((earning, index) => (
            <div key={index} className="grid grid-cols-2 p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>{earning.earningFieldName}:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {earning.earningFieldValue}
        </span>
        </p>
            </div>
            ))}

        </div>

        {/* Deductions */}
        <div className=" space-y-2 divide-y divide-gray-300">
          <h3 className="text-lg font-semibold mb-2 text-center text-white bg-blue-900 py-2 border-b border-gray-300">Deductions</h3>
          <div className="grid grid-cols-2 bg-blue-200 p-2 rounded border-b border-gray-300">
            <p className="font-semibold">Particulars</p>
            <p className="font-semibold text-right pr-6">Amount</p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Tax:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.incomeTaxDeduction}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Provident Fund:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.pfDeduction}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Gratuity Deductions:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.gratuityDeduction}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Professional Tax:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.professionalTax}
        </span>
        </p>
          </div>
          <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">
            <p className="text-gray-700"><strong>Advance Pay:</strong></p>
            <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.advancePay || 0}
        </span>
        </p>
          </div>

          {Array.isArray(deductionFieldsList) && deductionFieldsList.map((deduction, index) => (
            <div key={index} className="grid grid-cols-2 p-2 rounded border-b border-gray-300">
              <p className="text-gray-700"><strong>{deduction.deductionFieldName}:</strong></p>
              <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {deduction.deductionFieldValue}
        </span>
        </p>
            </div>
          ))}

        </div>
      </div>
      <div className="grid grid-cols-2 border-t gap-4   ">
      <div className="  divide-gray-300">
      <div className="grid grid-cols-2 p-2 rounded border-b border-gray-300">
        <p className="text-gray-700"><strong>Gross Income:</strong></p>
        <p className="text-gray-700 text-right pr-6">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.grossSalary}
        </span>
        </p>
        </div>
      </div>
      <div className="  divide-gray-300">
      <div className="grid grid-cols-2  p-2 rounded border-b border-gray-300">

            <p className="text-gray-700"><strong>Total Deduction:</strong></p>
            <p className="text-gray-700 text-right pr-9">
        ₹<span className="inline-block text-right" style={{ minWidth: '6ch' }}>
        {data.totalDeduction}
        </span>
        </p>
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
