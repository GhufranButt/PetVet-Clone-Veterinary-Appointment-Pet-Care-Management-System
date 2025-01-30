import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";

const PublicRoutes = () => {
  const storedisLoggedIn = localStorage.getItem("isLoggedIn");

  if (!storedisLoggedIn) {
    return <Outlet />;
  }

  if (storedisLoggedIn) {
    return <Navigate to="/HomePage" />;
  }

  return <Navigate to="/login" />;
};

export default PublicRoutes;
