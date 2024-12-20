import React, { useState } from 'react';
import PaySummarySection from './PaySummarySection';
import IncomeDetailsSection from './IncomeDetailsSection';

const PaySlip = () => {
    const [payload, setPayload] = useState({});
    const [reset, setReset] = useState(false);  // State for reset functionality


    console.log("Received Payload: ", payload);
    const updatePayload = (newPayload) => {
        setPayload(newPayload);
    };
    const handleReset = () => {
        setPayload({});
        setReset(true);  // Indicate reset happened
    };
  return (
    <div >
      {/* <h1>Pay Slip</h1> */}
      {/* Employee Pay Summary Section */}
      <PaySummarySection />
      
      {/* Income Details Section */}
      <IncomeDetailsSection onPayloadUpdate={updatePayload} />
      <button onClick={handleReset}>Reset</button>
{console.log(payload,'payload')}
      
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
