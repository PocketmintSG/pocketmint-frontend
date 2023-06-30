import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./api/auth";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
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