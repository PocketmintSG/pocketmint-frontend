import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/redux/store";

export const ProtectedLayout = () => {
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <nav>
        <Link to="/">Settings</Link>
        <Link to="/">Profile</Link>
      </nav>
      <Outlet />
    </div>
  )
};