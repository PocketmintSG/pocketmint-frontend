import { useAuthentication } from "@/hooks/useAuthentication";
import { clearUserData } from "@/redux/authSlice";
import { setActiveSection, setActiveTab } from "@/redux/navSlice";
import { triggerGenericNotification } from "@/utils/Notifications";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
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
    const { getAuthObject } = useAuthentication();
    const user = useSelector((state: RootState) => state.authSliceReducer.user);
    onAuthStateChanged(getAuthObject(), (firebaseUser) => {
        console.log(user)
        console.log(firebaseUser)
        if (!firebaseUser) {
            dispatch(clearUserData())
            return <Navigate to="/login" />;
        }
    });
    const navState = useSelector((state: RootState) => state.navSliceReducer)
    const dispatch = useDispatch()

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
