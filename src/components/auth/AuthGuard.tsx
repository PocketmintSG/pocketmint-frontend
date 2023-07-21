import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "src/components/general/menus/header/Header";
import { NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import {
  NavigationItem,
  NavigationItems,
  TabProps,
} from "src/configs/Navigation";
import { RootState } from "src/redux/store";

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);
  const [activeSection, setActiveSection] = useState<NavigationItem>(
    NavigationItems[0],
  );
  const [activeTab, setActiveTab] = useState<string>(
    activeSection.tabs.length !== 0 ? activeSection.tabs[0].tabTitle : "",
  );
  const handleTabSwitch = (newTab: TabProps) => {
    setActiveTab(newTab.tabTitle);
  };
  const handleSectionSwitch = (newSection: NavigationItem) => {
    setActiveSection(newSection);
    setActiveTab(
      newSection.tabs.length !== 0 ? newSection.tabs[0].tabTitle : "",
    );
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar
        menuItems={NavigationItems}
        activeSection={activeSection}
        setActiveSection={handleSectionSwitch}
      />
      <div className="flex flex-col h-full w-full">
        <Header
          pageTitle={activeSection.pageLabel}
          activeTab={activeTab}
          setActiveTab={handleTabSwitch}
          tabs={activeSection.tabs}
        />
        <Outlet />
      </div>
    </div>
  );
};
