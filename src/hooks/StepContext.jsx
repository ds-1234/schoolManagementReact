import React, { createContext, useState, useContext , useEffect } from 'react';

// Create the context
const StepContext = createContext();

// Create a provider component
export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    console.log('Current Step:', currentStep);
  }, [currentStep]);

  return (
    <StepContext.Provider value={{ currentStep, handleNextStep , setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};

// Create a custom hook to use the StepContext
export const useStepContext = () => useContext(StepContext);
