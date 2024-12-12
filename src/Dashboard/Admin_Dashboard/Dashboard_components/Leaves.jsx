import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import Button from "../../../Reusable_components/Button";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../../../assets/Icons/NotificationIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [userMap , setUserMap] = useState({}) 
  const [leaveTypeMap, setLeaveTypeMap] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/leaves/getLeavesApplicationList`
        );
        // Filter to only include pending requests and limit to 3 requests
        const pendingRequests = response.data.data
          .filter((leave) => leave.leaveStatus === "PENDING")
          .slice(0, 3); // Limit to max 3
        setLeaveRequests(pendingRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    // Fetch leave types
    axios.get(`${BASE_URL}/leaves/getLeavesList`)
      .then((response) => {
        const leaveTypes = response.data.data || [];
        const mapping = {};
        leaveTypes?.forEach((type) => {
          mapping[type.id] = type.leaveType;
        });
        console.log(mapping);
        
        setLeaveTypeMap(mapping);
      })
      .catch((error) => {
        console.error("Error fetching leave types:", error);
      });

      axios.get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        const users = response.data.data || [];
        const mapping = {};
        users?.forEach((type) => {
          mapping[type.id] = type.firstName + " " + type.lastName;
        });
        console.log(mapping);
        
        setUserMap(mapping);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
} , [])

const handleSubmit = async(id , value) => {
  await axios({
    method: 'POST' , 
    url: `${BASE_URL}/leaves/updateLeavesStatus` ,
    data: {
      id: id,
      leaveStatus: value 
    },
    headers: {'Content-Type' : 'application/json'}
  }).then((response) => {
    toast.success("Leave Request Updated Successfully !")
  }).catch((err) => {
    toast.error("Error in Leave Request") 
  })
}


  return (
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <NotificationIcon
        notificationCount={leaveRequests.length}
      />
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-blue-950">Leave Requests</h2>
        <Button label="View More" onClick={() => navigate('/admin/leaveRequest')}/>
      </div>

      <div className="flex flex-col gap-4">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave) => (
            <div
              key={leave.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col gap-2"
            >
              <div className="flex items-center justify-between ">
                <div>
                  <div className="flex items-center flex-col gap-2">
                    <h3 className="text-md font-bold text-blue-950">{userMap[leave.senderId]}</h3>
                    <span className="bg-red-200 text-red-700 px-2 py-1 rounded-md text-xs">
                      {leaveTypeMap[leave.leaveType]}
                    </span>
                  </div>
                </div>

              <div className="flex gap-5">
                <button
                  className="text-green-500 text-2xl"
                  onClick={() => handleSubmit(leave.id , "APPROVED")}
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </button>
                <button
                  className="text-red-500 text-2xl "
                  onClick={() => handleSubmit(leave.id , "REJECTED")}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
              </div>
              

              <div className="border-t-1"></div>
              <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-700 flex flex-col">
                    Leave: <span className="font-semibold">{leave.leaveStartDate} -</span>
                    <span className="font-semibold">{leave.leaveEndDate}</span>
                  </p>
                  <p className="text-sm text-gray-700 flex flex-col">
                    Applied on: <span className="font-semibold">{leave.appliedOn}</span>
                  </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No pending leave requests.</p>
        )}
      </div>
    </div>
  );
};

export default Leaves;
