import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg";
import { NavigationItem } from "src/configs/Navigation";
import { getUser } from "@/utils/Store";
import { BiLogOut } from "react-icons/bi";
import { useAuthentication } from "@/hooks/useAuthentication";

interface NavSidebarProps {
    menuItems: NavigationItem[];
    activeSection: NavigationItem;
    setActiveSection: (newSection: NavigationItem) => void
}

export const NavSidebar = ({
    menuItems,
    activeSection,
    setActiveSection,
}: NavSidebarProps) => {
    const user = getUser()
    const handleActiveMenuItem = (menuItemLabel: string) => {
        const menuItem = menuItems.find((item) => item.menuLabel === menuItemLabel);
        setActiveSection(menuItem!);
    };
    const { signOutCall } = useAuthentication();

    return (
        <Sidebar
            rootStyles={{
                height: "100vh",
            }}
        >
            <Menu
                className="pt-10"
                menuItemStyles={{
                    button: {
                        [`&.ps-active`]: {
                            backgroundColor: "#F2F2F2", // grey-200
                            color: "#4CAF50", // primary-500
                        },
                    },
                    label: {
                        [`&.ps-active p`]: {
                            backgroundColor: "#F2F2F2", // grey-200
                            color: "#4CAF50", // primary-500
                        },
                    },
                }}
            >
                <MenuItem component={<Link to="/settings" />}>
                    <img src={PocketmintLogo} className="w-full rounded cover" />
                </MenuItem>
                <MenuItem className="mt-3 mb-3">
                    <div className="flex flex-row items-center">
                        <img src={user?.profilePicture} className="rounded w-[30px] h-[30px] object-cover" />
                        <p className="font-bold ml-3">{user?.username}</p>
                    </div>
                </MenuItem>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.menuLabel}
                        active={item.menuLabel === activeSection.menuLabel}
                        icon={item.icon}
                        component={<Link to={item.link} />}
                        onClick={() => handleActiveMenuItem(item.menuLabel)}
                    >
                        <p className="font-medium text-grey-900">{item.menuLabel}</p>
                    </MenuItem>
                ))}
                <MenuItem className="self-end" onClick={async () => await signOutCall()} icon={<BiLogOut />}>Logout</MenuItem>
            </Menu>
        </Sidebar>
    );
};
