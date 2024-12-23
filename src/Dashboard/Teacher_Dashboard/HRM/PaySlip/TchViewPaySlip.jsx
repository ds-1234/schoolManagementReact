import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaySlip from './PaySlip';
import { NavLink } from 'react-router-dom';
import { generatePDF } from '../../../../Utils/generatePDF';

function TchViewPaySlip() {
  const [payPeriods, setPayPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [paySlipDetails, setPaySlipDetails] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data


  // Fetch pay slip data
  useEffect(() => {
    axios
      .get(`http://localhost:8080/hrm/getPaySlipListById/${user.id}`)
      .then((response) => {
        if (response.data.success) {
          setPayPeriods(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching pay slip data:', error));
  }, []);

  // Fetch details based on selected pay period
  useEffect(() => {
    if (selectedPeriod) {
        console.log(selectedPeriod,'dgfushie')
      axios
        .post(`http://localhost:8080/hrm/getPaySlipById`,{}, {
          params: {
            staffId: user.id,
            payPeriod: selectedPeriod,
          },
        })
        .then((response) => {
          setPaySlipDetails(response.data);
        })
        .catch((error) => console.error('Error fetching pay slip details:', error));
    }
  }, [selectedPeriod]);

  // Handle dropdown change
  const handleChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="relative p-5 bg-white">
              <h1 className='text-lg md:text-2xl font-semibold text-black mt-5'>View Pay Slip</h1>
              <p className='mt-2'><NavLink to='/teacherDashboard'> Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>View Pay Slip</span></p>
      {/* Dropdown in the top-right corner */}
      <div className=" top-2 left-2 mt-4">
        <select
          value={selectedPeriod}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Pay Period
          </option>
          {payPeriods.map((period) => (
            <option key={period.id} value={period.payPeriod}>
              {period.payPeriod}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {paySlipDetails && (

          <div id="PaySlip">
            <PaySlip data={paySlipDetails.data[0]} />
          </div>
        )}
      </div>
            <button 
                className="button"
                onClick={() => generatePDF("PaySlip", `PaySlip_${selectedPeriod}`)} 
              >
                Download Pay Slip PDF
            </button>

    </div>
  );
}

export default TchViewPaySlip;
