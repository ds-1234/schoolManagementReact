import React from "react";
import Button from "../../../Reusable_components/Button";

function Profile({ name, className, rollNo }) {
  return (
    <div className="w-[400px] bg-blue-700 rounded-lg p-6 text-white shadow-lg">
      {/* Profile Image Placeholder */}
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-base">
            Class: {className} | Roll No: {rollNo}
          </p>
        </div>
      </div>

      {/* Quarterly Status */}
      <div className="border-t-2 border-dotted border-white pt-4 flex justify-between items-center">
        <p className="text-lg font-medium">1st Quarterly</p>
        <span className="bg-green-600 text-sm px-3 py-2 rounded-lg">Pass</span>
        <Button label="Edit Profile"></Button>
      </div>
    </div>
  );
}

export default Profile;
