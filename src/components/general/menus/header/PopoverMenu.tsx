import React, { Fragment, useRef, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"



export const PopoverMenu = ({ tabData, handleTabSwitch, isActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false)

  return <Popover>
    {({ open }) => (
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Popover.Button className={`border-b-2 border-white pl-12 pr-12 ${isActiveTab ? "hover:font-bold" : "hover:font-medium"} ${isActiveTab ? "font-bold" : "font-base"}`} onClick={() => handleTabSwitch(tabData.tabTitle)}>
          <p className="text-white text-xl">{tabData.tabTitle}</p>
        </Popover.Button>
        <Transition
          as={Fragment}
          show={isHovered}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="">
            {tabData.subTabs && tabData.subTabs.map(subTab => {
              return <div className="bg-white cursor-pointer hover:bg-grey-200 pt-3 pb-3">
                <Link to={subTab.subTabLink}><p className="w-full text-center">{subTab.subTabTitle}</p></Link>
              </div>
            })}
          </Popover.Panel>

        </Transition>
      </div>
    )}
  </Popover>
}