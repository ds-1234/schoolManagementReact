import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../Reusable_components/Button";
import BASE_URL from "../../../conf/conf";

function EditLeaveRequest({ isOpen, onClose, leaveId }) {
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState("pending");
  const [rejectedReason, setRejectedReason] = useState("");
  const [userDetails , setUserDetails] = useState(null) 
  const [leaveTypeMap , setLeaveTypeMap] = useState({}) 

  useEffect(() => {
    if (isOpen && leaveId) {
      fetchLeaveDetails();
    }
  }, [isOpen, leaveId]);

  const fetchLeaveDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves/getLeavesApplicationById/${leaveId}`);
      setLeaveDetails(response.data.data);  
      setLeaveStatus(response.data.data.leaveStatus?.toLowerCase());
      
      if (response.data.data?.senderId) {
        const userResponse = await axios.get(
          `${BASE_URL}/user/getUser/${response.data.data.senderId}`
        );
        setUserDetails(userResponse.data.data);
      }

    } catch (error) {
      toast.error("Error fetching leave Request details");
    }
  }


  const handleApprovalStatusChange = (status) => {
    setLeaveStatus(status);
    if (status !== "rejected") {
      setRejectedReason("");
    }
  };

  const handleSubmit = async () => {
    if (leaveStatus === "rejected" && !rejectedReason) {
      toast.error("Please provide a reason for rejection.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/leaves/updateLeavesStatus`, {
        id : leaveId,
        leaveStatus : leaveStatus,
        ...(leaveStatus === "rejected" && {leaveRejectionReason : rejectedReason }), 
      }, {
        headers: {
          "Content-Type": "application/json",
        }
    });

      toast.success("Leave request updated successfully");
      onClose();
    } catch (error) {
      toast.error("Error updating leave request");
    }
  };

    // Fetch leave types and authorisers
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

        } , [])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-800">
      <div className="bg-white p-6 py-2 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-[#042954]">
          Approve Request
        </h2>

        {leaveDetails ? (
          <div className="space-y-8">
            {/* Submitted By */}
            <div className="grid grid-cols-2 gap-4 bg-gray-200 p-4 rounded-md">
              <div className="flex flex-col">
                <span className="font-semibold">Submitted By:</span>{" "}
                {userDetails?.firstName + " " + userDetails?.lastName} 
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Roll No/Employee ID:</span>{" "}
                {leaveDetails.rollOrEmployeeId}
              </div >
              <div className="flex flex-col">
                <span className="font-semibold">Leave Type:</span>{" "}
                {leaveTypeMap[leaveDetails.leaveType]}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">No of Days:</span>{" "}
                {leaveDetails.leaveDayDuration}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Applied On:</span>{" "}
                {leaveDetails.appliedOn}
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">Leave:</span>{" "}
                {leaveDetails.leaveStartDate} - 
                {leaveDetails.leaveEndDate}
              </div>
            </div>

            {/* Reason */}
            <div>
              <span className="font-semibold">Reason:</span>{" "}
              <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: leaveDetails.leaveReason }}
              />
            </div>

            {/* Approval Status */}
            <div>
              <span className="font-semibold">Approval Status:</span>
              {leaveDetails.leaveStatus === 'APPROVED' || leaveDetails.leaveStatus === 'REJECTED' ? 
              <div 
              className="border py-1 px-2 bg-gray-50 rounded-md mt-2"
              readOnly >
                {leaveStatus.toUpperCase()}
              </div> 
                : 
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    value="pending"
                    checked={leaveStatus === "pending"}
                    onChange={() => handleApprovalStatusChange("pending")}
                  />
                  Pending
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    value="approved"
                    checked={leaveStatus === "approved"}
                    onChange={() => handleApprovalStatusChange("approved")}
                  />
                  Approved
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leaveStatus"
                    value="rejected"
                    checked={leaveStatus === "rejected"}
                    onChange={() => handleApprovalStatusChange("rejected")}
                  />
                  Rejected
                </label>
              </div>
              }
            </div>

            {/* Rejection Reason */}
            {leaveStatus === "rejected" && (
              <div>
                <label
                  htmlFor="rejectedReason"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Reason for Rejection *
                </label>
                <textarea
                  id="rejectionReason"
                  value={rejectedReason}
                  onChange={(e) => setRejectedReason(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                  placeholder="Enter reason for rejection"
                />
              </div>
            )}

            {/* Submit Button */}
            {leaveDetails.leaveStatus != 'APPROVED' && <div className="mt-4 mb-4">
              <Button
                type="button"
                className="w-full text-center mb-2"
                label={"Submit"}
                onClick={handleSubmit}
              />
            </div>}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default EditLeaveRequest;
