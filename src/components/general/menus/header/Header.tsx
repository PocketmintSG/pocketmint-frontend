import React, { useState } from "react"
import { Popover } from "@headlessui/react"
import { PopoverMenu } from "./PopoverMenu"

export interface TabProps {
  tabTitle: string
  link: string
  subTabs?: SubTabProps[]
}

interface SubTabProps {
  subTabTitle: string
  subTabLink: string
}

export interface HeaderProps {
  pageTitle: string
  tabs: TabProps[]
}


export const Header = ({ pageTitle, tabs }: HeaderProps) => {

  const [activeTab, setActiveTab] = useState(tabs[0].tabTitle)
  const handleTabSwitch = (tabTitle: string) => {
    setActiveTab(tabTitle)
  }

  return <section className="bg-header-background h-[19vh]">
    <div className='flex flex-col m-5'>
      <p className="text-white text-2xl font-bold mb-3">{pageTitle}</p>
      <Popover.Group className="flex flex-row">
        {tabs.map(tab => {
          return <PopoverMenu tabData={tab} handleTabSwitch={handleTabSwitch} isActiveTab={activeTab === tab.tabTitle} />
        })}
      </Popover.Group>
    </div >
  </section >
}