import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "src/components/general/menus/header/Header";
import { MenuItem, NavSidebar } from "src/components/general/menus/sidebar/NavSidebar";
import { RootState } from "src/redux/store";

import { AiOutlineStock } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { BsShieldFillCheck } from "react-icons/bs"
import { IoMdSettings } from "react-icons/io"
import { TabProps } from "../general/menus/header/Header";

const menuItems: MenuItem[] = [
  {
    menuTitle: "Dashboard",
    icon: <AiOutlineStock />,
    link: "/dashboard"
  },
  {
    menuTitle: "Expenses",
    icon: <MdAttachMoney />,
    link: "/expenses"
  },
  {
    menuTitle: "Insurance",
    icon: <BsShieldFillCheck />,
    link: "/insurance"
  },
  {
    menuTitle: "Settings",
    icon: <IoMdSettings />,
    link: "/settings"
  }
]

const tabItems: TabProps[] = [
  {
    tabTitle: "test",
    link: "/dashboard",
  }, {
    tabTitle: "test2",
    link: "/dashboard",
    subTabs: [{
      subTabTitle: "test",
      subTabLink: "/dashboard"
    },
    {
      subTabTitle: "test",
      subTabLink: "/dashboard"
    }]
  }]

export const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user)
  const [activeSection, setActiveSection] = useState()

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-row h-full w-full">
      <NavSidebar menuItems={menuItems}  />
      <div className="flex flex-col h-full w-full">
        <Header pageTitle="test" tabs={tabItems} />
        <Outlet />
      </div>
    </div>
  )
};