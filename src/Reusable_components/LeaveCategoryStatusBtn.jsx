import React from "react";

const LeaveCategoryStatusBtn = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "APPROVED":
        return {
          textColor: "text-green-500",
          bgColor: "bg-green-500",
          label: "Approved",
        };
      case "PENDING":
        return {
          textColor: "text-yellow-500",
          bgColor: "bg-yellow-500",
          label: "Pending",
        };
      case "REJECTED":
        return {
          textColor: "text-red-500",
          bgColor: "bg-red-500",
          label: "Rejected",
        };
      default:
        return {
          textColor: "text-gray-500",
          bgColor: "bg-gray-500",
          label: "Unknown",
        };
    }
  };

  const { textColor, bgColor, label } = getStatusStyles(status);

  return (
    <button
      className={`flex items-center justify-center px-3 py-1 rounded-full bg-[#f1f0f3] font-semibold ${textColor}`}
      disabled
    >
      <span className={`w-2 h-2 rounded-full ${bgColor} mr-2`}></span>
      {label}
    </button>
  );
};

export default LeaveCategoryStatusBtn;
