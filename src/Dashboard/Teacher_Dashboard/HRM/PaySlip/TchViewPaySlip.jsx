import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaySlip from './PaySlip';

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
    <div className="relative p-5">
      {/* Dropdown in the top-right corner */}
      <div className="absolute top-2 left-2">
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

      {/* Display selected period */}
      <div className="mt-16">
        {selectedPeriod && (
          <h3 className="text-lg font-semibold">Selected Period: {selectedPeriod}</h3>
        )}

        {/* Display pay slip details */}
        {paySlipDetails && (
        //   <div className="mt-4 p-4 border border-gray-200 rounded-md shadow-sm">
        //     <pre className="text-sm font-mono">
        //       {JSON.stringify(paySlipDetails, null, 2)}
        //     </pre>
        //   </div>
        <PaySlip data={paySlipDetails.data[0]}/>
        )}
      </div>
    </div>
  );
}

export default TchViewPaySlip;
