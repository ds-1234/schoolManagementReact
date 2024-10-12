import React from "react";

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { label: "Basic Details", path: "/admin/basic" },
    { label: "Academic Details", path: "/admin/academic" },
    { label: "Office Details", path: "/admin/office" },
    { label: "Transportation Details", path: "/admin/transportation" },
    { label: "Hostel Details", path: "/admin/hostelDetails" },
    { label: "Documents Requried", path: "/admin/uploadDocs" },
    { label: "Previous School Details", path: "/admin/prevSchool" },
  ];

   return (
    <div className="flex justify-start items-center mt-8">
    {steps.map((step, index) => (
      <div
        key={index}
        className={`flex items-center transition-all duration-300 
          ${currentStep === index + 1 ? 'bg-green-500 text-white px-4 py-2 rounded-md' : (index + 1 < currentStep ? 'bg-green-300 text-white' : 'bg-gray-300 text-gray-600 px-10 py-2')} `}
        style={{
          clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)',
        }}
      >
        {/* Circle with the index */}
        <div
          className={`w-8 h-8 flex justify-center items-center rounded-full border-2 ${
            currentStep === index + 1 ? 'border-white bg-green-600 text-white' : (index + 1 < currentStep ? 'border-green-400 bg-green-500 text-white' : 'border-gray-400 bg-white text-gray-600')
          }`}
        >
          {index + 1}
        </div>

        {/* Show step label when current step is active */}
        {currentStep === index + 1 && (
          <div className="ml-2 px-3 mr-1 flex items-center">
            <span>{step.label}</span>
          </div>
        )}
      </div>
    ))}
  </div>
  );
};

export default ProgressIndicator;
