import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HeinrichProfilePicture from "src/assets/placeholders/profile-picture-heinrich.svg"
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg"
import { AiOutlineStock } from "react-icons/ai"
import { MdAttachMoney } from "react-icons/md"
import { BsShieldFillCheck } from "react-icons/bs"
import { IoMdSettings } from "react-icons/io"

const menuItems = [
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

export const NavSidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("/dashboard")

  const handleActiveMenuItem = (menuItem: string) => {
    console.log(menuItem)
    setActiveMenuItem(menuItem)
  }

  return <Sidebar rootStyles={{
    height: '100vh',
  }}>

    <Menu className="pt-10" menuItemStyles={{
      button: {
        [`&.ps-active`]: {
          backgroundColor: '#F2F2F2', // grey-200
          color: '#4CAF50', // primary-500
        },
      },
      label: {
        [`&.ps-active p`]: {
          backgroundColor: '#F2F2F2', // grey-200
          color: '#4CAF50', // primary-500
        },
      }
    }}>
      <MenuItem component={<Link to="/settings" />}>
        <img src={PocketmintLogo} className="w-full rounded cover" />
      </MenuItem>
      <MenuItem className="mt-3 mb-3">
        <div className="flex flex-row items-center">
          <img src={HeinrichProfilePicture} className="rounded cover" />
          <p className="font-bold ml-3">Heinrich</p>
        </div>
      </MenuItem>
      {menuItems.map(item => (<MenuItem
        active={item.menuTitle === activeMenuItem}
        icon={item.icon}
        component={<Link to={item.link} />}
        onClick={() => handleActiveMenuItem(item.menuTitle)}><p className="font-medium text-grey-900">{item.menuTitle}</p></MenuItem>))}
    </Menu>
  </Sidebar>
}