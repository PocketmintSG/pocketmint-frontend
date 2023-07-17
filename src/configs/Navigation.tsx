import React from "react"
import { AiOutlineStock } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { BsShieldFillCheck } from "react-icons/bs"
import { IoMdSettings } from "react-icons/io"

export interface NavigationItem {
    menuLabel: string
    icon: React.JSX.Element
    link: string
    tabs: TabProps[]
}

export interface TabProps {
    tabTitle: string
    link: string
    subTabs?: SubTabProps[]
}

interface SubTabProps {
    subTabTitle: string
    subTabLink: string
}

const HeaderNavigationItems: TabProps[] = [
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

export const NavigationItems: NavigationItem[] = [
    {
        menuLabel: "Dashboard",
        icon: <AiOutlineStock />,
        link: "/dashboard",
        tabs: HeaderNavigationItems
    },
    {
        menuLabel: "Expenses",
        icon: <MdAttachMoney />,
        link: "/expenses",
        tabs: HeaderNavigationItems
    },
    {
        menuLabel: "Insurance",
        icon: <BsShieldFillCheck />,
        link: "/insurance",
        tabs: HeaderNavigationItems
    },
    {
        menuLabel: "Settings",
        icon: <IoMdSettings />,
        link: "/settings",
        tabs: HeaderNavigationItems
    }
]


