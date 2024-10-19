import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [id , setId] = useState(null) ;

  return (
    <UserContext.Provider value={{ userId, setUserId , id , setId }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUserContext = () => useContext(UserContext);
