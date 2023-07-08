import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/redux/store";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
};