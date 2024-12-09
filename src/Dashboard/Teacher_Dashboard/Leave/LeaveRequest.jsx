import React , {useState , useEffect} from "react";
import Table from "../../../Reusable_components/Table";
import LeaveCategoryStatusBtn from "../../../Reusable_components/LeaveCategoryStatusBtn";
import axios from "axios";
import BASE_URL from "../../../conf/conf";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import deleteIcon from '../../../assets/delete.png'
import edit from '../../../assets/edit.png';
import EditLeaveRequest from "./EditLeaveRequest";

const LeaveRequest = () => {
  const [leaveTypeMap, setLeaveTypeMap] = useState({});
  const [userMap , setUserMap] = useState({}) 
  const [leaves , setLeaves] = useState([])
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editId , setEditId] = useState(null)
  
  
    const openEditPopup = (id) => {
      setEditId(id);
      setIsEditPopupOpen(true);
    };
  
    const closeEditPopup = () => {
      setEditId(null);
      setIsEditPopupOpen(false);
    };

    useEffect(() => {
      if ( isEditPopupOpen) {
        document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
      } else {
        document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
      }
  
      return () => {
        document.body.style.overflow = 'auto';  // Cleanup on unmount
      };
    }, [ isEditPopupOpen]);

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

  const columns = [
    {
      name: "SR.No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      width: '100px'
    },
    {
      name: "Submitted by",
      selector: (row) => userMap[row.senderId],
      sortable: true,
      width: '120px'
    },
    {
      name: "Leave Type",
      selector: (row) => leaveTypeMap[row.leaveType],
      sortable: true,
    },
    {
      name: "Leave Date",
      selector: (row) => row.leaveStartDate + " - " + row.leaveEndDate,
      sortable: true,
      width: "200px"
    },
    {
      name: "No. of Days",
      selector: (row) => row.leaveDayDuration,
      sortable: true,
    },
    {
      name: "Applied On",
      selector: (row) => row.appliedOn,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <LeaveCategoryStatusBtn status={row.leaveStatus} />,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
        <button
        onClick={() => openEditPopup(row.id)}
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
      ),
    },
  ];

  const fetchLeaves = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/leaves/getLeavesApplicationList`)
      const filteredLeaves = res.data.data.filter(
        (leave) => leave.leaveAuthoriserId === user.id
      );
  
      // Sorting logic
      const sortedLeaves = filteredLeaves.sort((a, b) => {
        const statusOrder = {
          PENDING: 1,
          APPROVED: 2,
          REJECTED: 3,
        };
        return statusOrder[a.leaveStatus] - statusOrder[b.leaveStatus];
      });
  
      setLeaves(sortedLeaves);
    } catch (error) {
      toast.error('Error in fetching requests') ;
    }
  }

  useEffect(() => {
    fetchLeaves()
  } , [])


  return (
    <div className='h-full mb-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Leave Request</h1>
      <p className='mt-2'><NavLink to = '/teacherDashboard'>Dashboard </NavLink>/ <span className='text-[#ffae01] font-semibold'>Leave Request</span> </p>
    
      <Table columns={columns} data={leaves} />

      <EditLeaveRequest 
      isOpen={isEditPopupOpen} 
      onClose={() => {
        closeEditPopup()
        fetchLeaves()
      }}
      leaveId={editId}
      />
    </div>
  );
};

export default LeaveRequest;