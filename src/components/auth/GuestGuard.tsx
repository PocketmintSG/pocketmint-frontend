import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

export const GuestGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
