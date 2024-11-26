import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../conf/conf";

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/leaves/getLeavesList`);
        setLeaveRequests(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  if (loading) return <p>Loading Leave Requests...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-blue-950 mb-4">Leave Requests</h2>
      <div className="flex flex-col gap-4">
        {leaveRequests.map((leave) => (
          <div
            key={leave.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-md font-bold text-blue-950">{leave.leaveId}</h3>
              <p className="text-sm text-gray-700">{leave.leaveType}</p>
            </div>
            <div className="flex gap-2">
                <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                Approve
                </button>
                <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                Reject
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaves;
