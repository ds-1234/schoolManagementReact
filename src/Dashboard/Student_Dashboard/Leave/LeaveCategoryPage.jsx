import React , {useState , useEffect} from "react";
import { useLocation , NavLink } from "react-router-dom";
import Table from "../../../Reusable_components/Table";
import BASE_URL from "../../../conf/conf.js";
import axios from "axios";
import LeaveCategoryStatusBtn from "../../../Reusable_components/LeaveCategoryStatusBtn.jsx";
import edit from '../../../assets/edit.png'
import deleteIcon from '../../../assets/delete.png'

const LeaveCategoryPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { leaves } = state || {};


  // Get current leave status from URL
  const leaveStatus = location.pathname.split("/").pop().toUpperCase();
  const filteredLeaves = (leaves || []).filter((leave) => leave.leaveStatus === leaveStatus);

  const [leaveTypeMap, setLeaveTypeMap] = useState({});
  const [authoriserMap, setAuthoriserMap] = useState({});

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

    // Fetch authorisers
    axios.get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        const users = response.data.data || [];
        const mapping = {};
        users?.forEach((user) => {
          mapping[user.id] = user.firstName + " " + user.lastName;
        });
        console.log(mapping);
        
        setAuthoriserMap(mapping);
      })
      .catch((error) => {
        console.error("Error fetching authorisers:", error);
      });
  }, []);


  const columns = [
    {
      name: "SR.No",
      selector: (row , idx) => idx+1,
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => leaveTypeMap[row.leaveType],
      sortable: true,
    },
    {
      name: "Leave Date",
      selector: (row) => row.leaveStartDate,
      sortable: true,
    },
    {
      name: "No. of Days",
      selector: (row) => row.leaveDayDuration,
      sortable: true
    },
    {
      name: "Applied On",
      selector: (row) => row.appliedOn,
      sortable: true
    },
    {
      name: "Authority",
      selector: (row) => authoriserMap[row.leaveAuthoriserId],
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (<LeaveCategoryStatusBtn status={row.leaveStatus}/>),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button
          // onClick={() => openEditPopup(row.id)}
        >
          <img src={edit} alt="Edit" className='h-8' />
        </button>
  
        <button>
          <img src={deleteIcon} alt="Delete" className='h-8' />
        </button>
        </div>
      ),
    }
  ];

  // Define search options (if needed for filtering)
  const searchOptions = [
    { label: "Leave type", value: "leaveType" },
    { label: "Status", value: "leaveStatus" },
    { label: "Start Date", value: "leaveStartDate" },
    { label: "End Date", value: "leaveEndDate" },
  ];

  const handleSearch = (query, filters) => {
    // Implement custom filtering logic here if needed
    console.log("Search query:", query, "Filters:", filters);
  };

  const handleClear = () => {
    console.log("Clear filters triggered");
  };

  const status = leaveStatus.charAt(0).toUpperCase() + leaveStatus.slice(1).toLowerCase() + " Leaves" ;
  return (
    <div className=' h-full mb-10'>  
      <h2 className="text-lg md:text-2xl pt-8 font-semibold text-black">{status}</h2>

      <p className='mt-2 mb-10'>Dashboard /<NavLink to = '/studentDashboard'> Student </NavLink>/<NavLink to = '/studentDashboard/leaves'> Leave Tab </NavLink>/ <span className='text-[#ffae01] font-semibold'>{status}</span> </p>
 
        <Table
          columns={columns}
          data={filteredLeaves}
          searchOptions={searchOptions}
          onSearch={handleSearch}
          handleClear={handleClear}
        />
      
    </div>
  );
};

export default LeaveCategoryPage;
