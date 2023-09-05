// Redux slice used to handle menu navigation, remembering the active menu item on switch

// The menu is made of Sections, Tabs, and Subtabs.
// A Section can contain zero or more Tabs. Tabs may contain 0 or more Subtabs.
// For example, the Investments section has three Tabs: Overview, Transaction, Analysis.
// The Analysis Tab has four Subtabs: Report, Performance, Analysis, Earnings.

import { NavigationItem, NavigationItems, Tab } from "@/configs/Navigation";
import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
    activeSection: NavigationItem
    activeTab: string
}

const initialState: NavigationState = {
    activeSection: NavigationItems[0],
    activeTab: "Overview"
};

const navSlice = createSlice({
    name: "navSlice",
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        resetState: (state, action) => {
            state.activeSection = initialState.activeSection;
            state.activeTab = initialState.activeTab;
        }
    },
});

export const { setActiveSection, setActiveTab, resetState } = navSlice.actions;

export default navSlice.reducer;
