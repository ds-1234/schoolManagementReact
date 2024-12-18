import React from 'react';
import PaySummarySection from './PaySummarySection';
import IncomeDetailsSection from './IncomeDetailsSection';

const PaySlip = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h1>Pay Slip</h1>
      {/* Employee Pay Summary Section */}
      <PaySummarySection />
      
      {/* Income Details Section */}
      <IncomeDetailsSection />
      
      {/* Total Net Payable Section */}
      <div style={{ marginTop: '20px' }}>
        <h2>Total Net Payable</h2>
        {/* Add content for Total Net Payable */}
        <p>The total net payable amount will be displayed here.</p>
      </div>
    </div>
  );
};

export default PaySlip;
