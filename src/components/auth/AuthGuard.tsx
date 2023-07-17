import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "src/components/general/menus/header/Header";
import { NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import { RootState } from "src/redux/store";
import { HeaderNavigationItems, SidebarNavigationItems } from "src/configs/Navigation";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)
  const [activeSection, setActiveSection] = useState()

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar menuItems={SidebarNavigationItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-col h-full w-full">
        <Header pageTitle="test" tabs={HeaderNavigationItems} />
        <Outlet />
      </div>
    </div>
  )
};