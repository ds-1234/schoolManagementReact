import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../../../../conf/conf"; // Assuming this is your base URL
import PaySummarySection from './PaySummarySection';
import IncomeDetailsSection from './IncomeDetailsSection';
import { NavLink } from 'react-router-dom';
import Button from '../../../../Reusable_components/Button';

const PaySlip = () => {
  const [incomePayload, setIncomePayload] = useState({});
  const [summaryPayload, setSummaryPayload] = useState({});
  const [user, setUser] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [employerSignatureText, setEmployerSignatureText] = useState('');


  // Fetch teacher info based on user ID
  const fetchDataAndFilterById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfoList`);
      
      if (response.data.success) {
        const data = response.data.data;
        const filteredData = data.find((item) => item.teacherId == user);
        setTeacherInfo(filteredData || {}); // Set filtered data or empty object
      } else {
        console.error('Failed to fetch teacher data');
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error.message);
    }
  };

  // Combine summary, income, and teacher data before sending
  const combinePayloadAndSend = async () => {
    try {
      // Combine all data into one payload
      const combinedPayload = {
        ...summaryPayload,
        ...incomePayload,
        accountNumber: teacherInfo.accountNumber,
        bankName: teacherInfo.bankName,
        branchName: teacherInfo.branchName,
        employerSignatureText: employerSignatureText
      };

      // Send combined payload to the API
      const response = await axios.post(`${BASE_URL}/hrm/paySlipCreator`, combinedPayload);

      if (response.data.success) {
        console.log('Pay slip created successfully');
        window.location.reload()
      } else {
        console.error('Failed to create pay slip');
      }
    } catch (error) {
      console.error('Error sending pay slip data:', error.message);
    }
  };

  useEffect(() => {
    // Trigger fetch on component mount
    fetchDataAndFilterById();
    setUser(summaryPayload.userTableId)
    console.log(user,'user')
  }, [summaryPayload]);

  // Update payloads from sections
  const updatePayload = (newPayload) => {
    setIncomePayload(newPayload);
  };

  const updatePayloadsumm = (Payload) => {
    setSummaryPayload(Payload);
    setUser(Payload.userTableId)

  };

  useEffect(() => {
    console.log('Payload in PaySlip:', incomePayload);
    console.log(summaryPayload,'summarypayload')
    setUser(summaryPayload.userTableId)


  }, [incomePayload,summaryPayload]);

  const handleEmployerSignatureTextChange = (e) => {
    setEmployerSignatureText(e.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
              <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Pay Slip</h1>
              <p className=' mt-2'><NavLink to = '/admin'> Dashboard  </NavLink>/<NavLink to = '/admin/hrm'> HRM  </NavLink>/ <span className='text-[#ffae01] font-semibold'>Pay Slip</span> </p>
      {/* Employee Pay Summary Section */}
      <PaySummarySection onPayloadUpdate={updatePayloadsumm} />

      {/* Income Details Section */}
      <IncomeDetailsSection onPayloadUpdate={updatePayload} />

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
            // value={teacherInfo.employerSignatureText || ''}
            onChange={handleEmployerSignatureTextChange}  // Updates state when value changes
          />
        </div>
      </div>

{/* Button to generate and send payload */}
<div className="mt-6 flex justify-between w-full">
  {/* Reset Button */}
  <Button
    onClick={() => window.location.reload()}
    className="text-white bg-blue-500 px-4 py-2 rounded"
    label='Reset'
  >
    Reset
  </Button>

  {/* Generate and Send Pay Slip Button */}
  <button
    onClick={combinePayloadAndSend}  // Trigger payload generation and API call
    className="text-white bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
  >
    Generate and Send Pay Slip
  </button>
</div>



    </div>
  );
};

export default PaySlip;
