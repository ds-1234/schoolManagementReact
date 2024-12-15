import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import BASE_URL from "../../../conf/conf";
import Button from "../../../Reusable_components/Button";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Students");
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const [stdResponse, staffResponse, statusResponse] = await Promise.all([
          axios.get(`${BASE_URL}/attendance/getAttendanceList`),
          axios.get(`${BASE_URL}/attendance/getStaffAttendance`),
          axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`),
        ]);

        setAttendanceData(stdResponse.data.data);
        setStaffAttendance(staffResponse.data.data);

        // Generate statusMap
        const statusMapGenerated = {};
        statusResponse.data.data.forEach((status) => {
          statusMapGenerated[status.id] = status.attendanceStatus;
        });

        setStatusMap(statusMapGenerated);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  // Filter data based on the selected filter
  const applyFilter = (data) => {
    const today = new Date();
    return data.filter((entry) => {
      const attendanceDate = new Date(entry.attendanceDate);
      switch (selectedFilter) {
        case "Today" :  return attendanceDate.toDateString() === today.toDateString();
        case "Yesterday":
          return (
            attendanceDate.toDateString() ===
            new Date(today.setDate(today.getDate() - 1)).toDateString()
          );
        case "Last 7 days":
          const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        return attendanceDate >= sevenDaysAgo && attendanceDate <= today;
        case "This Month":
          return (
            attendanceDate.getMonth() === today.getMonth() &&
            attendanceDate.getFullYear() === today.getFullYear()
          );
        case "This Year":
          return attendanceDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  };

  // Filter attendance data based on the selected tab
  const filterDataByCategory = () => {
    const data = selectedTab === "Students" ? attendanceData : staffAttendance;
    return applyFilter(data);
  };

  // Process attendance data to calculate status counts
  const processAttendanceData = (filteredData) => {
    const statusCounts = {
      present: 0,
      absent: 0,
      "half day": 0,
      medical: 0,
      other: 0,
    };

    filteredData.forEach((entry) => {
      if (selectedTab === "Students" && Array.isArray(entry.attendanceStatusList)) {
        entry.attendanceStatusList.forEach((statusItem) => {
          const statusId = statusItem.attendanceStatusId;
          const status = statusMap[statusId]?.toLowerCase() || "other";

          if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
          } else {
            statusCounts.other++;
          }
        });
      } else if (selectedTab === "Staff") {
        const status = entry.attendanceStatus.toLowerCase();
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        } else {
          statusCounts.other++;
        }
      }
    });

    return statusCounts;
  };

  // Generate data for the pie chart
  const generateChartData = () => {
    const filteredData = filterDataByCategory();
    const statusCounts = processAttendanceData(filteredData);

    return {
      labels: ["Present", "Absent", "Half Day", "Medical", "Other"],
      datasets: [
        {
          label: "Attendance Status",
          data: [
            statusCounts.present,
            statusCounts.absent,
            statusCounts["half day"],
            statusCounts.medical,
            statusCounts.other,
          ],
          backgroundColor: ["#87f542", "#f22424", "#FFCE56", "#36A2EB", "#A9A9A9"],
          hoverBackgroundColor: ["#87f542", "#f22424", "#FFCE56", "#36A2EB", "#A9A9A9"],
        },
      ],
    };
  };

  return (
    <div className="mt-5 rounded-md p-5 bg-white">
      <div className="flex justify-between items-center">
      <h1 className="text-lg text-blue-950 font-bold mb-4">Attendance</h1>

  {/* Date Filter */}
  <div className="mb-4">
    <select
      className="border rounded px-4 py-2"
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
    >
      <option value="Today">Today</option>
      <option value="Yesterday">Yesterday</option>
      <option value="Last 7 days">Last 7 days</option>
      <option value="This Month">This Month</option>
      <option value="This Year">This Year</option>
    </select>
</div>
      </div>

      {/* Tabs for Students and Staff */}
      <div className="flex space-x-4 border-b mb-10 mt-6">
        {["Students", "Staff"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-4 border-b-2 ${
              selectedTab === tab ? "border-blue-500 text-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>


      {/* Pie Chart Section */}
      <div className="mt-6 mb-6 flex justify-center border-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6 mb-6">
            <Pie
              data={generateChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Overall Attendance Status - ${selectedTab}`,
                  },
                },
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-10">
        <Button label="View More" onClick={() => navigate("/admin/select")} />
      </div>
    </div>
  );
}

export default Attendance;
