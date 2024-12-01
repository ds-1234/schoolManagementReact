import React , {useState , useEffect} from "react";
import Table from "../../../Reusable_components/Table";
import LeaveCategoryStatusBtn from "../../../Reusable_components/LeaveCategoryStatusBtn";
import axios from "axios";
import BASE_URL from "../../../conf/conf";

const LeaveCategoryPage = ({ leaves, activeTab }) => {
  const [leaveTypeMap, setLeaveTypeMap] = useState({});

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

  const columns = [
    {
      name: "SR.No",
      selector: (row, idx) => idx + 1,
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
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-black">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase()} Leaves
      </h2>
      <Table columns={columns} data={leaves} />
    </div>
  );
};

export default LeaveCategoryPage;