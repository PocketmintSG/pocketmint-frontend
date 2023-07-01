import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/redux/store";

export const ProtectedLayout = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)

  if (!user.email) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
};