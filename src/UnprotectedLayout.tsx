import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./api/auth";

export const UnprotectedLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard/profile" />;
  }

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  )
};