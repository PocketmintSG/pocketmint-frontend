import { setActiveSection, setActiveTab } from "@/redux/navSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "src/components/general/menus/header/Header";
import { NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import {
  NavigationItem,
  NavigationItems,
  Tab,
} from "src/configs/Navigation";
import { RootState } from "src/redux/store";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);
  const navState = useSelector((state: RootState) => state.navSliceReducer)
  const dispatch = useDispatch()

  // TODO: Check if user token is expired. For now, log user out if token is expired.
  const handleTabSwitch = (newTab: Tab) => {
    dispatch(setActiveTab(newTab))
  };
  const handleSectionSwitch = (newSection: NavigationItem) => {
    dispatch(setActiveSection(newSection))
    dispatch(setActiveTab(
      newSection.tabs.length !== 0 ? newSection.tabs[0].tabTitle : "",
    ))
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar
        menuItems={NavigationItems}
        activeSection={navState.activeSection}
        setActiveSection={handleSectionSwitch}
      />
      <div className="flex flex-col h-full w-full">
        <Header
          pageTitle={navState.activeSection.pageLabel}
          activeTab={navState.activeTab}
          setActiveTab={handleTabSwitch}
          tabs={navState.activeSection.tabs}
        />
        <Outlet />
      </div>
    </div>
  );
};
