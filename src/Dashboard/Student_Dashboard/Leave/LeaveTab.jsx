import React, { useEffect, useState } from "react";
import { useNavigate  , NavLink} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { toast } from "react-toastify";
import AddBtn from "../../../Reusable_components/AddBtn";
import AddLeave from "./AddLeave";

const LeaveTabs = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse( sessionStorage.getItem('user') )
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  
    
    const openAddPopup = () => setIsAddPopupOpen(true);
    const closeAddPopup = () => setIsAddPopupOpen(false);
  
    // const openEditPopup = (id) => {
    //   setIsEditPopupOpen(true);
    // };
  
    // const closeEditPopup = () => {
    //   setIsEditPopupOpen(false);
    // };

    useEffect(() => {
      if (isAddPopupOpen ) {
        document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
      } else {
        document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
      }
  
      return () => {
        document.body.style.overflow = 'auto';  // Cleanup on unmount
      };
    }, [isAddPopupOpen]);
  

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

  const handleNavigation = (status) => {
    navigate(`/studentDashboard/leaves/${status.toLowerCase()}`, { state: { leaves } });
  };

  return (
    <div className=' h-full mb-10'>

    <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Leave Applications</h1>
    <p className='mt-2'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Leaves</span> </p>
    
    <AddBtn onAddClick={openAddPopup}/>

    <div className="grid grid-cols-3 gap-6 text-white mt-20">
        {/* Pending */}
        <div
          className="bg-yellow-500 p-4 py-20 rounded-lg cursor-pointer text-center hover:bg-yellow-400"
          onClick={() => handleNavigation("PENDING")}
        >
          <h3 className="text-xl font-semibold">Pending</h3>
          <p>{leaves.filter((leave) => leave.leaveStatus === "PENDING").length} Leaves</p>
        </div>

        {/* Approved */}
        <div
          className="bg-green-500 p-4 py-20  rounded-lg cursor-pointer text-center hover:bg-green-400"
          onClick={() => handleNavigation("APPROVED")}
        >
          <h3 className="text-xl font-semibold">Approved</h3>
          <p>{leaves.filter((leave) => leave.leaveStatus === "APPROVED").length} Leaves</p>
        </div>

        {/* Rejected */}
        <div
          className="bg-red-500 p-4 py-20  rounded-lg cursor-pointer text-center hover:bg-red-400"
          onClick={() => handleNavigation("REJECTED")}
        >
          <h3 className="text-xl font-semibold">Rejected</h3>
          <p>{leaves.filter((leave) => leave.leaveStatus === "REJECTED").length} Leaves</p>
        </div>

        <AddLeave 
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup()
          fetchLeaves()
        }} />
      </div>
    </div>
  );
};

export default LeaveTabs;
