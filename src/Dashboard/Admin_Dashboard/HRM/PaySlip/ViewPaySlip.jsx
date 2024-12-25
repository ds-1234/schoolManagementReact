import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../conf/conf";
import { toast } from "react-toastify";
import edit from '../../../../assets/edit.png'
import Table from "../../../../Reusable_components/Table";
import AddBtn from "../../../../Reusable_components/AddBtn";


const ViewPaySlip = () => {
  const [paySlip, setPaySlip] = useState([]);

  const navigate = useNavigate()


const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1,
      sortable: false,
    },

    {
      name: 'Pay Period',
      selector: row => row.payPeriod ,
      sortable: true,
    },
    {
      name: 'Employee Name',
      selector: row => row.empName ,
      sortable: true,
    },
    {
      name: 'School Name',
      selector: row => row.schoolName ,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department ,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation ,
      sortable: true,
    },
    {
      name: 'Gross Salary',
      selector: row => row.grossSalary ,
      sortable: true,
    },
    {
      name: 'Total Deduction',
      selector: row => row.totalDeduction ,
      sortable: true,
    },
    {
      name: 'Net Pay',
      selector: row => row.totalNetPay ,
      sortable: true,
    },
    // {
    //   name: 'Action',
    //   cell: row => (
    //         <button
    //         onClick={() => handleClick(row.teacherId)}
    //         >
    //             <img src={edit} alt="View" className='h-8' />
    //         </button>

  
    //   ),
    // },
  ]
  const handleAddClick = () => {
    navigate('/admin/PaySlip')
  }

  const fetchpayslip = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/hrm/getPaySlipList`);
      const payslip = response.data.data || [];

      setPaySlip(payslip);
      
    } catch (error) {
      toast.error("Error fetching Staff applications");
    }
  };
  useEffect(() => {
    fetchpayslip();
  }, []);


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
        data={paySlip}
        // search = {false}
        />
    </div>
  );
};

export default ViewPaySlip;
;
