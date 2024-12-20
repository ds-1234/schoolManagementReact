import React, { useEffect, useState } from 'react';
import PaySummarySection from './PaySummarySection';
import IncomeDetailsSection from './IncomeDetailsSection';
import axios from 'axios';
import BASE_URL from "../../../../conf/conf";


const PaySlip = () => {

  const [incomePayload, setIncomePayload] = useState({});
  const [summaryPayload, setSummaryPayload] = useState({});
  const [user, setUser] = useState({});
  const [reset, setReset] = useState(false); // State for reset functionality
  const [teacherInfo, setTeacherInfo] = useState({}); // Holds teacher details

  const fetchDataAndFilterById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfoList`);

      if (response.data.success) {
        const data = response.data.data;
        console.log(data, 'Fetched Data');

        // Filter the data for the specific ID
        const filteredData = data.find((item) => item.teacherId == user);
        setTeacherInfo(filteredData || {}); // Set filtered data or empty object
        console.log(filteredData, 'Filtered Data');
      } else {
        console.error(`Failed to fetch data`);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  const updatePayload = (newPayload) => {
    setIncomePayload(newPayload);
    console.log(incomePayload,'incomePayload')

  };
  const updatePayloadsumm = (Payload) => {
    setSummaryPayload(Payload);
    setUser(Payload.userTableId)
    console.log(summaryPayload,'summarypayload')
  };

  useEffect(() => {
    console.log('Payload in PaySlip:', incomePayload);
    console.log(summaryPayload,'summarypayload')
    setUser(summaryPayload.userTableId)


  }, [incomePayload,summaryPayload]);
  


  const handleReset = () => {
    setPayload({});
    setReset(true); // Indicate reset happened
  };

  useEffect(() => {
    fetchDataAndFilterById();
    setUser(summaryPayload.userTableId)
    console.log(summaryPayload, 'summaryPayloadin dfvdilbu')
    console.log(user, 'user dfvdilbu')

    console.log(teacherInfo, 'teacherinfo')
  }, [summaryPayload]);

  return (
    <div className=" p-6 bg-white rounded-lg shadow-lg">
      {/* Employee Pay Summary Section */}
      <PaySummarySection onPayloadUpdate={updatePayloadsumm}/>

      {/* Income Details Section */}
      <IncomeDetailsSection onPayloadUpdate={updatePayload} />
{    console.log(incomePayload,'incomePayload')
}
{    console.log(summaryPayload,'summarypayload')
}
      {/* Bank Details Fields */}
      <div style={{ marginTop: '20px' }}>
        <h2>Bank Details</h2>
        <div className="flex items-center gap-4 mb-4">
          <label className="w-1/3 font-medium">Account Number</label>
          <input
            type="text"
            readOnly
            value={teacherInfo.accountNumber || ''}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-1/3 font-medium">Bank Name</label>
          <input
            type="text"
            readOnly
            value={teacherInfo.bankName || ''}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-1/3 font-medium">Branch Name</label>
          <input
            type="text"
            readOnly
            value={teacherInfo.branchName || ''}
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="w-1/3 font-medium">Employer Signature</label>
          <input
            type="text"
            className="py-2 px-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-2/3"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button onClick={handleReset} className="mt-4 text-white bg-blue-500 px-4 py-2 rounded">
        Reset
      </button>
    </div>
  );
};

export default PaySlip;
