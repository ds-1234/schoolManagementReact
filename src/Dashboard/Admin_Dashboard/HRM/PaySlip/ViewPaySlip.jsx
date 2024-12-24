import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import BASE_URL from "../../../../conf/conf";
import { toast } from "react-toastify";
import edit from '../../../../assets/edit.png'
import Table from "../../../../Reusable_components/Table";
import AddBtn from "../../../../Reusable_components/AddBtn";


const ViewPaySlip = () => {
  const [staff, setStaff] = useState([]);

  const navigate = useNavigate()


const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1,
      sortable: false,
    },
    // ...(activeTab === "SUBMITTED"
    //   ? [
    //       {
    //         name: 'Employee No.',
    //         selector: row => row.employeeNumber,
    //         sortable: true,
    //       },
    //     ]
    //   : []) ,
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
  const handleAddClick = () => {
    navigate('/admin/PaySlip')
  }



  return (
    <div className="h-full mb-10">
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Pay Slip</h1>
      <p className="mt-2">
        <NavLink to="/admin"> Dashboard  </NavLink>/
        <NavLink to="/admin/hrm"> HRM </NavLink>/
         <span className="text-[#ffae01] font-semibold">Pay_Slip</span>
      </p>
      <AddBtn onAddClick={handleAddClick}/>




        <Table 
        columns={column}
        data={staff}
        // search = {false}
        />
    </div>
  );
};

export default ViewPaySlip;
;
