import React from "react";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const links = [
    { name: "Time Table", color: "bg-green-100", icon: "fas fa-calendar-check text-green-500" , link: '/admin/home' },
    { name: "Exam Result", color: "bg-blue-100", icon: "fas fa-file-alt text-blue-500" , link: '/admin/ExamResults' },
    { name: "Attendance", color: "bg-yellow-100", icon: "fas fa-calendar-alt text-yellow-500" , link:'/admin/select' },
    { name: "Fees", color: "bg-cyan-100", icon: "fas fa-wallet text-cyan-500" , link:'/admin/feesCollect' },
    { name: "Home Works", color: "bg-red-100", icon: "fas fa-book text-red-500" , link: '/admin/homework' },
    { name: "Accounts", color: "bg-teal-100", icon: "fas fa-chart-bar text-teal-500" , link: '/admin/Expenses'},
  ];
  const navigate = useNavigate() 

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-blue-950 mb-4">Quick Links</h2>
      <div className="grid grid-cols-3 gap-4">
        {links.map((link, index) => (
          <div
            key={index}
            className={`${link.color} p-4 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer`}
            onClick={() => navigate(link.link)}
          >
            <i className={`${link.icon} text-xl mb-2`}></i>
            <p className="text-medium font-semibold text-center">{link.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
