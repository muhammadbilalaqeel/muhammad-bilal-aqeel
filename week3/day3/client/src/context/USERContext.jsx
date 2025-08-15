import React, { createContext, useEffect, useState } from "react";

export const userContextValue = createContext();

const USERContext = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  useEffect(() => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [userData]);
  return (
    <userContextValue.Provider value={{ userData, setUserData }}>
      {children}
    </userContextValue.Provider>
  );
};

export default USERContext;
