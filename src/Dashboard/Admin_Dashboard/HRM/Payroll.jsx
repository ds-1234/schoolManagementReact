import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { toast } from "react-toastify";
import edit from '../../../assets/edit.png'
import Table from "../../../Reusable_components/Table";


const Payroll = () => {
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING"); 
  const navigate = useNavigate()

 // Fetch staff data
 const fetchStaff = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacherInfo/getTeacherInfoList`);
      const staffList = response.data.data || [];
      const updatedStaff = await Promise.all(
        staffList.map(async (staff) => {
          try {
            const staffResponse = await axios.get(
              `${BASE_URL}/user/getUser/${staff.teacherId}`
            );
            return { ...staff, details: staffResponse.data.data };
          } catch (error) {
            toast.error(`Error fetching details for teacherId: ${staff.teacherId}`);
            return staff; 
          }          
        })
      );
      setStaff(updatedStaff);
      
    } catch (error) {
      toast.error("Error fetching Staff applications");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Filter staff based on activeTab
  const filteredStaff =
    activeTab === "PENDING"
      ? staff.filter((s) => !s.epfNumber && !s.employeeNumber)
      : staff.filter((s) => s.epfNumber && s.employeeNumber);      

const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1,
      sortable: false,
    },
    ...(activeTab === "SUBMITTED"
      ? [
          {
            name: 'Employee No.',
            selector: row => row.employeeNumber,
            sortable: true,
          },
        ]
      : []) ,
    {
      name: 'Name',
      selector: row => row.details.firstName + " " +  row.details.lastName ,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        (activeTab === "PENDING" ? 
            <button
            onClick={() => handleClick(row.teacherId)}
            >
                <img src={edit} alt="Edit" className='h-8' />
            </button>

            :
            <button
            onClick={() => handleClick(row.teacherId)}
            >
                <img src={edit} alt="View" className='h-8' />
            </button>
        )
  
      ),
    },
  ]

  const handleClick = (id) => {
    if(activeTab === 'PENDING'){
        navigate('/admin/hrm/payroll/form' ,  { state: { teacherId: id } }) ;
    }else{
        navigate('/admin/TchDetails' ,  { state: {userId : id } }) ;
    }
  }

  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">HRM Applications</h1>
      <p className="mt-2">
        <NavLink to="/admin"> Dashboard  </NavLink>/
        <NavLink to="/admin/hrm"> HRM </NavLink>/
         <span className="text-[#ffae01] font-semibold">Payroll</span>
      </p>

      {/* Tabs Navigation */}
      <div className="flex space-x-6 mt-8 border-b-2 pb-2">
        {["PENDING", "SUBMITTED"].map((status) => (
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

        <Table 
        columns={column}
        data={filteredStaff}/>
    </div>
  );
};

export default Payroll;
