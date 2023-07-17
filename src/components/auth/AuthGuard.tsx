import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "src/components/general/menus/header/Header";
import { NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import { NavigationItems } from "src/configs/Navigation";
import { RootState } from "src/redux/store";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)
  const [activeSection, setActiveSection] = useState<string>(NavigationItems[0].menuLabel)

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar menuItems={NavigationItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-col h-full w-full">
        <Header pageTitle="test" tabs={NavigationItems.find(item => item.menuLabel === activeSection)?.tabs ?? []} />
        <Outlet />
      </div>
    </div>
  )
};