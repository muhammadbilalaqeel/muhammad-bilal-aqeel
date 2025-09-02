"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
 setIsAuthenticated: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user and token on mount
useEffect(() => {
  const userDataStr = localStorage.getItem("userData");
  const token = localStorage.getItem("token");

  if (userDataStr && token) {
    setCurrentUser(JSON.parse(userDataStr) as User);
    setIsAuthenticated(true);
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "userData" || event.key === "token") {
      const updatedUserStr = localStorage.getItem("userData");
      const updatedToken = localStorage.getItem("token");
      setCurrentUser(updatedUserStr ? JSON.parse(updatedUserStr) as User : null);
      setIsAuthenticated(!!updatedUserStr && !!updatedToken);
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isAuthenticated,setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
