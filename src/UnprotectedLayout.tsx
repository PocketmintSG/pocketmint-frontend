import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./api/dep_auth";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export const UnprotectedLayout = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)

  if (user?.email) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
};