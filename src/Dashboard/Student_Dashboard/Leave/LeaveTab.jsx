import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { toast } from "react-toastify";
import AddBtn from "../../../Reusable_components/AddBtn";
import AddLeave from "./AddLeave";
import LeaveCategoryPage from "./LeaveCategoryPage"; // Assuming LeaveCategoryPage displays tables

const LeaveTab = () => {
  const [leaves, setLeaves] = useState([]);
  const [activeTab, setActiveTab] = useState("pending"); // Set initial tab to Pending
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves/getLeavesApplicationList`);
      setLeaves(response.data.data.filter((leave) => leave.senderId === user.id));
    } catch (error) {
      toast.error("Error fetching leave applications");
    }
  };

  const filteredLeaves = leaves.filter((leave) => leave.leaveStatus?.toLowerCase() === activeTab);

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Leave Applications</h1>
      <p className="mt-2">
        <NavLink to="/studentDashboard"> Dashboard </NavLink>/ <span className="text-[#ffae01] font-semibold">Leaves</span>
      </p>

      <AddBtn onAddClick={openAddPopup} />

      {/* Tabs Navigation */}
      <div className="flex space-x-6 mt-8 border-b-2 pb-2">
        {["pending", "approved", "rejected"].map((status) => (
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
        <LeaveCategoryPage leaves={filteredLeaves} activeTab={activeTab} />
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
