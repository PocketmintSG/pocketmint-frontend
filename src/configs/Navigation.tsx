import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsShieldFillCheck } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

export interface NavigationItem {
  menuLabel: string;
  icon: React.JSX.Element;
  link: string;
  tabs: TabProps[];
}

export interface TabProps {
  tabTitle: string;
  link: string;
  subTabs?: SubTabProps[];
}

interface SubTabProps {
  subTabTitle: string;
  subTabLink: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    menuLabel: "Investments",
    icon: <AiOutlineStock />,
    link: "/dashboard",
    tabs: [
      {
        tabTitle: "Overview",
        link: "/",
      },
      {
        tabTitle: "Transactions",
        link: "/",
      },
      {
        tabTitle: "Analysis",
        link: "/",
        subTabs: [
          {
            subTabTitle: "Report",
            subTabLink: "/",
          },
          {
            subTabTitle: "Performance",
            subTabLink: "/",
          },
          {
            subTabTitle: "Analysis",
            subTabLink: "/",
          },
          {
            subTabTitle: "Earnings",
            subTabLink: "/",
          },
        ],
      },
    ],
  },
  {
    menuLabel: "Expenses",
    icon: <MdAttachMoney />,
    link: "/expenses",
    tabs: [
      {
        tabTitle: "Overview",
        link: "/",
      },
      {
        tabTitle: "Transactions",
        link: "/",
      },
    ],
  },
  {
    menuLabel: "Insurance",
    icon: <BsShieldFillCheck />,
    link: "/insurance",
    tabs: [],
  },
  {
    menuLabel: "Settings",
    icon: <IoMdSettings />,
    link: "/settings",
    tabs: [
      {
        tabTitle: "My Profile",
        link: "/",
      },
    ],
  },
];
