import React, { useState } from "react"
import { Popover } from "@headlessui/react"
import { PopoverMenu } from "./PopoverMenu"
import { TabProps } from "src/configs/Navigation"

interface HeaderProps {
  pageTitle: string
  tabs: TabProps[]
  activeTab: string
  setActiveTab: any
}


export const Header = ({ pageTitle, tabs, activeTab, setActiveTab }: HeaderProps) => {

  return <section className={`bg-header-background ${tabs.length !== 0 ? "h-[15vh]" : "h-[10vh]"} w-full bg-no-repeat bg-cover rounded-b-lg`}>
    <div className='flex flex-col h-full pt-5 pl-5 pb-10 justify-between'>
      <p className="text-white text-2xl font-bold mb-3">{pageTitle}</p>
      <Popover.Group className="flex flex-row">
        {tabs.length !== 0 && tabs.map(tab => {
          return <PopoverMenu key={tab.tabTitle} tabData={tab} handleTabSwitch={setActiveTab} isActiveTab={activeTab === tab.tabTitle} />
        })}
      </Popover.Group>
    </div >
  </section >
}