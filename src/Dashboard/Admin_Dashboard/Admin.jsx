import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../conf/conf";
import guestImg from '../../assets/Icons/guest.png'
import adminImg from '../../assets/Icons/user-gear.png'
import parentImg from '../../assets/Icons/family.png'
import stdImg from '../../assets/Icons/graduates.png'
import tchImg from '../../assets/Icons/teacher.png'
import Attendance from "./Dashboard_components/Attendance";
import Events from "./Dashboard_components/Events";
import QuickLinks from "./Dashboard_components/QuickLinks";
import Leaves from "./Dashboard_components/Leaves";
import FeesCollection from "./Dashboard_components/FeesCollection";
import Notice from "./Dashboard_components/Notice";
import StatCard from "./Dashboard_components/StatCard";
import ChartCard from "./Dashboard_components/ChartCard";

function Admin() {
  const [tileData, setTileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'))

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/adminDashboard/getCount`
        );
        setTileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


   // Map images to user types
   const userTypeImages = {
    Guest: guestImg,
    Parents: parentImg,
    Teacher: tchImg,
    Admin: adminImg,
    Student: stdImg,
  };

  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings",
        data: [54000, 58000, 60000, 63000, 65000, 64522],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const expensesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Expenses",
        data: [50000, 52000, 53000, 55000, 58000, 60522],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Render Tiles
  const renderTiles = () => {
    if (!tileData) return <p>No data available</p>;

    return Object.entries(tileData.data).map(([key, value]) => (
      <div
        key={key}
        className="p-4 py-4 rounded-lg bg-white flex flex-col justify-start shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-200 "
      >
        <h1 className="text-lg font-bold text-blue-950 mb-2">{key}</h1>
        <div className="flex items-center gap-2">
          {/* Image */}
        <img
          src={userTypeImages[key]}
          alt={key}
          className="w-16 h-14 mb-4"
        />

        <div className="flex flex-col">
            {/* User Type */}
            <h3 className="text-medium text-blue-950">Total</h3>

            {/* Total Count */}
            <p className="text-lg font-bold text-blue-950">{value.totalCount}</p>
        </div>
        </div>

        

        {/* Active/Inactive Counts */}
        <div className="flex justify-between w-full mt-2 border-t-2 border-gray-200 sm:text-xs text-sm">
          <p className=" text-green-600 pt-2 ">Active: {value.activeCount}</p>
          <p className=" text-red-600 pt-2">Inactive: {value.inactiveCount}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Admin Dashboard</h1>
       <p className=' mt-2'><span className='text-[#ffae01] font-semibold'>Dashboard</span></p>

      {/* Welcome Section */}
      <div className="bg-[#ffae01] text-white px-6 py-4 rounded-md mb-6 mt-6">
        <div className="flex flex-col md:flex-row md:justify-between  gap-4">
          <div className="flex flex-col">
          <h2 className="text-xl font-bold">Welcome Back , {user.gender === 'Female' ? 'Ms.' : 'Mr.'} {user.firstName} </h2>
          <p>Have a Good day at work</p>
          </div>
          {/* <p>Updated Recently on {tileData?.timestamp}</p> */}
        </div>
      </div>

      {/* Tiles Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? <p>Loading...</p> : renderTiles()}
      </div>


      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        {/*Event Schedule Section*/ }
        <div className="md:w-1/2 w-full">
          <Events userTypeImages={userTypeImages} />
        </div>

        {/* Attendance View */}
        <div className="md:w-1/2 w-full">
          <Attendance />
        </div>

       
      </div>

      <div className="flex mt-5 gap-4 flex-wrap md:flex-nowrap">
        {/* Fees Collection */}
        <div className="md:w-1/2 w-full">
          <FeesCollection/>
        </div>
        <div className="md:w-1/2 w-full">
          <Notice/>
        </div>
      </div>


      {/* Financial Overview */}
      <div className="flex gap-5 flex-wrap lg:flex-nowrap mt-10">
        <div className="flex flex-col gap-2 lg:w-1/2 md:w-2/3 w-full">
          {/* Earnings Card */}
        <ChartCard
          title="Total Earnings"
          amount="₹64,522.24"
          color="text-blue-500"
          chartData={earningsData}
        />

        {/* Expenses Card */}
        <ChartCard
          title="Total Expenses"
          amount="₹60,522.24"
          color="text-red-500"
          chartData={expensesData}
        />
        </div>


        <div className="flex flex-col gap-4 md:w-1/4 w-full"> 
          <StatCard title="Total Earnings" value="$64,522.24" percentage="1.2" isPositive={true} />
          <StatCard title="Total Expenses" value="$60,522.24" percentage="1.2" isPositive={false} />
          <StatCard title="Total Fees Collected" value="$25,000.02" percentage="1.2" isPositive={true} />
          <StatCard title="Fine Collected Till Date" value="$4,56.64" percentage="1.2" isPositive={false} />
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-auto">
          <QuickLinks/>
          <Leaves/>
        </div>
      </div>
    </div>
  );
}

export default Admin;
