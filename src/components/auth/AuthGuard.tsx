import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import { RootState } from "src/redux/store";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar />
      <Outlet />
    </div>
  )
};