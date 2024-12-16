import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { toast } from "react-toastify";
import AddBtn from "../../../Reusable_components/AddBtn";
import AddLeave from "./AddLeave";
import LeaveCategory from "./LeaveCategory"; // Assuming LeaveCategoryPage displays tables

const LeaveTab = () => {
  const [leaves, setLeaves] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING"); // Set initial tab to Pending
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [leaveCounter, setLeaveCounter] = useState([]);
  const [leaveTypeName, setLeaveTypeName] = useState([]);
  const [loading, setLoading] = useState([]);



  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  useEffect(() => {
    fetchLeaves();
    fetchLeaveCounter();
    fetchLeaveType()
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves/getLeavesApplicationList`);
      setLeaves(response.data.data.filter((leave) => leave.senderId === user.id));
    } catch (error) {
      toast.error("Error fetching leave applications");
    }
  };

  const fetchLeaveCounter = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/hrm/getLeaveCounterDetailsById/${user.id}`);
      const response = {
        "data": [
            {
                "id": 3,
                "leaveTypes": 1,
                "leaveCount": 10,
                "staffId": 1
            },
            {
                "id": 4,
                "leaveTypes": 2,
                "leaveCount": 20,
                "staffId": 1
            },
            {
                "id": 5,
                "leaveTypes": 3,
                "leaveCount": 5,
                "staffId": 1
            }
        ],
    }
      setLeaveCounter(response.data);
    } catch (error) {
      toast.error("Error fetching leave counter details");
    }
  };


  const fetchLeaveType = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves/getLeavesList`); // Replace with your actual API endpoint
      if (response.data && response.data.success) {
        setLeaveTypeName(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching Leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLeaveTypeNameById = (id) => {
    const leave = leaveTypeName.find((lev) => lev.id == id);
    return leave ? `${leave.leaveType}` : 'Leave Type not found';
  };

  const filteredLeaves = leaves.filter((leave) => leave.leaveStatus === activeTab);

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Leave Applications</h1>
      <p className="mt-2">
        <NavLink to="/teacherDashboard">Dashboard </NavLink>/ <span className="text-[#ffae01] font-semibold">Leaves</span>
      </p>

      <AddBtn onAddClick={openAddPopup} />





            {/* Leave Counter */}
            <div className="mt-4 p-4 bg-gray-100 border rounded-md">
        <h2 className="text-lg font-semibold ml-2 text-black">Alloted Leaves</h2>
        <div className="flex flex-wrap mt-2">
          {leaveCounter.map((leave) => (
            <div
              key={leave.id}
              className="mr-4 mb-2 p-2 "
            >
              <span className="font-semibold text-gray-700">{getLeaveTypeNameById(leave.leaveTypes)}:</span>{" "}
              <span className="text-blue-500">{leave.leaveCount}</span>
            </div>
          ))}
        </div>
      </div>






      {/* Tabs Navigation */}
      <div className="flex space-x-6 mt-8 border-b-2 pb-2">
        {["PENDING", "APPROVED", "REJECTED"].map((status) => (
          <button
            key={status}
            className={`pb-2 px-4 ${
              activeTab === status
                ? "text-blue-500 border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="mt-4">
        <LeaveCategory leaves={filteredLeaves} activeTab={activeTab} />
      </div>

      <AddLeave
        isOpen={isAddPopupOpen}
        onClose={() => {
          closeAddPopup();
          fetchLeaves();
        }}
      />
    </div>
  );
};

export default LeaveTab;
