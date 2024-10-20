import React from "react";
import { useStepContext } from "../../../../hooks/StepContext";

const ProgressIndicator = () => {
  const { currentStep } = useStepContext();
  const steps = [
    { id: 1, label: "Basic Details", path: "/admin/basic" },
    { id: 2, label: "Academic Details", path: "/admin/academic" },
    { id: 3, label: "Office Details", path: "/admin/office" },
    { id: 4, label: "Transportation Details", path: "/admin/transportation" },
    { id: 5, label: "Hostel Details", path: "/admin/hostelDetails" },
    { id: 6, label: "Previous School Details", path: "/admin/prevSchool" },
    { id: 7, label: "Documents Required", path: "/admin/uploadDocs" },
  ];

  return (
    <div className="flex justify-start items-center mt-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center transition-all duration-300 px-4 py-2
            ${currentStep === step.id ? 'bg-white text-black rounded-md' : 
            (step.id < currentStep ? 'bg-green-500 text-white  rounded-md' : 
            'bg-gray-300 text-gray-600  rounded-md')}`}
          style={{
            clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)',
          }}
        >
          <div
            className={`w-8 h-8 ml-2 flex justify-center items-center rounded-full border-2 
              ${currentStep === step.id ? 'border-white bg-green-600 text-white' : 
              (step.id < currentStep ? 'border-green-400 bg-green-500 text-white' : 
              'border-gray-400 bg-white text-gray-600')}`}
          >
            {step.id}
          </div>
          {/* Show step label when the current or previous step */}
          {currentStep >= step.id && (
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
