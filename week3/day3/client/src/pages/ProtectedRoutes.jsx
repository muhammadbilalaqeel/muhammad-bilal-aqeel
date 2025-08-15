import React, { useContext } from "react";
import { userContextValue } from "../context/USERContext";
import { Navigate, Outlet, Route } from "react-router-dom";
import Login from "./Login";

const ProtectedRoutes = () => {
  const { userData } = useContext(userContextValue);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return userData || storedUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
